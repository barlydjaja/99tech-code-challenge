import { Skeleton } from 'src/components/ui/skeleton.tsx';

const SkeletonLoading = () => {
  return (
    <div className='max-w-screen-xl py-5 mx-auto flex flex-col items-center justify-center'>
      <div className='space-y-4'>
        <Skeleton className="h-[150px] w-[250px] rounded-xl"/>
        <br/>
        <Skeleton className="h-8 w-[250px]"/>
        <br/>
        <Skeleton className="h-8 w-[250px]"/>
        <br/>
        <Skeleton className="h-8 w-[250px]"/>
        <br/>
        <Skeleton className="h-8 w-[250px]"/>
        <br/>
        <Skeleton className="h-8 w-[250px]"/>
        <br/>
        <Skeleton className="h-8 w-[80px]"/>
      </div>
    </div>
  );
};

export default SkeletonLoading;
