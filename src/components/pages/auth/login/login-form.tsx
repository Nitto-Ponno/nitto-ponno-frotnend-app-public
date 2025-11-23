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
import { Eye, EyeClosedIcon, Loader2, Lock, LogIn, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { instance } from '@/lib/axios/axiosInstance';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useAppDispatch } from '@/redux/hook';
import { setUser } from '@/redux/features/auth/authReducer';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

// Login Form Schema (Zod)
// ===========================
export const loginFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address.' }),
  password: z.string(),
});

/* ---------------- Props ---------------- */

/* ---------------- Component ---------------- */
const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  /**
   * Safely extracts and validates the redirect path from the 'from' parameter
   * @param fromParam - The 'from' parameter value (could be full URL or path)
   * @returns A safe internal path to redirect to, or '/' as fallback
   */
  const getSafeRedirectPath = (fromParam: string | null): string => {
    if (!fromParam) return '/';

    try {
      // If it's a full URL, extract the pathname
      let path = fromParam;
      if (fromParam.startsWith('http://') || fromParam.startsWith('https://')) {
        const url = new URL(fromParam);
        path = url.pathname + url.search;
      }

      // Ensure it starts with '/' (internal path)
      if (!path.startsWith('/')) {
        return '/';
      }

      // Prevent redirect loops - don't redirect to auth pages
      const authPaths = [
        '/auth/login',
        '/auth/signup',
        '/auth/forget-password',
        '/auth/verify',
      ];
      if (authPaths.some((authPath) => path.startsWith(authPath))) {
        return '/';
      }

      // Basic validation: ensure it's a valid path (no protocol, no //, etc.)
      if (path.includes('//') || path.includes('://')) {
        return '/';
      }

      return path;
    } catch (error) {
      // If URL parsing fails, return default
      return '/';
    }
  };

  const handleSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      setIsLoading(true);
      const { data } = await instance.post('/auth/login', values);
      if (data?.success) {
        Cookies.set(
          process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME as string,
          data?.data?.accessToken,
        );
        const { data: myData } = await instance.get('/auth/getMyData');
        if (myData?.success) {
          dispatch(setUser(myData?.data));
        }

        toast.success(data?.message);

        setIsLoading(false);
        const redirectPath = getSafeRedirectPath(from);
        router?.push(redirectPath);
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
          <p className="text-3xl font-bold">Login</p>
          <p className="text-sm">Login with your email and password</p>
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

        <div className="flex justify-end">
          <Link
            href={
              from
                ? `/auth/forget-password?from=${encodeURIComponent(from)}`
                : '/auth/forget-password'
            }
            className="hover:text-chart-2 text-left text-sm hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <div className="space-y-3">
          <Button
            type="submit"
            size={'xl'}
            disabled={isLoading}
            className="w-full font-bold"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <LogIn />}
            Login
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
            Login With Google
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

export default memo(LoginForm);
