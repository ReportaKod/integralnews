interface ArticleProps {
  id: string;
  locale?: string;
  rubrique: string;
  slug: string;
  coverImage: any;
  logo?: any;
  useSquareImage?: boolean;
  title: string;
  date: string;
  excerpt?: string;
  author?: {
    name: any;
    picture: any;
  };
}