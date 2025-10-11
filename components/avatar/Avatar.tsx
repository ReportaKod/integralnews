import { Image } from "next-sanity/image";

import type { Author } from "@/sanity.types";
import { urlForImage } from "@/sanity/lib/utils";

interface Props {
  name: string;
  picture: Exclude<Author["picture"], undefined> | null;
}

export default function Avatar({ name, picture }: Props) {
  return (
    <div className="flex items-center text-xl">
      {picture?.asset?._ref ? (
        <div className={`${name ? "mr-4": ""} w-12 h-12`}>
          <Image
            alt={picture?.alt || ""}
            className="rounded-full h-full object-cover"
            height={48}
            width={48}
            src={
              urlForImage(picture)
                ?.height(96)
                .width(96)
                .fit("crop")
                .url() as string
            }
          />
        </div>
      ) : null}
      {name ? (
        <div className="font-bold text-pretty text-lg">{name}</div>
      ): null}
    
    </div>
  );
}
