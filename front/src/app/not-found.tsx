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
        <Link
          href='/'
          className='mt-6 inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-primary-dark transition-colors duration-300'
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
