import { useQuery } from '@tanstack/react-query';
import { ApiDelay } from 'src/api';

export interface UserInfoResponse {
  name: string;
  currency: string;
  amount: number;
}

const getUserInfo = () => {
  return new Promise((resolve: (props: UserInfoResponse) => void) => {
    setTimeout(() => {
      resolve({
        name: 'John Doe',
        currency: 'USD',
        amount: 5000
      });
    }, ApiDelay);
  });
};

const useGetUserInfo = () => {
  return useQuery({
    queryKey: ['useGetUserInfo'],
    queryFn: getUserInfo,
  });
};

export default useGetUserInfo;
