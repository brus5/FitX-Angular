import {FacebookSeo} from './facebook-seo';
import {TwitterSeo} from './twitter-seo';

export interface Seo {
  componentName: string;
  url: string;
  title: string;
  image: string;
  description: string;
  facebook: FacebookSeo;
  twitter: TwitterSeo;
}
