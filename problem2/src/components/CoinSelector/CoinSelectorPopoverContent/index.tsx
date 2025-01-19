import { PopoverContent } from 'src/components/ui/popover.tsx';
import { Check, Search } from 'lucide-react';
import { Input } from 'src/components/ui/input.tsx';
import { Alert, AlertDescription } from 'src/components/ui/alert.tsx';
import { Button } from 'src/components/ui/button.tsx';
import { CoinPriceInfo } from 'src/hooks/useGetCoinPriceInfo';

interface CoinSelectorPopOverContentProps {
  search: string;
  setSearch: (search: string) => void;
  coinPricesInfoFilter?: CoinPriceInfo[];
  selectedCurrency: string;
  handleSelectCoin: (selected: CoinPriceInfo) => void;
}

const CoinSelectorPopoverContent = ({ search, setSearch, coinPricesInfoFilter, handleSelectCoin, selectedCurrency }: CoinSelectorPopOverContentProps) => {
  return (
    <PopoverContent className="w-80 p-2">
      <div className="flex items-center border rounded-md px-3 mb-2">
        <Search className="h-4 w-4 text-gray-500"/>
        <Input
          placeholder="Search frameworks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-0 focus:outline-none focus-visible:ring-0"
        />
      </div>
      <div className="max-h-60 overflow-auto">
        {!coinPricesInfoFilter?.length ? (
          <Alert>
            <AlertDescription>
                No coin found
            </AlertDescription>
          </Alert>
        ) : (
          coinPricesInfoFilter?.map((coinPriceInfo) => (
            <Button
              key={coinPriceInfo.currency}
              variant="ghost"
              className="w-full justify-start gap-2 my-1"
              onClick={() => handleSelectCoin(coinPriceInfo)}
            >
              <Check
                className={`h-4 w-4 ${
                  selectedCurrency === coinPriceInfo.currency ? 'opacity-100' : 'opacity-0'
                }`}
              />
              {coinPriceInfo.currency}
            </Button>
          ))
        )}
      </div>
    </PopoverContent>
  );
};

export default CoinSelectorPopoverContent;
