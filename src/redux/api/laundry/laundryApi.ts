import { ApiResponse, ILaundryProduct, ILaundryService } from '@/types';
import { baseApi } from '../baseApi';

const laundryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLaundryProducts: builder.query<ApiResponse<ILaundryProduct[]>, any>({
      query: (params) => ({
        url: '/laundryProduct',
        params,
      }),
    }),
    getLaundryServices: builder.query<ApiResponse<ILaundryService[]>, any>({
      query: (params) => ({
        url: '/laundryService',
        params,
      }),
    }),
    getALaundryProductById: builder.query<ApiResponse<ILaundryProduct>, any>({
      query: (id) => ({
        url: `/laundryProduct/${id}`,
      }),
    }),
  }),
});

export const {
  useGetLaundryServicesQuery,
  useGetLaundryProductsQuery,
  useGetALaundryProductByIdQuery,
} = laundryApi;
