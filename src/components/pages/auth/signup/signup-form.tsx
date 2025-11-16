'use client';

import React, { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
import {
  Eye,
  EyeClosedIcon,
  Loader2,
  Lock,
  Mail,
  User,
  UserPlus,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { instance } from '@/lib/axios/axiosInstance';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

// Signup Form Schema (Zod)
// ===========================
export const signupFormSchema = z
  .object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long.')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter.')
      .regex(/[a-z]/, 'Must contain at least one lowercase letter.')
      .regex(/[0-9]/, 'Must contain at least one number.')
      .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character.'),
    confirmPassword: z.string(),
    phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits.'),
    firstName: z.string().min(2, 'First name is required'),
    middleName: z.string().optional(),
    lastName: z.string().min(2, 'Last Name is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

/* ---------------- Component ---------------- */
const SignupForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      firstName: '',
      lastName: '',
      middleName: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    const { email, password, phoneNumber, firstName, middleName, lastName } =
      values;

    const payload = {
      email,
      password,
      phoneNumber,
      name: {
        firstName,
        middleName: middleName || '',
        lastName: lastName || '',
      },
    };

    try {
      setIsLoading(true);
      const { data } = await instance.post('/auth/customer-register', payload);

      toast.success(data?.message);

      if (data?.success) {
        setIsLoading(false);
        const redirectUrl = from
          ? `/auth/verify?email=${email}&from=${encodeURIComponent(from)}`
          : `/auth/verify?email=${email}`;

        router.push(redirectUrl);
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
          <p className="text-3xl font-bold">Sign Up</p>
          <p className="text-sm">
            Create an account by sign up with provider or email, password
          </p>
        </div>
        {/* Full Name */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Write your full name"
                    {...field}
                    prefix={<User className="text-sidebar-foreground size-4" />}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your last name"
                    {...field}
                    prefix={<User className="text-sidebar-foreground size-4" />}
                    className="h-12 "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Middle Name (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your middle name"
                    {...field}
                    prefix={<User className="text-sidebar-foreground size-4" />}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  placeholder="Write your email"
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

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  {...field}
                  prefix={<Lock className="text-sidebar-foreground size-4" />}
                  suffix={
                    <span
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
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

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter password again"
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  {...field}
                  prefix={<Lock className="text-sidebar-foreground size-4" />}
                  className="h-12"
                  suffix={
                    <span
                      onClick={() =>
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="space-y-3">
          <Button
            type="submit"
            size={'xl'}
            className="w-full font-bold"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <UserPlus />}
            Register
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
            Sign Up With Google
          </Button>
        </div>

        <div className="flex justify-center gap-3 text-sm">
          Already have account?
          <Link
            href={
              from
                ? `/auth/login?from=${encodeURIComponent(from)}`
                : '/auth/login'
            }
            className="hover:text-chart-2 font-semibold text-black hover:underline"
          >
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default memo(SignupForm);
