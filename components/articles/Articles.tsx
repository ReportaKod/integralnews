import React from 'react';
import Link from 'next/link';
import { Image } from "next-sanity/image";
import Avatar from "@components/avatar/Avatar"
import CoverImage from "@components/images/CoverImage";
import DateComponent from "@components/utilities/date/DateComponent";
import { urlForImage } from "@/sanity/lib/utils";

// Fonction utilitaire pour tronquer l'excerpt
const truncateExcerpt = (text: string, maxLength: number = 450): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trim() + '...';
};

export const ArticleV1: React.FC<ArticleProps> = ({
  id,
  locale = 'fr',
  rubrique,
  slug,
  coverImage,
  logo,
  useSquareImage,
  title,
  date,
  excerpt,
  author,
}) => {
  const displayImage = useSquareImage && logo ? logo : coverImage;
  const isSquare = useSquareImage && logo;

  return (
    <article key={id}>
      <Link href={`/${locale}/posts/${rubrique}/${slug}`} className="block mb-5 group">
        {isSquare ? (
          <div className="flex items-center justify-center w-[80%] mx-auto">
            <Image
              className="w-auto h-auto max-w-full max-h-[300px] object-contain"
              width={800}
              height={800}
              alt={logo?.alt || "Logo"}
              src={urlForImage(logo)?.width(800).url() as string}
              priority={false}
            />
          </div>
        ) : (
          <CoverImage image={displayImage} priority={false} percentWidth="w-[80%]" />
        )}
      </Link>
      <h3 className="mb-3 text-2xl font-semibold text-balance leading-snug">
        <Link href={`/${locale}/posts/${rubrique}/${slug}`} className="hover:text-green-800">
          {title}
        </Link>
      </h3>
      <div className="mb-4 text-lg text-green-800 font-semibold">
        <DateComponent dateString={date} />
      </div>
      {excerpt && (
        <p className="mb-4 text-lg text-pretty leading-relaxed">
          {truncateExcerpt(excerpt)}
        </p>
      )}
      {author && <Avatar name={author.name} picture={author.picture} />}
    </article>
  );
};

export const ArticleV2: React.FC<ArticleProps> = ({
  id,
  locale = 'fr',
  rubrique,
  slug,
  coverImage,
  logo,
  useSquareImage,
  title,
  date,
  excerpt,
  author,
}) => {
  const displayImage = useSquareImage && logo ? logo : coverImage;
  const isSquare = useSquareImage && logo;

return (
  <article key={id} className="flex flex-col sm:flex-row gap-10">
      <div className="flex flex-col gap-2 basis-[50%]">
      <Link href={`/${locale ? locale : "fr"}/posts/${rubrique}/${slug}`} className="block mb-5 group">
      {isSquare ? (
        <div className="flex items-center justify-center w-[80%] mx-auto">
          <Image
            className="w-auto h-auto max-w-full max-h-[300px] object-contain"
            width={800}
            height={800}
            alt={logo?.alt || "Logo"}
            src={urlForImage(logo)?.width(800).url() as string}
            priority={false}
          />
        </div>
      ) : (
        <CoverImage image={displayImage} priority={false} percentWidth={'w-[80%]'}/>
      )}
      </Link>
      </div>
      <div className="flex flex-col gap-3 basis-[50%]">
      <div className="flex flex-col gap-1">
     {date ?    
      <div className="flex gap-10 align-center text-md text-green-800 font-semibold">
          <DateComponent dateString={date} /> {author ? `par ${author.name}` : null}
      </div> : null}
      <h3 className="mb-3 text-2xl text-balance leading-snug font-bold">
          <Link href={`/${locale}/posts/${rubrique}/${slug}`} className="hover:text-green-800">
          {title}
          </Link>
      </h3>

      </div> 

      {excerpt && (
      <p className="mb-4 text-md text-pretty leading-relaxed">
          {truncateExcerpt(excerpt)}
      </p>
      )}
      </div>
  </article>
);
}

export const ArticleV3: React.FC<ArticleProps> = ({
  id,
  locale = 'fr',
  rubrique,
  slug,
  coverImage,
  logo,
  useSquareImage,
  title,
  date,
  excerpt,
  author,
}) => {
  const displayImage = useSquareImage && logo ? logo : coverImage;
  const isSquare = useSquareImage && logo;

return (
  <article key={id} className="p-5 border border-3 border-black-400 flex flex-col gap-0 rounded-lg bg-slate-100">
      <div className="flex flex-col gap-2">
        <Link href={`/${locale ? locale : "fr"}/posts/${rubrique}/${slug}`} className="block m-0 p-0 group">
          {isSquare ? (
            <div className="flex items-center justify-center w-full rounded-lg bg-white p-4">
              <Image
                className="w-auto h-auto max-w-full max-h-[300px] object-contain rounded-lg"
                width={800}
                height={800}
                alt={logo?.alt || "Logo"}
                src={urlForImage(logo)?.width(800).url() as string}
                priority={false}
              />
            </div>
          ) : (
            <CoverImage image={displayImage} 
            priority={false} 
            percentWidth={'w-[100%]'} 
            imgClassNames='rounded-lg'
            wrapperClassNames="rounded-lg"/>
          )}
        </Link>
      </div>
      <div className="py-3 px-5 flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center gap-1">
          {date ?    
          <div className="flex flex-col gap-1 text-md text-green-800 font-semibold">
              <DateComponent dateString={date} /> 
              {author ? <span className="text-sm italic">Par {author.name}</span> : null}
          </div> : null}
          {author && (
            <div className="flex gap-2 align-center text-md text-green-800 font-semibold">
              <Avatar name={""} picture={author.picture} />
            </div>
          )}
          </div>
          <h3 className="text-2xl text-balance leading-snug font-bold">
            <Link href={`/${locale}/posts/${rubrique}/${slug}`} className="hover:text-violet-700 transition-all duration-300 ease-in-out">
            {title}
            </Link>
          </h3>
          {excerpt && (
          <p className="text-md text-pretty leading-relaxed">
              {truncateExcerpt(excerpt)}
          </p>
          )}
        </div> 
      </div>
  </article>
);
}