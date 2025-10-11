import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateComponent from "./date";
import MoreStories from "./more-stories";
import Onboarding from "./onboarding";

import type { HeroQueryResult, SettingsQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { heroQuery, settingsQuery } from "@/sanity/lib/queries";
import { unstable_setRequestLocale } from "next-intl/server";

type PropsRootPage = {
  params: { locale: string };
};

const noArticletitle = "Aucun article pour le moment..."
const noArticleText = "Ordinairement la press ne dors jamais. Mais de temps à autre, le journalisme fait une pause. \
          A moins que l'un d'entre-eux ai oublié d'appuyer sur le bouton 'publier à la une', nous vous invitons à revenir car le reveil est peut-être pour bientôt !"

function HeroPost({
  title,
  featured,
  slug,
  excerpt,
  coverImage,
  date,
  locale
}: Pick<
  Exclude<HeroQueryResult, null>,
  "title" | "coverImage" | "date" | "excerpt" | "author" | "slug" | "featured"
> & {locale:string}) {

  const rubrique = "actualite"

  const truncatedTitle = title.length > 100 ? `${title.slice(0, 100)}...` : title;
  const truncatedExcerpt = excerpt && excerpt.length > 100 ? `${excerpt.slice(0, 100)}...` : excerpt;

return(
  <article className="relative flex flex-col items-center group/hero">
    <div className="block w-full min-w-full cursor-pointer group group/image">
      <CoverImage image={coverImage} rounded={'rounded-lg'} wrapperClassNames={"w-full"} imgClassNames={"w-full object-cover"} priority />
    </div>
    <Link  href={`${locale}/posts/a-la-une/${slug}`} className="absolute top-0 left-0 w-full h-full md:gap-x-5 md:grid md:bg-[rgba(0,0,0,0.3)] 
     mb-8 md:mb-10 p-6 border-none rounded-lg
     overflow-hidden flex flex-col">
      <div className="hidden h-full md:flex flex-col max-w-75">
          <div className="mb-4 md:mb-0 font-semibold text-gray-50 text-lg">
            <DateComponent dateString={date} />
          </div>
          <div className="hover:no-underline overflow-hidden">
          <h1 className="mb-4 font-bold text-2xl leading-tight  text-gray-50 my-1animate-drop-in">
            {title}</h1>
          </div>
          <div className="grow relative">
          <button className="invisible absolute bottom-0 left-1/2 transform -translate-x-1/2 
          text-gray-50 py-2 px-4 rounded-lg 
            block transition-colors duration-75 delay-75 ease-in
            group-hover/hero:bg-yellow-400 group-hover/hero:visible">Consulter l&apos;article</button>
          </div>
      </div>
    </Link>
    <div className="mt-3 flex z-24 bg-white h-full md:hidden flex-col max-w-75">
          <div className="mb-4 md:mb-0 font-semibold text-gray-800 text-lg">
            <DateComponent dateString={date} />
          </div>
          <div className="hover:no-underline overflow-hidden">
          <h1 className="mb-4 font-bold text-2xl leading-tight  text-black my-1animate-drop-in">
            {title}</h1>
          </div>
          <div className="grow relative">
          <button className="
          text-black py-2 px-4 rounded-lg 
            block transition-colors duration-75 delay-75 ease-in
            bg-yellow-300
            hover:bg-yellow-400">Consulter l&apos;article</button>
          </div>
      </div>
  </article>
  )
}

export default async function Page({params }: PropsRootPage) {
  const locale = params.locale
  unstable_setRequestLocale(locale);
  const [settings, heroPost] = await Promise.all([
    sanityFetch<SettingsQueryResult>({
      query: settingsQuery,
    }),
    sanityFetch<HeroQueryResult>({ query: heroQuery }),
  ]);

  return (
    <div className={`bg-white z-10 relative mx-auto ${heroPost && heroPost.featured ? 'px-5' : 'px-0'} container`}>
      {heroPost && heroPost.featured ? (
        <HeroPost
          featured={heroPost.featured}
          title={heroPost.title}
          slug={heroPost.slug}
          coverImage={heroPost.coverImage}
          excerpt={heroPost.excerpt}
          date={heroPost.date}
          author={heroPost.author}
          locale={locale}
        />
      ) : (
        <Onboarding title={""} text={""} />
      )}
      {heroPost?._id && (
        <aside className="relative z-10 bg-white pt-4">
          <div className="ps-5 mt-24 mb-5">
            <h2 className="max-w-[50%] min-w-[200px] mb-8 pb-2 pt-5 border-t-4 border-t-gray-600 font-bold text-3xl leading-tight tracking-tighter">
              Nos autres articles
            </h2>
          </div>
       
          <Suspense>
              <div className={`${heroPost ? 'px-5' : 'px-0 bg-white relative z-24'}`}>
            <MoreStories skip={heroPost._id} limit={10} locale={locale}/>
              </div>
          </Suspense>
        </aside>
      )}
    </div>
  );
}

