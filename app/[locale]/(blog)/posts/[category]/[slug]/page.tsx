import type { Metadata, ResolvingMetadata } from "next";
import { groq, type PortableTextBlock } from "next-sanity";
import { Image } from "next-sanity/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import Avatar from "../../../avatar";
import CoverImage from "../../../cover-image";
import DateComponent from "../../../date";
import MoreStories from "../../../more-stories";
import {PortableText} from '@portabletext/react'
import { PortableTextEnriched } from "../../../portable-text-enriched";
import { AudioPlayer } from "@/components/utilities/players/AudioPlayer";
import ConditionalSocialShare from "@/components/utilities/socials/ConditionalSocialShare";

import type {
  PostQueryResult,
  PostSlugsResult,
  SettingsQueryResult,
} from "@/sanity.types";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postQuery, settingsQuery } from "@/sanity/lib/queries";
import {resolveOpenGraphImage, urlForImage} from "@/sanity/lib/utils";

// Import the unstable_setRequestLocale function
import { unstable_setRequestLocale } from 'next-intl/server';
import ImageWrapper from "@components/images/imageWrapper";
import Fancybox  from "@components/fancybox/FancyBox";


type Props = {
  params: { category: string, slug: string, locale: string };
};

const postSlugs = groq`*[_type == "post"]{slug}`;

