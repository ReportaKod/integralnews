import Image from "next/image";
import { ConditionalYouTubeEmbed } from '@components/media/ConditionalYouTubeEmbed'
import { PortableText } from '@portabletext/react'
import urlBuilder from '@sanity/image-url'
import { apiVersion, dataset, projectId } from '@/sanity/lib/api'
import { createClient } from 'next-sanity'
import {getImageDimensions} from '@sanity/asset-utils'
import parameters from "@/sanity/schemas/objects/parameters";

type PortableTextImageProps = {
  value: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  isInline?: boolean;
} 


/**
* SampleImageComponent is a custom component for rendering images in Portable Text.
* It uses the Sanity client to fetch the image URL and display it with Next.js Image component.
* Source : https://www.sanity.io/answers/adding-images-to-post-content-using-portable-text-and-sanity-image-url-builder-
* To enhance this code : https://hdoro.dev/performant-sanity-io-images
*/
const PortableNextImage = ({value, isInline}: PortableTextImageProps) => {
  const {width, height} = getImageDimensions(value)
  const sanityClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
  })
  
  const imageUrl = urlBuilder(sanityClient)
    .image(value)
    .width(isInline ? 100 : 800)
    .fit('max')
    .auto('format')
    .url()

  return (
    <Image
      src={imageUrl}
      alt={value.alt || ' '}
      width={isInline ? 100 : 800}
      height={Math.round((isInline ? 100 : 800) * (height / width))}
      priority={false}
      sizes={isInline ? "(max-width: 100px) 100px" : "(max-width: 800px) 100vw, 800px"}
      style={{
        display: isInline ? 'inline-block' : 'block',
        float: isInline ? 'left' : 'none',
        maxWidth: isInline ? '50%' : '100%',
        margin: isInline ? '0 1rem 0 0' : '0',
        aspectRatio: width / height,
      }}
      className={`w-full h-auto object-cover rounded-lg`}
    />
  )
}

const PortableYoutubeEmbeb = ({value}: any) => {
   
    return (
        <ConditionalYouTubeEmbed
            videoid={value.id ? value.id : ""}
            height={400}
            params="controls=0"
            playlabel={`Play ${value.title ? value.title : ""}`}
            style="border-radius: 0.5rem; overflow: hidden;"
            title={value.title}
        />
    )
  }



const components = {
  types: {
    image: PortableNextImage,
    youtube: PortableYoutubeEmbeb,
  },
}

export const PortableTextEnriched = (props: any) => {
  return <PortableText value={props.value} components={components} />
}