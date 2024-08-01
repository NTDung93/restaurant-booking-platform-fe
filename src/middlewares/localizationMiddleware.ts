import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { defaultLocale, locales } from '@/config/locale';

export default function localizationMiddleware(request: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    locales: locales,
    defaultLocale: defaultLocale,
  });

  return handleI18nRouting(request);
}
