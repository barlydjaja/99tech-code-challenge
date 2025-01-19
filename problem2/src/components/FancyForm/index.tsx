import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormType } from 'src/App.tsx';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from 'src/components/ui/form.tsx';
import CoinSelector from 'src/components/CoinSelector';
import { Input } from 'src/components/ui/input.tsx';
import { Button } from 'src/components/ui/button.tsx';
import { Loader2 } from 'lucide-react';
import { CoinPriceInfo } from 'src/hooks/useGetCoinPriceInfo';

interface FancyFormProps {
  form: UseFormReturn<FormType>
  handleSubmit: (form: FormType) => Promise<void>;
  coinPricesInfo?: CoinPriceInfo[];
  loading: boolean;
}

const FancyForm = ({ form, handleSubmit, coinPricesInfo, loading }: FancyFormProps) => {
  const [watchSelectedCurrency, watchTransferAmount] = form.watch(['currency', 'transferAmount']);

  useEffect(() => {
    const coinInfo = coinPricesInfo?.find(coinPrice => coinPrice.currency === watchSelectedCurrency);
    if (coinInfo) {
      form.setValue('exchangedAmount', String(Number(watchTransferAmount) / coinInfo.price));
    }
  }, [coinPricesInfo, form, watchSelectedCurrency, watchTransferAmount]);

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="currency"
          render={() => (
            <FormItem id='coin-section'>
              <FormLabel>Pick a Coin</FormLabel>
              <FormControl>
                <CoinSelector form={form} coinPricesInfo={coinPricesInfo} />
              </FormControl>
              <FormDescription>
                Pick a coin that you want to exchange
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="transferAmount"
          render={({ field, formState }) => (
            <FormItem id='amount-section'>
              <FormLabel>Insert USD amount</FormLabel>
              <FormControl>
                <Input {...field} type='number' className={`w-80 ${formState.errors.transferAmount ? 'border-destructive' : ''}`} min={0}/>
              </FormControl>
              <FormDescription>
                Pick a USD amount you want to exchange
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="exchangedAmount"
          render={({ field }) => (
            <FormItem id='amount-section'>
              <FormLabel>{watchSelectedCurrency} Amount Received</FormLabel>
              <FormControl>
                <Input {...field} disabled className='w-80 bg-destructive-foreground' />
              </FormControl>
              <FormDescription>
                {watchSelectedCurrency} amount you will receive
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button id='submit-section' type="submit" disabled={loading}>
          {loading && <Loader2 className="animate-spin"/>}
          Exchange Now!
        </Button>
      </form>
    </Form>
  );
};

export default FancyForm;