export async function generateStaticParams() {
  const params = await sanityFetch<PostSlugsResult>({
    query: postSlugs,
    perspective: "published",
    stega: false,
  });
  return params.map(({ slug }) => ({ slug: slug?.current }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const post = await sanityFetch<PostQueryResult>({
    query: postQuery,
    params,
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);

  return {
    authors: post?.author?.name ? [{ name: post?.author?.name }] : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      type: 'article',
      locale: 'fr_TG',
      url: `https://djifcommunication.vercel.app/${params.locale}/posts/${params.category}/${params.slug}`,
      siteName: 'Intégrales News',
      publishedTime: post?.date,
      authors: post?.author?.name ? [post.author.name] : [],
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
    twitter: {
      card: 'summary_large_image',
      images: ogImage ? [ogImage.url] : [],
    },
  } satisfies Metadata;
}

export default async function PostPage({ params }: Props) {
  
  const locale = params.locale || 'fr'; 
  unstable_setRequestLocale(locale);  

  const [post, settings] = await Promise.all([
    sanityFetch<any>({
      query: postQuery,
      params,
    }),
    sanityFetch<SettingsQueryResult>({
      query: settingsQuery,
    }),
  ]);
  
  if (!post?._id) {
    return notFound();
  }


  // Categories where we don't show the author
  const categoriesWithoutAuthor = ["credits", "qui-sommes-nous"];
  const shouldShowAuthor = post.author && !categoriesWithoutAuthor.includes(params.category);

  return (
    <div className={`category-article ${params.category} mx-auto px-5 container`}>
      <article className="flex flex-col items-center">
        <h1 className="mb-12 font-bold text-2xl text-balance text-center md:text-4xl leading-tight md:leading-none tracking-tighter">
          {post.title}
        </h1>
        {shouldShowAuthor ? (
        <div className="md:block hidden md:mb-12">
            <Avatar name={post.author.name} picture={post.author.picture} />
        </div>) : null}
        {/* Display logo if present, otherwise fallback to cover image */}
        {post.logo && params.category !== "credits" ?
        (<div className="flex flex-col items-center mx-auto mb-4 w-full max-w-md">
          <div className="w-full flex items-center justify-center p-2">
            <Image
              className="w-auto h-auto max-w-full max-h-[300px] object-contain"
              width={800}
              height={800}
              alt={post.logo.alt || "Logo"}
              src={urlForImage(post.logo)?.width(800).url() as string}
              priority
            />
          </div>
          {post.logo.legend ? <p className="mt-4 text-sm text-center text-gray-500">{post.logo.legend}</p> : null}
        </div>)
        : post.coverImage && params.category !== "credits" ?
        (<div className="flex flex-col items-center mx-auto 1sm:mx-0 mb-8 md:mb-16 max-w-2xl">
          <CoverImage image={post.coverImage} percentWidth="w-[65%]" priority />
          {post.coverImage.legend ?<p className="my-2 text-sm text-gray-500">{post.coverImage.legend} </p>:null}
        </div>):null}
        <div className={`w-full ${post?.imageFirst || post?.imageSecond ? "max-w-3xl" : "max-w-2xl"}`}>
          {shouldShowAuthor ? (
          <div className="block md:hidden mb-6">
              <Avatar name={post.author.name} picture={post.author.picture} />
          </div>) : null}
          <div className="mb-6 text-lg">
            <div className="mb-4 text-lg flex flex-col gap-2">
              <DateComponent dateString={post.date} />
              {params.category !== "credits" ?
                
              (<div className="flex justify-between items-center gap-5">
              <ConditionalSocialShare
                  shares={[
                    { type: "facebook" },
                    { type: "linkedin" },
                    { type: "whatsapp" },
                    { type: "bluesky" },
                    { type: "email" },
                  ]}
                  title={post.title}
                  description={post.excerpt}
                  media={post.coverImage?.asset?.url}
                  variant="icon"
                />
             
                {post.audioUrl && <AudioPlayer audioUrl={post.audioUrl} title={post.audioTitle} />} 
                </div>
                ) : null}
            </div>
          </div>
        </div>
        <div className={`${post?.imageFirst || post?.imageSecond ? "" +
            "max-w-3xl mx-auto w-full flex flex-col-reverse sm:flex-row gay-y-5 sm:gap-x-10 sm:gap-y-2" : "w-full mx-auto max-w-2xl flex flex-col items-center"}`}>
          <div className="mt-5 sm:mt-0 w-full sm:grow portable-text-enriched">
            {post?.caption ? <p className="no-drop-cap text-md font-semibold"><em>{post.caption}</em></p> : null}
            <div className={`portable-text-content ${post?.contentGroup?.firstLetterStyle ? 'drop-cap' : ''}`}>
            {/* Contenu stylisable (Portable Text) */}
            {post?.contentGroup?.richContent?.length ? (
              <PortableTextEnriched
                value={post.contentGroup.richContent}
              />
            ): null}
            {/* Contenu simple (texte brut) */}
            {post?.contentGroup?.simpleContent ? (
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.contentGroup.simpleContent.replace(/\n/g, '<br>') }} />
            ): null}
            </div>
          </div>
          <div className="sm:w-[80%] flex flex-col gap-5">
            <div className="w-full h-auto flex flex-col">
              {post?.imageFirst ?
                <div className="w-full">
                  <ImageWrapper rounded="rounded" image={post?.imageFirst} width={1000} height={1000} imgClassNames={"object-cover aspect-square"} priority />
                  {post.imageFirst.legend ?<p className="my-2 text-sm text-teal-800 font-bold">{post.imageFirst.legend} </p>:null}
                </div>  
            : null}
            </div>
            <div className="w-full h-auto flex flex-col">
              {post?.imageSecond ?
                <div className="w-full">
                  <ImageWrapper rounded="rounded" image={post?.imageSecond} width={1000} height={1000} imgClassNames={"object-cover aspect-square"} priority />
                  {post.imageSecond.legend ?<p className="my-2 text-sm text-teal-800 font-bold">{post.imageSecond.legend} </p>:null}
                </div>  
            : null}
            </div>
          </div>
        </div>

      {/* 
        {post.images && post.images.length > 0 ?
      (<div className={`${post?.imageFirst || post?.imageSecond ? "max-w-3xl" : "max-w-2xl"} mx-auto p-0 w-full`}>
        <div className={"grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-10"}>
          {post.images?.filter((image: any) => image.asset && image._key).map((image: any) => (
            <div key={image._key} className="h-full">
                <div className="relative  rounded flex flex-col items-center justify-center bg-transparent dark:text-white">
                  <ImageWrapper rounded={"rounded"} image={image} width={1000} height={500} imgClassNames={""} priority />
                </div>
                <div className={"mt-2 mb-5"}>
                  <p className={"p-0 m-0"}>{image.legend}</p>
                </div>
            </div>

          ))}
        </div>
      </div>):null}
     */} 


        {params.category === "credits" ? <Link className={"max-w-2xl w-full mt-5 font-bold text-teal-700 hover:text-blue-800"} href={"/fr/credits"}>Consulter le reste des crédits </Link> : null}
      </article>


      {post.images && post.images.length > 0 ?
      (<div className={`${post?.imageFirst || post?.imageSecond ? "max-w-3xl" : "max-w-2xl"} mx-auto p-0 w-full`}>
        <div>
          <Fancybox
              options={{
                Carousel: {
                  infinite: false,
                },
              }}
          >
          {post.images?.filter((image: any) => image.asset && image._key).map((image: any) => (
              <div key={image._key} >
                  <a data-fancybox="gallery" 
                      href={urlForImage(image)?.height(1600).width(1200).url() as string} 
                      className="h-full"
                      data-caption={image.legend}
                    >
                      <ImageWrapper rounded={"rounded"} image={image} width={1000} height={500} imgClassNames={""} priority />
                  </a>
                  <div className={"mt-2 mb-5"}>
                    <p className={"p-0 m-0"}>{image.legend}</p>
                  </div>
                </div>
          ))}
          </Fancybox>
        </div>
      </div>):null}

   

      <aside>
        <hr className="border-accent-2 mt-20 mb-24" />
        <h2 className="mb-5 font-bold text-3xl md:text-4xl leading-tight tracking-tighter">
          Nos récents articles
        </h2>
        <Suspense>
          <MoreStories skip={post._id} limit={2} locale={locale} />
        </Suspense>
      </aside>
    </div>
  );
}
