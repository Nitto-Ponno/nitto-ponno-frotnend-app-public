import { useQueryStates } from 'nuqs';
import { laundryFilterParsers } from './laundry-params';

const useLaundryFilter = () => {
  return useQueryStates(laundryFilterParsers);
};

export default useLaundryFilter;
