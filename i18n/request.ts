import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
import {Formats} from 'next-intl';
 
export const formats = {
  dateTime: {
    short: {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  },
  number: {
    precise: {
      maximumFractionDigits: 5
    }
  },
  list: {
    enumeration: {
      style: 'long',
      type: 'conjunction'
    }
  }
} satisfies Formats;
 
 
export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  // Validate that the incoming `locale` parameter is valid
  if (!requested || !routing.locales.includes(requested as any)) notFound();
  const locale = requested;
 
  return {
    locale,
    formats,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'Africa/Lome'
  };
});