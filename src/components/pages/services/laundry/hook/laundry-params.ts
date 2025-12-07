import { createSearchParamsCache, parseAsBoolean } from 'nuqs/server';
import { parseAsInteger, parseAsString } from 'nuqs';

export const laundryFilterParsers = {
  search: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  page: parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  limit: parseAsInteger.withDefault(10).withOptions({ clearOnDefault: true }),
  sortBy: parseAsString
    .withDefault('displayOrder')
    .withOptions({ clearOnDefault: true }),
  sortOrder: parseAsString
    .withDefault('asc')
    .withOptions({ clearOnDefault: true }),
  isActive: parseAsBoolean
    .withDefault(true)
    .withOptions({ clearOnDefault: true }),
  displayOrder: parseAsInteger
    .withDefault(10)
    .withOptions({ clearOnDefault: true }),
};

export const laundryFilterCache = createSearchParamsCache(laundryFilterParsers);
