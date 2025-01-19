import { CoinPriceInfo } from 'src/hooks/useGetCoinPriceInfo';
import { useState } from 'react';
import { Popover } from 'src/components/ui/popover.tsx';
import CoinSelectorPopOverTrigger from 'src/components/CoinSelector/CoinSelectorPopOverTrigger';
import CoinSelectorPopoverContent from 'src/components/CoinSelector/CoinSelectorPopoverContent';
import { FormType } from 'src/App.tsx';
import { UseFormReturn } from 'react-hook-form';

interface CoinSelectorProps {
  coinPricesInfo?: CoinPriceInfo[];
  form: UseFormReturn<FormType>;
}

const CoinSelector = ({ coinPricesInfo, form }: CoinSelectorProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const coinPricesInfoFilter = coinPricesInfo?.filter(({ currency }) => {
    const sanitizeCurrency = currency.toLowerCase();
    const sanitizeSearch = search.toLowerCase();
    return sanitizeCurrency.includes(sanitizeSearch);
  });

  const handleSelectCoin = (nextSelectedCoin: CoinPriceInfo) => {
    setSearch('');
    setOpen(false);

    if (nextSelectedCoin.currency === watchSelectedCurrency) {
      form.setValue('currency', '');
    } else {
      form.setValue('currency', nextSelectedCoin.currency);
    }
    form.trigger('currency');
  };

  const watchSelectedCurrency = form.watch('currency');
  const watchError = form.formState.errors.currency;

  if (!coinPricesInfo) {
    return (
      <div>Cannot find coin price info</div>
    );
  }

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <CoinSelectorPopOverTrigger error={watchError} selectedCurrency={watchSelectedCurrency} />
        <CoinSelectorPopoverContent
          search={search}
          setSearch={setSearch}
          handleSelectCoin={handleSelectCoin}
          coinPricesInfoFilter={coinPricesInfoFilter}
          selectedCurrency={watchSelectedCurrency}
        />
      </Popover>
    </div>
  );
};

export default CoinSelector;
