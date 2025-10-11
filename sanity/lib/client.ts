import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: {
    studioUrl,
    logger: console,
    filter: (props) => {
      if (props.sourcePath.at(-1) === "title") {
        return true;
      }

      return props.filterDefault(props);
    },
  },
});

const builder = imageUrlBuilder(client);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}

