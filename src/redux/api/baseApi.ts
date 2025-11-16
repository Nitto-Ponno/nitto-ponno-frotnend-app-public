import { tagTypesList } from './tagType/tagTypes';
import { axiosBaseQuery } from '../../lib/axios/axiosBaseQuery';

import { createApi } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL_LOCAL as string,
  }),
  tagTypes: [...tagTypesList],
  endpoints: () => ({}),
});
