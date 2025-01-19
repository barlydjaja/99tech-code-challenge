# Analyze code

### Complete solution can be seen in `solution.tsx` file

## 1. Redundant interface declaration
```ts
interface WalletBalance {
  currency: string;
  amount: number;
}

// problem: redeclaring the same interface props
interface FormattedWalletBalance { 
  currency: string;
  amount: number;
  formatted: string;
}

// solution: extends from existing interface
interface FormattedWalletBalance extends WalletBance {
  formatted: string;
}
```

## 2. Redundant interface extends
```ts
// problem: extending BoxProps without any extra params & naming is unclear
interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const {children, ...rest} = props; // -> unused children props
  ...
}


// solution: directly use BoxProps
  const WalletPage: React.FC<BoxProps> = ({children, ...rest}) => {
  ...
}
```

## 3. Unoptimized algorithm switch statement
```ts
// problem: function doesn't rely on react cycle and use any typing. On rerender will recreate function
const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100
      case 'Ethereum':
        return 50
      case 'Arbitrum':
        return 30
      case 'Zilliqa':
        return 20
      case 'Neo':
        return 20
      default:
        return -99
    }
  }
  
// solution: move outside of react component & create map for better performance
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
```

## 4. sortedBalance block logic
```ts
// problem:
 const sortedBalances = useMemo(() => {
  return balances.filter((balance: WalletBalance) => {
    const balancePriority = getPriority(balance.blockchain); // --> unused var
    if (lhsPriority > -99) { // --> lhsPriority is not defined
      if (balance.amount <= 0) { // --> nested if statement logic, I assume logic should be balance.amount >= 0 
        return true; // --> boolean return can be optimized by adjsuting if statement
      }
    }
    return false // --> i think logic should be swapped.
  }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
    const leftPriority = getPriority(lhs.blockchain); // --> lhs.blockchain is not defined in interface WalletBalance
    const rightPriority = getPriority(rhs.blockchain);
    if (leftPriority > rightPriority) {
      return -1;
    } else if (rightPriority > leftPriority) {
      return 1;
    } // --> doesn't handle case for rightPriority === leftPriority
  });
}, [balances, prices]); // --> prices should not be in dependencies


// solution
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: keyof typeof priorityMap; // add blockchain value here
}

const sortedBalance = useMemo(() => {
  return balances
    .filter((balance: WalletBalance) => getPriority(balance.blockchain) > -99 && balance.amount >= 0)
    .sort((lhs: WalletBalance, rhs: WalletBalance) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain))
}, [balances])
```

## 5. Unused function
```ts
// problem: not used anywhere
const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

// solution: remove it
```

## 6. Mapping render
```ts
// problem:
const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => { // --> rows naming can be unclear, especially on bigger component
  const usdValue = prices[balance.currency] * balance.amount;
  return (
    <WalletRow
      className={classes.row} // --> classes.row is not defined, i assume will use className props
      key={index} // --> index as key
      amount={balance.amount}
      usdValue={usdValue}
      formattedAmount={balance.formatted}
    />
)})

// solution: optimize using memo & fix all the above
const walletBalanceItems = useMemo(() =>
  sortedBalances.map((balance: FormattedWalletBalance) => {
    const usdValue = (prices[balance.currency] || 0) * balance.amount; // handle in case currency isn't a valid number
    return (
      <WalletRow
        className={className} // assuming from props
        key={`${balance.blockchain}-${balance.currency}-${balance.amount}`}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
  )
}), [sortedBalances, prices, className]);
```
