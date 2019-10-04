export interface News {
  id: string;
  title: string;
  urlTitle: string;
  content: string;
  bigHeader: boolean;
  imageHeader: string;
  images: string[];
  date: string; // required by firebase :(
}
