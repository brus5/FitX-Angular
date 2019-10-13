import {FacebookSeo} from './facebook-seo';
import {TwitterSeo} from './twitter-seo';

export interface Seo {
  name: string;
  facebook: FacebookSeo;
  twitter: TwitterSeo;
}
