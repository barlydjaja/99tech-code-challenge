import { useMutation } from '@tanstack/react-query';
import { ApiDelay } from 'src/api';

export interface TransactionRequest {
  name: string;
  currency: string;
  transferAmount: string;
  exchangedAmount: string;
}

export interface TransactionResponse {
  name: string;
  currency: string;
  amount: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const postTransaction = (_transactionRequest: TransactionRequest) => {
  return new Promise((resolve: (props: TransactionResponse) => void) => {
    setTimeout(resolve, ApiDelay);
  });
};

const useGetUserInfo = () => {
  return useMutation({
    mutationFn: postTransaction
  });
};

export default useGetUserInfo;
