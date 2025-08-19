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
import { Input } from "@/components/ui/input";
import { CheckIcon, Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactNode, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "@/i18n/routing";
import { useSession } from "@/lib/auth-client";
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

export interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  currency?: string;
  features?: string[];
  icon?: React.ReactNode;
  btnText: string;
  isAmphasized?: boolean;
  amphasis?: ReactNode;
  onSubscribe?: () => void;
}
export function PricingCard({
  title,
  description,
  price,
  currency = "USD",
  features = [],
  icon,
  btnText,
  isAmphasized = false,
  amphasis,
  onSubscribe,
}: Readonly<PricingCardProps>) {
  const t = useTranslations("");

  return (
    <Card
      className={`flex flex-col w-full max-w-xs sm:max-w-sm p-4 sm:p-6 shadow-lg
                 hover:scale-[1.02] transition-transform duration-300 ease-in-out
                 focus-within:ring-2 rounded-lg relative
                 ${
                   isAmphasized
                     ? "border-2 border-primary shadow-2xl scale-[1.03] hover:scale-[1.05]"
                     : ""
                 }`}
      aria-label={`Pricing plan: ${title}`}
      tabIndex={-1}
    >
      {isAmphasized && (
        <span className='flex items-center gap-2 absolute -top-3 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md'>
          {amphasis}
        </span>
      )}

      <CardHeader className='text-center pb-2'>
        <CardTitle className='mb-7 flex items-center justify-center gap-2 text-2xl font-bold'>
          {title}
          {icon && <span aria-hidden='true'>{icon}</span>}
        </CardTitle>
        <div
          className='flex justify-center items-baseline gap-2 text-primary text-5xl font-bold'
          aria-label={`Price: ${formatPrice(price, currency)}${" per month"}`}
        >
          <span>{formatPrice(price, currency)}</span>
          <span className='text-sm font-normal' aria-hidden='true'>
            {t("pricing.perMonth")}
          </span>
        </div>
      </CardHeader>

      <CardDescription className='text-center'>{description}</CardDescription>

      <CardContent className='flex-1 mt-7'>
        {features.length > 0 && (
          <ul className='space-y-2.5 text-sm list-none p-0 m-0'>
            {features.map((feature, i) => (
              <li
                key={`${feature}-${i}`}
                className='flex items-start space-x-2'
              >
                <CheckIcon
                  className='flex-shrink-0 mt-0.5 h-4 w-4 text-primary'
                  aria-hidden='true'
                />
                <span className='text-muted-foreground'>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <CardFooter className='pt-4'>
        <Button
          className={`w-full ${
            isAmphasized ? "bg-primary text-white hover:bg-primary/90" : ""
          }`}
          onClick={() => onSubscribe && onSubscribe()}
          aria-label={`Souscrire au plan ${title}`}
        >
          {btnText}
        </Button>
      </CardFooter>
    </Card>
  );
}

interface SingleCourseCardProps {
  title: string;
  description: string;
  price: number;
  icon?: ReactNode;
  currency?: string;
  btnText: string;
  onBuy?: (count: number, totalPrice: number) => void;
  isAmphasized?: boolean;
  amphasis?: ReactNode;
}

export function SingleCourseCard({
  title,
  description,
  price,
  currency = "USD",
  isAmphasized,
  amphasis,
  icon,
  onBuy,
}: Readonly<SingleCourseCardProps>) {
  const router = useRouter();
  const session = useSession();
  const [nbLessons, setNbLessons] = useState<number>(1);
  function calculatePrice() {
    return price * nbLessons;
  }

  const totalPrice = calculatePrice();

  const increment = () => setNbLessons((prev) => prev + 1);
  const decrement = () => nbLessons > 1 && setNbLessons((prev) => prev - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setNbLessons(value);
    } else if (e.target.value === "") {
      setNbLessons(1);
    }
  };

  return (
    <Card
      className={`flex flex-col w-full max-w-xs sm:max-w-sm p-4 sm:p-6 shadow-lg
                 hover:scale-[1.02] transition-transform duration-300 ease-in-out
                 focus-within:ring-2 rounded-lg relative
                 ${
                   isAmphasized && amphasis
                     ? "border-2 border-primary shadow-2xl scale-[1.03] hover:scale-[1.05]"
                     : ""
                 }`}
    >
      {isAmphasized && amphasis && (
        <span className='flex items-center gap-2 absolute -top-3 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md'>
          {amphasis}
        </span>
      )}
      <CardHeader className='text-center pb-2'>
        <CardTitle className='mb-7 flex items-center justify-center gap-2 text-2xl font-bold '>
          {title} {icon}
        </CardTitle>
        <span className='font-bold text-5xl text-primary'>
          {formatPrice(totalPrice, currency)}
        </span>
      </CardHeader>
      <CardDescription className='text-center mb-3 px-2'>
        {description}
      </CardDescription>

      <CardContent className='flex-1 flex flex-col items-center justify-center'>
        <div className='flex items-center gap-3 mb-4'>
          <Button variant='outline' size='icon' onClick={decrement}>
            <Minus className='h-4 w-4' />
          </Button>
          <Input
            type='number'
            min={1}
            value={nbLessons}
            onChange={handleInputChange}
            className='w-24 text-center'
          />
          <Button variant='outline' size='icon' onClick={increment}>
            <Plus className='h-4 w-4' />
          </Button>
        </div>
      </CardContent>

      <CardFooter>
        <PayPalButtons
          key={nbLessons}
          className='w-full'
          onClick={() => {
            console.log("click");
            console.log(session);
            if (!session.data?.session) router.replace("/auth/sign-in");
          }}
          createOrder={(data, actions) => {
            const totalPriceFixed = (price * nbLessons).toFixed(2);
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: totalPriceFixed,
                    currency_code: currency,
                  },
                },
              ],
              intent: "CAPTURE",
            });
          }}
          onApprove={async (data, actions) => {
            if (onBuy) onBuy(nbLessons, totalPrice);
          }}
        />
      </CardFooter>
    </Card>
  );
}
