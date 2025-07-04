import { useRouter } from "@/i18n/routing";
import { Button } from "./button";
import { Card, CardContent, CardTitle } from "./card";
import { cn } from "@/lib/utils";

interface CtaProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
  className?: string;
}
export function Cta({
  title,
  description,
  buttonText,
  href,
  className = "",
}: Readonly<CtaProps>) {
  const router = useRouter();
  return (
    <Card
      className={cn(
        "bg-primary/10 p-2 md:p-8 text-center hover:scale-105 shadow-lg transition-all duration-300 rounded-xl mb-8",
        className
      )}
    >
      <CardContent>
        <CardTitle className='text-2xl sm:text-4xl font-bold text-primary mb-4'>
          {title}
        </CardTitle>
        <p className='text-gray-700 text-sm md:text-lg leading-relaxed mb-6'>
          {description}
        </p>
        <Button
          variant={"round-outline"}
          className='w-full sm:w-auto text-sm md:text-md px-6 py-3 gap-2 '
          onClick={() => router.push(href)}
        >
          <span>{buttonText}</span>
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 5l7 7-7 7'
            />
          </svg>
        </Button>
      </CardContent>
    </Card>
  );
}
