import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['en', 'fr', 'ko'],
 
  defaultLocale: 'en'
});
 
export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)', '/']
};