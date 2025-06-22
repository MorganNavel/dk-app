import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { IoIosTrendingUp } from "react-icons/io";
interface StatsProps {
  className?: string;
}
interface PreviousMonthsStatsProps extends StatsProps {
  prevEarnings: number;
  currentEarnings: number;
}

export function PreviousMonthsStats({ className }: Readonly<StatsProps>) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Total Revenue</CardDescription>
        <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
          {}
        </CardTitle>
        <Badge variant='outline'>
          <IoIosTrendingUp />
          +12.5%
        </Badge>
      </CardHeader>
      <CardFooter className='flex-col items-start gap-1.5 text-sm'>
        <div className='flex gap-2 font-medium'>
          Trending up this month <IoIosTrendingUp className='size-4' />
        </div>
        <div className='text-muted-foreground'>
          Visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
export function TotalRevenueMonth() {
  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardDescription>Total Revenue This Month</CardDescription>
        <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
          $1,250.00
        </CardTitle>
        <Badge variant='outline'>
          <IoIosTrendingUp />
          +12.5%
        </Badge>
      </CardHeader>
      <CardFooter className='flex-col items-start gap-1.5 text-sm'>
        <div className='line-clamp-1 flex gap-2 font-medium'>
          Trending up this month <IoIosTrendingUp className='size-4' />
        </div>
        <div className='text-muted-foreground'>
          Visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
