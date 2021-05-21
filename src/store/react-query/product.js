import { useQuery } from 'react-query';
import { getProducts } from 'store/api';
import { ProductKeys } from 'store/actiontypes';

export const useGetProducts = (input, options = {}) =>
  useQuery({
    queryKey: [ProductKeys.Products, input],
    queryFn: getProducts,
    ...options,
  });
