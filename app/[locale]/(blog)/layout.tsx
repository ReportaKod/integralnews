// styles
import "../globals.css";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

// Libs
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getFormatter } from 'next-intl/server';

import { ConditionalSpeedInsights } from "@components/analytics/ConditionalSpeedInsights";
import { ConditionalFontAwesome } from "@components/icons/ConditionalFontAwesome";
import type { Metadata } from "next";

import {
  VisualEditing,
  toPlainText,
} from "next-sanity";
import { Inter, Josefin_Sans, Playfair_Display, Noticia_Text } from "next/font/google";
import { draftMode } from "next/headers";

import { Suspense } from "react";

// Components
import { Header } from "@components/layouts/Header";
import { Footer } from "@components/layouts/Footer";
import { CookieBanner } from "@components/cookies/CookieBanner";

import AlertBanner from "./alert-banner";
import Image from "next/image";

import type { SettingsQueryResult, HeaderQueryResult } from "@/sanity.types";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allPostsQuery, settingsQuery, headerQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { getSanityLanguage } from "@/lib/i18n";

import type { AllPostsQueryResult } from "@/sanity.types";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SettingsQueryResult>({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || ""
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'fr_TG',
      url: 'https://djifcommunication.vercel.app',
      siteName: title,
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      images: ogImage ? [ogImage.url] : [],
    },
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const josefin_Sans = Josefin_Sans({
  variable: "--josefin-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair_Display = Playfair_Display({
  variable: "--playfair-display",
  subsets: ["latin"],
  display: "swap",
});


const noticia = Noticia_Text({
  variable: "--noticia",
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});


export default async function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {

  const posts: AllPostsQueryResult[] = await sanityFetch<AllPostsQueryResult[]>({
    query: allPostsQuery,
  });

     const messages = await getMessages();
    
    // Get a formatter instance with the locale
    const format = await getFormatter({locale});
    const dateTime = new Date()
    // Format the date using the formatter, ensuring it returns a string
    const formattedDateTime = format.dateTime(dateTime, {
      dateStyle: 'full'
    });

    const metadata = await generateMetadata()
    const header = await sanityFetch<HeaderQueryResult>({
      query: headerQuery,
      // Metadata should never contain stega
      stega: false,
    });

    let title = "";
    let caption = "";
    let aboutPage = null;
    if(header) {
      title = header.titre ? header.titre : "";
      caption = header.caption ? header.caption : "";
      aboutPage = header.aboutPage;
    }
    
  return (
    <html lang={locale} className={`${josefin_Sans.variable} ${playfair_Display.variable} ${noticia.variable} ${inter.variable} bg-white text-black scroll-smooth overflow-x-hidden`} suppressHydrationWarning >
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="apple-mobile-web-app-title" content="Integrales News" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta name="theme-color" content="#ffffff" />
      </head>

      <body className="flex flex-col items-center bg-blue-500 -z-10 mx-0 my-0 overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
        <Suspense fallback={<p>Chargement...</p>}>
        <Header 
          posts={posts}
          locale={locale}
          title={title}
          description={caption}
          dateTime={formattedDateTime}
          aboutPage={aboutPage} />
        </Suspense>
            {draftMode().isEnabled && <AlertBanner />}
          <div className="fixed top-0 inset-0 -z-5">
            <Image
                src="/backgrounds/hands.jpg"
                alt="Background Hands"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="opacity-50"
                priority
            />
          </div>
            <main className="bg-white pt-[var(--header-size)]  z-10 lg:pt-[350px] w-full max-w-[1200px] min-h-screen">{children}</main>
            <Suspense fallback={<p>Chargement...</p>}>
              <Footer locale={locale} />
            </Suspense>
          {draftMode().isEnabled && <VisualEditing />}
          <ConditionalSpeedInsights />
          <ConditionalFontAwesome />
          <CookieBanner locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
