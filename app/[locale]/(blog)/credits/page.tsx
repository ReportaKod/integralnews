import React from 'react';
import Link from "next/link";

type Image = {text:string, author: string, link: string }
type Images = Array<Image>

type Font = {
  title: string,
  text: string,
  author: string,
  link: string,
  license: string,
  licenseVersion: string,
  licenceUrlIntro: string,
  licenseUrl: string
  locale: "en" | "fr"
}
type Fonts = Array<Font>

type PropsRootPage = {
    params: { locale: string };
  };

function Page({params}: PropsRootPage) {
  const images: Images = [
    {
      text: "Image de fond journal et café, photo by",
      author: "cottonbro studio",
      link: "https://www.pexels.com/photo/person-holding-white-ceramic-mug-on-newspaper-3944418/"
    },
    {
      text: "Photo by",
      author: "Flo Dahm",
      link: "https://www.pexels.com/photo/turned-on-gray-laptop-computer-on-table-699459/"
    },
    {
      text: "Photo by",
      author: "cottonbro studio",
      link: "https://www.pexels.com/photo/person-holding-a-newspaper-6262967/"
    }
  ]

  const icons: Images = [
    {
      text: "Image de fond journal et café, photo by",
      author: "cottonbro studio",
      link: "https://www.pexels.com/photo/person-holding-white-ceramic-mug-on-newspaper-3944418/"
    },
    {
      text: "Photo by",
      author: "Flo Dahm",
      link: "https://www.pexels.com/photo/turned-on-gray-laptop-computer-on-table-699459/"
    },
    {
      text: "Photo by",
      author: "cottonbro studio",
      link: "https://www.pexels.com/photo/person-holding-a-newspaper-6262967/"
    },
    {
      text: "Photo by",
      author: "cottonbro studio",
      link: "https://www.pexels.com/photo/human-hand-holding-a-newspaper-7611758/"
    }
  ]

  const fonts: Fonts = [
    {
      title: "Josefin Sans",
      text: "with Reserved Font Name 'Josefin Sans'.",
      author: "Copyright 2010, The Josefin Sans Project Authors",
      link: "https://github.com/ThomasJockin/JosefinSansFont-master",
      license: "This Font Software is licensed under the SIL Open Font License",
      licenseVersion: "Version 1.1, - 26 February 2007",
      licenceUrlIntro: "This license is copied below, and is also available with a FAQ at:",
      licenseUrl: "https://openfontlicense.org",
      locale: "en"
    },
    {
        title: "Inter",
        text: "with Reserved Font Name 'Inter'.",
        author: "Copyright 2020, The Inter Project Authors",
        link: "https://github.com/rsms/inter",
        license: "This Font Software is licensed under the SIL Open Font License",
        licenseVersion: "Version 1.1, - 26 February 2007",
        licenceUrlIntro: "This license is copied below, and is also available with a FAQ at:",
        licenseUrl: "https://openfontlicense.org",
        locale: "en"
    },
    {
        title: "Playfair Display",
        text: "with Reserved Font Name 'Playfair Display'.",
        author: "Copyright 2017, The Playfair Display Project Authors",
        link: "https://github.com/clauseggers/Playfair-Display",
        license: "This Font Software is licensed under the SIL Open Font License",
        licenseVersion: "Version 1.1, - 26 February 2007",
        licenceUrlIntro: "This license is copied below, and is also available with a FAQ at:",
        licenseUrl: "https://openfontlicense.org",
        locale: "en"
      },
      
      {
        title: "Josefin Sans",
        text: "avec Nom de Police 'Josefin Sans' réservé.",
        author: "Copyright 2010, Les Auteurs du Projet Josefin Sans",
        link: "https://github.com/ThomasJockin/JosefinSansFont-master",
        license: "Ce Logiciel de Police est sous licence SIL Open Font License",
        licenseVersion: "Version 1.1, - 26 février 2007",
        licenceUrlIntro: "Cette licence est reproduite ci-dessous, et est également disponible avec une FAQ à:",
        licenseUrl: "https://openfontlicense.org",
        locale: "fr"
      },
      {
        title: "Inter",
        text: "avec Nom de Police 'Inter' réservé.",
        author: "Copyright 2020, Les Auteurs du Projet Inter",
        link: "https://github.com/rsms/inter",
        license: "Ce Logiciel de Police est sous licence SIL Open Font License",
        licenseVersion: "Version 1.1, - 26 février 2007",
        licenceUrlIntro: "Cette licence est reproduite ci-dessous, et est également disponible avec une FAQ à:",
        licenseUrl: "https://openfontlicense.org",
        locale: "fr"
      },
      {
        title: "Playfair Display",
        text: "avec Nom de Police 'Playfair Display' réservé.",
        author: "Copyright 2017, Les Auteurs du Projet Playfair Display",
        link: "https://github.com/clauseggers/Playfair-Display",
        license: "Ce Logiciel de Police est sous licence SIL Open Font License",
        licenseVersion: "Version 1.1, - 26 février 2007",
        licenceUrlIntro: "Cette licence est reproduite ci-dessous, et est également disponible avec une FAQ à:",
        licenseUrl: "https://openfontlicense.org",
        locale: "fr"
      }
  ]


  return (
    <div className={"max-w-3xl mx-auto px-5 flex flex-col gap-5"}>
      <h1 className={"text-3xl text-center font-bold mb-10"}>Crédits (images et autres)</h1>
      
      {fonts && fonts.length > 0 ? (
        <section>
          <h2 className={"mt-3 text-lg"}>Nos Polices (Google Fonts)</h2>
          <p className="my-1 italic text-xs">L'auto-hébergement se fait via Next Js. 
            &nbsp;<Link className="text-xs font-semibold text-teal-600 hover:underline" 
            href="https://nextjs.org/docs/14/app/building-your-application/optimizing/fonts">
                Cliquez ici pour savoir comment (technique).</Link> 
          </p>
          {fonts.filter(font => font.locale === params.locale).map(font => {
            return (
              <div className="my-3" key={font.link}>
                <h3 className="mt-4 text-lg">{font.title}</h3>
                <p className="my-1 text-sm">
                 {font.author} {font.text}
                </p>
                <Link className={"font-semibold text-sm text-teal-700 hover:underline"} href={font.link}>
                   Consulter la source ici
                  </Link>
                <h3 className="mt-2 text-md">Licence: </h3>
                  <Link className="font-semibold text-sm text-teal-700 hover:underline" href={font.licenseUrl}>
                    Consultez la licence ici
                  </Link>
                
                <p className="text-sm">
                  {font.license} {font.licenseVersion}
                </p>
              </div>
            )
          })}
        </section>
      ) : null}

      {images && images.length > 0 ? (
        <section>
          <h2 className={"my-3"}>Images libre de droits</h2>
          {images.map(image => {
            return (
              <div className="mb-3" key={image.link}>
                <p>
                  <span className={"font-bold"}>{image.author}</span>:&nbsp;
                  <Link className={"font-bold text-blue-600 hover:text-teal-800"} href={image.link}>
                    Découvrir la source
                  </Link>
                </p>
              </div>
            )
          })}
        </section>
      ) : null}

      {icons && icons.length > 0 ? (
        <section>
          <h2 className={"my-3"}>Icônes</h2>
          {icons.map(icon => {
            return (
              <div className="mb-3" key={icon.link}>
                <p>
                  <span className={"font-bold"}>{icon.author}</span>:&nbsp;
                  <Link className="font-bold text-blue-600 hover:text-teal-800" href={icon.link}>
                    Découvrir la source
                  </Link>
                </p>
              </div>
            )
          })}
        </section>
      ) : null}
    </div>
  );
}

export default Page;


