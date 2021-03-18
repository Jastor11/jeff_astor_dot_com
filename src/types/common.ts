export type Category = string
export type ID = string
export type Slug = string
export type Tag = string
export type Datetime = Date | string

export type SocialType = "codepen" | "email" | "facebook" | "github" | "instagram" | "linkedin" | "twitter" | "youtube"

export interface AuthorContacts {
  email: string
  twitter: string
  github: string
}
export interface AuthorInfo {
  name: string
  photo: string
  bio: string
  contacts: AuthorContacts
}
export interface SiteMetadata {
  siteUrl: string
  copyright: string
  logo: string
  title: string
  subtitle: string
  info: AuthorInfo
}
export interface Site {
  siteMetadata: SiteMetadata
}
export interface SiteMeta {
  site: Site
}
