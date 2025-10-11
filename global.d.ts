import {formats} from './i18n/request';
 
type Formats = typeof formats;
 
declare global {
  // Use type safe formats with `next-intl`
  interface IntlFormats extends Formats {}
}