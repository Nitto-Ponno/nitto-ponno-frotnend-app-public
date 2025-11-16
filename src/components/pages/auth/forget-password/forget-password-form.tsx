'use client';

import React, { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import GoogleIcon from '@/components/shared/svg/google-Icon';
import { Loader2, Mail, RotateCw } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { instance } from '@/lib/axios/axiosInstance';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { AxiosError } from 'axios';

// Forget PasswordForm Form Schema (Zod)
// ===========================
export const forgetPasswordFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address.' }),
});

/* ---------------- Component ---------------- */
const ForgetPasswordForm = () => {
  const form = useForm<z.infer<typeof forgetPasswordFormSchema>>({
    resolver: zodResolver(forgetPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    values: z.infer<typeof forgetPasswordFormSchema>,
  ) => {
    try {
      router.prefetch(`/auth/verify?email=${values?.email}&forgot=true`);
      setIsLoading(true);
      const { data } = await instance.post('/auth/forgot-password', values);
      if (data?.success) {
        const timeoutDate = new Date();
        timeoutDate.setMinutes(timeoutDate.getMinutes() + 5);
        Cookies.set('verification_timeout', timeoutDate.toISOString(), {
          expires: timeoutDate,
        });
        toast.success(data?.message);
        setIsLoading(false);
        const verifyUrl = from
          ? `/auth/verify?email=${values?.email}&forgot=true&from=${encodeURIComponent(from)}`
          : `/auth/verify?email=${values?.email}&forgot=true`;
        router.push(verifyUrl);
      }
    } catch (error) {
      toast.error(
        ((error as AxiosError).response?.data as { message?: string })
          ?.message || 'An error occurred. Please try again.',
      );
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="text-sidebar-foreground space-y-6 rounded-lg border p-6"
      >
        <div className="text-center text-black">
          <p className="text-3xl font-bold">Forget Password</p>
          <p className="text-sm">Reset Your Password</p>
        </div>

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Write your register email"
                  type="email"
                  {...field}
                  prefix={<Mail className="text-sidebar-foreground size-4" />}
                  className="h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Link
            href={
              from
                ? `/auth/login?from=${encodeURIComponent(from)}`
                : '/auth/login'
            }
            className="hover:text-chart-2 text-left text-sm hover:underline"
          >
            Login?
          </Link>
        </div>

        {/* Submit */}
        <div className="space-y-3">
          <Button
            type="submit"
            size={'xl'}
            className="w-full font-bold"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <RotateCw />}
            Recover password
          </Button>
          <Separator
            className="font-bold text-red-500"
            classNameForChildren=" text-xs"
          >
            OR
          </Separator>
          <Button
            type="submit"
            size={'xl'}
            className="w-full font-bold"
            variant={'tertiary'}
          >
            <GoogleIcon />
            Signup With Google
          </Button>
        </div>

        <div className="flex justify-center gap-3 text-sm">
          Don&apos;t have an account?
          <Link
            href={
              from
                ? `/auth/signup?from=${encodeURIComponent(from)}`
                : '/auth/signup'
            }
            className="hover:text-chart-2 font-semibold text-black hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default memo(ForgetPasswordForm);
