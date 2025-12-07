import { createSearchParamsCache } from 'nuqs/server';
import { parseAsInteger, parseAsString } from 'nuqs';

export const laundryProductParsers = {
  search: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  page: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  limit: parseAsInteger.withDefault(10).withOptions({ clearOnDefault: true }),
  sortBy: parseAsString
    .withDefault('createdAt')
    .withOptions({ clearOnDefault: true }),
  sortOrder: parseAsString
    .withDefault('desc')
    .withOptions({ clearOnDefault: true }),
  serviceId: parseAsString
    .withDefault('')
    .withOptions({ clearOnDefault: true }),
  minPrice: parseAsInteger.withOptions({ clearOnDefault: true }),
  maxPrice: parseAsInteger.withOptions({ clearOnDefault: true }),
};

export const laundryProductCache = createSearchParamsCache(
  laundryProductParsers,
);
