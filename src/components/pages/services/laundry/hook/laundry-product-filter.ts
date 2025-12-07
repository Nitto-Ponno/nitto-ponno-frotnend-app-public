import { useQueryStates } from 'nuqs';
import { laundryProductParsers } from './laundry-product-params';

const useLaundryProductFilter = () => {
  return useQueryStates(laundryProductParsers);
};

export default useLaundryProductFilter;
