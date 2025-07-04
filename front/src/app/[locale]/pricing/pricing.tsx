"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
function formatPrice(value: number, currency: string) {
  const isInteger = Number.isInteger(value);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
    minimumFractionDigits: isInteger ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  currency?: string;
  features: string[];
  icon?: React.ReactNode;
  btnText: string;
  onSubscribe?: () => void;
}

export function PricingCard({
  title,
  description,
  price,
  currency = "USD",
  features,
  icon,
  btnText,
  onSubscribe,
}: Readonly<PricingCardProps>) {
  return (
    <Card className='flex flex-col hover:scale-[1.02] transition-transform duration-300 ease-in-out shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-sm'>
      <CardHeader className='text-center pb-2'>
        <CardTitle className='mb-7 flex items-center justify-center gap-2 text-2xl font-bold '>
          {title} {icon}
        </CardTitle>
        <span className='font-bold text-5xl text-primary'>
          {formatPrice(price, currency)}
        </span>
      </CardHeader>
      <CardDescription className='text-center'>{description}</CardDescription>
      <CardContent className='flex-1'>
        <ul className='mt-7 space-y-2.5 text-sm'>
          {features.map((feature, index) => (
            <li key={index} className='flex space-x-2'>
              <CheckIcon className='flex-shrink-0 mt-0.5 h-4 w-4' />
              <span className='text-muted-foreground'>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className='w-full' onClick={onSubscribe}>
          {btnText}
        </Button>
      </CardFooter>
    </Card>
  );
}
