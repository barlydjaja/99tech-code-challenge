// The refactored file

import { useMemo, FC } from 'react';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: keyof typeof priorityMap;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

const priorityMap = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
  Others: -99,
}

const getPriority = (blockchain: keyof typeof priorityMap): number => {
  return priorityMap[blockchain] || priorityMap.Others
}

const WalletPage = ({className, ...rest}: BoxProps) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => getPriority(balance.blockchain) > -99 && balance.amount >= 0)
      .sort((lhs: WalletBalance, rhs: WalletBalance) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain))
  }, [balances])

  const walletBalanceItems = useMemo(() =>
    sortedBalances.map((balance: FormattedWalletBalance) => {
      const usdValue = (prices[balance.currency] || 0) * balance.amount; // handle in case currency isn't a valid number
      return (
        <WalletRow
          className={className} // assuming exists from props
          key={`${balance.blockchain}-${balance.currency}-${balance.amount}`}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    }), [sortedBalances, prices, className]);

  return (
    <div {...rest}>
      {walletBalanceItems}
    </div>
  )
}
