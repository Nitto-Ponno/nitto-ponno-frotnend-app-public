'use client';

import React, { memo, useState, useEffect } from 'react';
import { useForm, Control } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import {
  Loader2,
  RotateCw,
  ShieldCheck,
  Eye,
  EyeClosedIcon,
  Lock,
} from 'lucide-react';
import { instance } from '@/lib/axios/axiosInstance';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';

// Helper function to check if verification timeout has expired
const checkVerificationTimeout = () => {
  const timeoutCookie = Cookies.get('verification_timeout');
  if (!timeoutCookie) {
    return {
      isValid: false,
      message: 'Verification session expired. Please sign up again.',
    };
  }

  const timeoutDate = new Date(timeoutCookie);
  const now = new Date();

  if (now > timeoutDate) {
    return {
      isValid: false,
      message: 'Verification code has expired. Please request a new code.',
    };
  }

  return { isValid: true, message: '' };
};

// Verify Form Schema (Zod)
// ===========================
const baseVerifyFormSchema = z.object({
  otp: z
    .string()
    .length(6, 'Verification code must be 6 digits.')
    .regex(/^\d+$/, 'Verification code must contain only numbers.'),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long.')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter.')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter.')
      .regex(/[0-9]/, 'Must contain at least one number.')
      .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const verifyFormSchemaBase = baseVerifyFormSchema.superRefine((data, ctx) => {
  const timeoutCheck = checkVerificationTimeout();
  if (!timeoutCheck.isValid) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: timeoutCheck.message,
      path: ['otp'],
    });
  }
});

const verifyFormSchemaWithPassword = baseVerifyFormSchema
  .merge(passwordSchema)
  .superRefine((data, ctx) => {
    const timeoutCheck = checkVerificationTimeout();
    if (!timeoutCheck.isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: timeoutCheck.message,
        path: ['otp'],
      });
    }
  });

export const createVerifyFormSchema = (isForgot: boolean) => {
  return isForgot ? verifyFormSchemaWithPassword : verifyFormSchemaBase;
};

export type VerifyFormData = z.infer<typeof verifyFormSchemaBase>;
export type VerifyFormDataWithPassword = z.infer<
  typeof verifyFormSchemaWithPassword
>;

