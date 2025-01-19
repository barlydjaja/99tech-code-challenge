import { useQuery } from '@tanstack/react-query';
import request, { ApiDelay, endpointList } from 'src/api';

export interface CoinPriceInfo {
  currency: string;
  date: string;
  price: number;
}

const removeDuplicate = (coinPricesInfo: CoinPriceInfo[]): CoinPriceInfo[] => {
  const sanitizedCoinPricesInfo = new Map();

  coinPricesInfo.forEach(coinPrice => {
    const hasMapped = sanitizedCoinPricesInfo.has(coinPrice.currency);
    if (!hasMapped) {
      sanitizedCoinPricesInfo.set(coinPrice.currency, coinPrice);
    }
  });

  return Array.from(sanitizedCoinPricesInfo, ([, info]) => ({ ...info }));
};

const getCoinPriceInfo = () => {
  return new Promise<CoinPriceInfo[]>((resolve, reject) => {
    setTimeout(() => {
      request
        .get<CoinPriceInfo[]>(endpointList.coinPriceInfo)
        .then((res) => resolve(removeDuplicate(res.data)))
        .catch(reject);
    }, ApiDelay);
  });
};

const useGetCoinPriceInfo = () => {
  return useQuery({
    queryKey: ['useGetCoinPrice'],
    queryFn: getCoinPriceInfo
  });
};

export default useGetCoinPriceInfo;
