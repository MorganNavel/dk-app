import { Button } from "@/components/ui/button";
import "../globals.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-background text-foreground'>
      <div className='text-center p-6'>
        <h1 className='text-9xl font-bold text-primary'>404</h1>
        <h2 className='text-4xl font-semibold mt-4'>Page Not Found</h2>
        <p className='mt-4 text-lg text-muted-foreground'>
          Oops! The page you are looking for does not exist.
        </p>
        <Link href='/'>
          <Button className='mt-6 px-12 py-6 text-lg'>Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
}