/* ---------------- Component ---------------- */
const VerifyComponent = () => {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [hasShownExpiredError, setHasShownExpiredError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const isForgot = searchParams.get('forgot') === 'true';
  const from = searchParams.get('from');

  const verifyFormSchema = createVerifyFormSchema(isForgot);

  const form = useForm<
    typeof isForgot extends true ? VerifyFormDataWithPassword : VerifyFormData
  >({
    resolver: zodResolver(verifyFormSchema),
    defaultValues: {
      otp: '',
      ...(isForgot && { password: '', confirmPassword: '' }),
    } as typeof isForgot extends true
      ? VerifyFormDataWithPassword
      : VerifyFormData,
  });

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Check verification timeout and update time remaining
  useEffect(() => {
    const checkTimeout = () => {
      const timeoutCookie = Cookies.get('verification_timeout');
      if (timeoutCookie) {
        const timeoutDate = new Date(timeoutCookie);
        const now = new Date();
        const remaining = Math.max(
          0,
          Math.floor((timeoutDate.getTime() - now.getTime()) / 1000),
        );
        setTimeRemaining(remaining);

        if (remaining === 0 && !hasShownExpiredError) {
          toast.error(
            'Verification code has expired. Please request a new code.',
          );
          setHasShownExpiredError(true);
        }
      } else {
        setTimeRemaining(null);
        if (!hasShownExpiredError) {
          toast.error('Verification session expired. Please sign up again.');
          setHasShownExpiredError(true);
        }
      }
    };

    // Check immediately
    checkTimeout();

    // Update every second
    const interval = setInterval(checkTimeout, 1000);

    return () => clearInterval(interval);
  }, [hasShownExpiredError]);

  const handleSubmit = async (
    values: typeof isForgot extends true
      ? VerifyFormDataWithPassword
      : VerifyFormData,
  ) => {
    // Check timeout before submitting
    const timeoutCheck = checkVerificationTimeout();
    if (!timeoutCheck.isValid) {
      toast.error(timeoutCheck.message);
      form.setError('otp', { message: timeoutCheck.message });
      return;
    }

    try {
      setLoading(true);

      if (isForgot) {
        // Reset password flow
        const passwordValues = values as VerifyFormDataWithPassword;
        await instance.post('/auth/reset-password', {
          otp: passwordValues.otp,
          email: email,
          password: passwordValues.password,
        });

        // Clear timeout cookie on successful reset
        Cookies.remove('verification_timeout');

        toast.success('Password reset successfully!');
        const loginUrl = from
          ? `/auth/login?from=${encodeURIComponent(from)}`
          : '/auth/login';
        router.push(loginUrl);
      } else {
        // Regular verification flow
        await instance.post('/auth/verify-otp', {
          otp: values.otp,
          email: email,
        });

        // Clear timeout cookie on successful verification
        Cookies.remove('verification_timeout');

        toast.success('Email verified successfully!');

        // Redirect to login with from parameter if it exists
        if (from) {
          const loginUrl = `/auth/login?from=${encodeURIComponent(from)}`;
          router.push(loginUrl);
        }
      }
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message?: string }>).response?.data?.message ||
        (isForgot
          ? 'Password reset failed. Please try again.'
          : 'Verification failed. Please try again.');
      toast.error(errorMessage);
      form.reset();
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error('Email is required to resend verification code.');
      return;
    }

    try {
      setResendLoading(true);
      await instance.post('/auth/send-verification', {
        email: email,
      });

      // Reset timeout cookie (5 minutes from now)
      const timeoutDate = new Date();
      timeoutDate.setMinutes(timeoutDate.getMinutes() + 5);
      Cookies.set('verification_timeout', timeoutDate.toISOString(), {
        expires: timeoutDate,
      });

      // Reset error flag when resending
      setHasShownExpiredError(false);

      toast.success('Verification code sent to your email!');
      setCountdown(60); // 60 seconds countdown
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message?: string }>).response?.data?.message ||
        'Failed to resend verification code. Please try again.';
      toast.error(errorMessage);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="text-sidebar-foreground space-y-6 rounded-lg border p-6"
      >
        <div className="text-center text-black">
          <p className="text-3xl font-bold">
            {isForgot ? 'Reset Your Password' : 'Verify Your Email'}
          </p>
          <p className="text-sm mt-2">
            {email
              ? `We've sent a verification code to ${email}`
              : 'Enter the verification code sent to your email'}
          </p>
        </div>

        {/* OTP Input */}
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">
                  Enter the 6-digit code sent to your email
                </p>
                {timeRemaining !== null && timeRemaining > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Time remaining: {Math.floor(timeRemaining / 60)}:
                    {String(timeRemaining % 60).padStart(2, '0')}
                  </p>
                )}
              </div>
            </FormItem>
          )}
        />

        {/* Password Fields - Only shown when isForgot is true */}
        {isForgot && (
          <>
            <FormField
              control={
                form.control as unknown as Control<VerifyFormDataWithPassword>
              }
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your new password"
                      type={isPasswordVisible ? 'text' : 'password'}
                      {...field}
                      prefix={
                        <Lock className="text-sidebar-foreground size-4" />
                      }
                      suffix={
                        <span
                          onClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
                          className="cursor-pointer"
                        >
                          {isPasswordVisible ? (
                            <Eye className="text-sidebar-foreground size-4" />
                          ) : (
                            <EyeClosedIcon className="text-sidebar-foreground size-4" />
                          )}
                        </span>
                      }
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={
                form.control as unknown as Control<VerifyFormDataWithPassword>
              }
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm your new password"
                      type={isConfirmPasswordVisible ? 'text' : 'password'}
                      {...field}
                      prefix={
                        <Lock className="text-sidebar-foreground size-4" />
                      }
                      suffix={
                        <span
                          onClick={() =>
                            setIsConfirmPasswordVisible(
                              !isConfirmPasswordVisible,
                            )
                          }
                          className="cursor-pointer"
                        >
                          {isConfirmPasswordVisible ? (
                            <Eye className="text-sidebar-foreground size-4" />
                          ) : (
                            <EyeClosedIcon className="text-sidebar-foreground size-4" />
                          )}
                        </span>
                      }
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Resend Code */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Didn&apos;t receive the code?
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleResendCode}
            disabled={resendLoading || countdown > 0}
            className="text-chart-2 hover:text-chart-2/80"
          >
            {resendLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RotateCw className="mr-2 h-4 w-4" />
            )}
            {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
          </Button>
        </div>

        <div className="flex justify-end">
          <Link
            href={
              from
                ? `/auth/login?from=${encodeURIComponent(from)}`
                : '/auth/login'
            }
            className="hover:text-chart-2 text-left text-sm hover:underline"
          >
            Back to Login?
          </Link>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          size={'xl'}
          className="w-full font-bold flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <ShieldCheck className="h-5 w-5" />
          )}
          {isForgot ? 'Reset Password' : 'Verify Email'}
        </Button>

        <div className="flex justify-center gap-3 text-sm">
          Need help?
          <Link
            href={
              from
                ? `/auth/login?from=${encodeURIComponent(from)}`
                : '/auth/login'
            }
            className="hover:text-chart-2 font-semibold text-black hover:underline"
          >
            Contact Support
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default memo(VerifyComponent);
