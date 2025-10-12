import { groq } from "next-sanity";

export const settingsQuery = groq`*[_type == "settings"][0]`;

export const headerQuery = groq`*[_type == "header"][0]{
  titre,
  caption,
  "aboutPage": aboutPage->{
    "slug": slug.current,
    "theme": theme->{"slug": slug.current}
  }
}`;

const postFields = /* groq */ `
  _id,
  featured,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, ""),
  "slug": slug.current,
  caption,
  "audioUrl": audio.asset->url,
  audioTitle,
  excerpt,
  logo,
  coverImage,
  imageFirst,
  imageSecond,
  "date": coalesce(date, _updatedAt),
  "author": author->{"name": coalesce(name, "Anonymous"), picture},
  "theme": theme->{"name": coalesce(name, "Aucune"), "slug": slug.current},
  "images": images[],
  contentGroup
`;

const navFields = /* groq */ `
_id,
"status": select(_originalId in path("drafts.**") => "draft", "published"),
"title": coalesce(title, ""),
"slug": slug.current,
"date": coalesce(date, _updatedAt),
"theme": theme->{"name": coalesce(name, "Aucune"), "slug": slug.current}
`;


export const heroQuery = groq`*[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
  ${postFields}
}`;

export const moreStoriesQuery = groq`*[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
  ${postFields}
}`;

export const moreStoriesQueryByCategory = groq`*[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
  ${postFields}
}`;

export const allPostsQuery = groq`*[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
  ${navFields}
}`;

export const postQuery = groq`*[_type == "post" && slug.current == $slug] [0] {
  ${postFields}
}`;

