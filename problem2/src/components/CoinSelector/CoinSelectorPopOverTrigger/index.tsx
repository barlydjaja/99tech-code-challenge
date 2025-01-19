import { Button } from 'src/components/ui/button.tsx';
import { ChevronsUpDown } from 'lucide-react';
import { PopoverTrigger } from 'src/components/ui/popover.tsx';
import { FieldError } from 'react-hook-form';

interface CoinSelectorPopOverTriggerProps {
  selectedCurrency: string;
  error?: FieldError;
}

const CoinSelectorPopOverTrigger = ({ selectedCurrency, error }: CoinSelectorPopOverTriggerProps) => {
  return (
    <PopoverTrigger asChild>
      <Button
        variant={error ? 'outlineError' : 'outline'}
        className="w-80 justify-between"
      >
        {selectedCurrency || 'Select  Coin'}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
  );
};

export default CoinSelectorPopOverTrigger;
