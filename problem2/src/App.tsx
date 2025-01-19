import UserInfo from 'src/components/UserInfo';
import useGetUserInfo from 'src/hooks/useGetUserInfo';
import useGetCoinPriceInfo from 'src/hooks/useGetCoinPriceInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import SkeletonLoading from 'src/components/SkeletonLoading';
import { ToastAction } from 'src/components/ui/toast.tsx';
import { useToast } from 'src/hooks/use-toast.ts';
import { Toaster } from 'src/components/ui/toaster.tsx';
import usePostTransaction from 'src/hooks/usePostTransaction';
import PartyPopper from 'src/components/PartyPopper';
import usePartyPopper from 'src/hooks/usePartyPopper';
import Walkthrough from 'src/components/Walkthrough';
import FancyForm from 'src/components/FancyForm';

export const formSchema = z.object({
  currency: z.string().refine(Boolean, 'Please select a currency'),
  transferAmount: z.string()
    .refine(Boolean, 'Please select a transfer amount')
    .refine((val) => Number(val) > 0, 'Must be more than 0')
    .refine(val => Number(val) <= 5000, 'Cannot exceed balance'),
  exchangedAmount: z.string()
});

export type FormType = z.infer<typeof formSchema>

function App() {
  const { toast } = useToast();
  const { data: userInfo, isFetching: isFetchingUserInfo } = useGetUserInfo();
  const { data: coinPricesInfo, isFetching: isFetchingCoinPrice } = useGetCoinPriceInfo();
  const { mutateAsync, isPending } = usePostTransaction();
  const { confetties, explode } = usePartyPopper();

  const [beginWalkthrough, setBeginWalkthrough] = useState(false);

  const isLoading = isFetchingUserInfo || isFetchingCoinPrice;

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      currency: '',
      transferAmount: '',
      exchangedAmount: '',
    },
  });

  const handleSubmit = async (form: FormType) => {
    try {
      await mutateAsync({
        name: userInfo?.name || '',
        exchangedAmount: form.exchangedAmount,
        transferAmount: form.transferAmount,
        currency: form.currency,
      });

      explode();
      toast({
        title: `$${userInfo?.currency}${form.transferAmount} has been exchanged to ${form.currency}${form.exchangedAmount}. Please check you wallet`,
        description: `${new Date()}`,
        action: <ToastAction altText="Goto wallet">Goto wallet</ToastAction>,
      });

    } catch (err) {
      console.error('transaction fail: ', err);
      toast({
        title: 'Transaction Fail. Please try another time',
        description: `${new Date()}`,
        variant: 'destructive',
        action: <ToastAction altText="Goto wallet">Goto wallet</ToastAction>,
      });
    }
  };

  useEffect(() => {
    if (!isLoading && userInfo && coinPricesInfo) {
      setBeginWalkthrough(true);
    }
  }, [coinPricesInfo, isLoading, userInfo]);

  if (isLoading) {
    return <SkeletonLoading />;
  }

  return (
    <div className='max-w-screen-xl py-5 mx-auto space-y-4 flex flex-col items-center justify-center overflow-hidden'>
      <UserInfo userInfo={userInfo}/>

      <FancyForm form={form} coinPricesInfo={coinPricesInfo} loading={isPending} handleSubmit={handleSubmit} />

      {beginWalkthrough && <Walkthrough/>}
      <Toaster />
      <PartyPopper confetties={confetties}/>
    </div>
  );
}

export default App;
