import { Image } from "next-sanity/image";

import { urlForImage } from "@/sanity/lib/utils";

interface CoverImageProps {
    image: any;
    width: number;
    height: number;
    priority?: boolean;
    percentWidth?: string;
    imgClassNames?: string;
    wrapperClassNames?: string;
    rounded?: string;
    sizes: string;
}

export default function ImageWrapper(props: Partial<CoverImageProps>) {
    const { wrapperClassNames, imgClassNames, sizes = "", image: source, priority, width, height,  rounded, percentWidth = "w-full"} = props;

    const image = source?.asset?._ref ? (
        <Image
            className={`${rounded || ''} ${imgClassNames || ""}`}
            width={width ? width : 2000}
            height={height ? height : 1000}
            alt={source?.alt || ""}
            src={urlForImage(source)?.height(height ? height : 1000).width(width ? width : 2000).url() as string}
            sizes={sizes ? sizes : ""}
            priority={priority}
        />
    ) : (
        <div className="bg-slate-50 text-blue-800" style={{ paddingTop: "50%" }}>Aucune image trouvé</div>
    );

    return image
}





