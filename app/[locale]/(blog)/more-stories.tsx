import { ArticleV3 } from "@components/articles/Articles"

import type { MoreStoriesQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { moreStoriesQuery } from "@/sanity/lib/queries";
import { getSanityLanguage } from "@/lib/i18n";

export default async function MoreStories(params: {
  skip: string;
  limit: number;
  locale: string;  
}) {

  const locale = params.locale;
  const language = getSanityLanguage(locale);

  const data = await sanityFetch<MoreStoriesQueryResult>({
    query: moreStoriesQuery,
    params: { skip: params.skip, limit: params.limit },
  });

  // Debug logging
  console.log('MoreStories - Language:', language);
  console.log('MoreStories - Params:', { ...params, language });
  console.log('MoreStories - Data:', data);

  return (
    <>
      <div className="gap-y-20 md:gap-x-8 md:gap-y-16 lg:gap-x-18 grid grid-cols-1 md:grid-cols-2 mb-32">
        {data?.map((post:any) => {
          const { _id, title, slug, coverImage, excerpt, author, theme } = post;

          if (!title ||!slug ||!coverImage) {
            return null;
          }

          if(post.theme.slug === "credits" || post.theme.slug === "qui-sommes-nous") {
            return null;
          }

          const rubrique = theme.slug ? theme.slug : "actualite";

          return (
            <ArticleV3
              id={_id}
              key={_id}
              locale={locale}
              rubrique={rubrique}
              slug={slug}
              coverImage={coverImage}
              title={title}
              date={post.date}
              excerpt={excerpt}
              author={author}
            />
          );
        })}
      </div>
    </>
  );
}
