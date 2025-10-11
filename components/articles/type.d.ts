interface ArticleProps {
  id: string;
  locale?: string;
  rubrique: string;
  slug: string;
  coverImage: string;
  title: string;
  date: string;
  excerpt?: string;
  author?: {
    name: any;
    picture: any;
  };
}