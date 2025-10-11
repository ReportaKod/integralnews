"use client"
import { Newspaper, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import Image from "next/image"

const emptySubscribe = () => () => {};

export default function Onboarding({...props}:any) {

  const { text, title } = props;

  const target = useSyncExternalStore(
    emptySubscribe,
    () => (window.top === window ? undefined : "_blank"),
    () => "_blank"
  );

  return (
    <div className="flex flex-col items-center bg-blue-900 text-gray-800">
      <div className="fixed top-0 h-full inset-0 -z-5">
            <Image
                src="/backgrounds/hands.jpg"
                alt="Background Hands"
                layout="fill"        
                className="opacity-70 object-cover object-center"
                priority
            />
          </div>
      <div className="z-10 mt-5 max-w-[75%] p-5 rounded-lg shadow-sm bg-gray-50 text-center">
        <Newspaper className="my-5 mx-auto h-20 w-20 text-teal-800" />
        <h1 className="mt-4 text-2xl text-gray-800 font-bold">{title}</h1>
        <p className="mt-2 text-sm text-gray-800">
          {text}
        </p>
      </div>

      <div className="z-10 my-5 max-w-[75%] p-5 rounded-lg shadow-sm bg-gray-50 text-center">
      <h2 className="mt-4 text-2xl text-gray-800 font-bold">Vous êtes journaliste chez nous ? </h2>
      <Link
        href="fr/studio/structure/post"
        target={target}
        className="mt-6 inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm 
        font-semibold !text-white shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        <PlusCircle className="mr-2 h-5 w-5" />
        Créer un article
      </Link>
      </div>
    </div>
  );
}
