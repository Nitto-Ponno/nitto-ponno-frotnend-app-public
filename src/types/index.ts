export * from '@/types/auth/auth-type';

export type ApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  pagination: any[];
};
