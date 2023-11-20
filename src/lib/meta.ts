import { config } from "@/core/config"

/** Small helper that appends `JeffAstor.com` to the current route meta title */
export function appendToMetaTitle(title: string | null | undefined) {
  if (!title) return config.site_title

  return `${title} | ${config.site_title}`
}

export function metaDescriptionOrDefault(description: string | null | undefined) {
  if (!description) return config.sub_title

  return description
}
