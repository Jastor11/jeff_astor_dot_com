import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const DeprecatedNotificationWrapper = styled.div`
  max-width: var(--max-width);
  margin: 1rem auto;
  padding: 0.5rem;

  & p {
    font-size: 1rem;
  }

  border-bottom: solid 2px var(--color-highlight);
  border-top: solid 2px var(--color-highlight);
`

const stripSlashesFromSlug = (slug) => (slug[0] === "/" ? "" : slug[0]) + slug.slice(1)

export default function DeprecatedNotification({ deprecatedSlug, newSlug, isDeprecated }) {
  if (!deprecatedSlug || !newSlug) return null

  const linkToDeprecatedSlug = `/blog/${stripSlashesFromSlug(deprecatedSlug)}/`
  const linkToNewSlug = `/blog/${stripSlashesFromSlug(newSlug)}/`

  return (
    <DeprecatedNotificationWrapper>
      <>
        {isDeprecated ? (
          <p>
            This post has been deprecated in favor of a more up-to-date version. If you're looking for the current one,
            it's available <Link to={linkToNewSlug}>here</Link>.
          </p>
        ) : (
          <p>
            This post has been modified from its previous version and might be different than one you've previously
            read. If you're looking for the old post, it can be found <Link to={linkToDeprecatedSlug}>here</Link>.
          </p>
        )}
      </>
    </DeprecatedNotificationWrapper>
  )
}
