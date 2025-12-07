export * from '@/types/auth/auth-type';
export * from '@/types/laundry/laundry-service';

export type ApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  pagination: any[];
};
