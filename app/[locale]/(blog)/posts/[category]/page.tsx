import { unstable_setRequestLocale } from "next-intl/server";
import { allPostsQuery, moreStoriesQuery, moreStoriesQueryByCategory } from "@/sanity/lib/queries";
import type { AllPostsQueryResult, MoreStoriesQueryResult } from "@/sanity.types";
import React from "react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { ArticleV2 } from "@/components/articles/Articles"
import { getSanityLanguage } from "@/lib/i18n";

type PropsCategoryPage = {
    params: { locale: string, category: string};
  };


export default async function Page({params }: PropsCategoryPage) {

    const locale = params.locale
    const categoryParams = params.category
    const language = getSanityLanguage(locale);
    
    const posts: AllPostsQueryResult[] = await sanityFetch<AllPostsQueryResult[]>({
      query: allPostsQuery,
    });
 
    unstable_setRequestLocale(locale);
  
    const data = await sanityFetch<MoreStoriesQueryResult>({
      query: moreStoriesQueryByCategory,
    });
  
    return (
      <>
        <div className="mx-auto max-w-1xl gap-y-20 md:gap-x-16 md:gap-y-32 
        lg:gap-x-32 flex flex-col mb-32 container">
          {data?.filter(post => post.theme !== null && post.theme.slug === categoryParams).map((post:any) => {
            const { _id, title, slug, coverImage, excerpt, author, theme } = post;

  
            if (!title ||!slug ||!coverImage) {
              return null;
            }
  
            const rubrique = theme.slug.name ? theme.slug.name : "actualite"
      
            return (
              <ArticleV2      
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


