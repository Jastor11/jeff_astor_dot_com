import React from "react"
import Helmet from "react-helmet"
import config from "config/SiteConfig"
import styled from "styled-components"

import "katex/dist/katex.min.css" // KaTeX css file
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import "assets/css/variables.css"

const LayoutWrapper = styled.div<{ $dark?: boolean }>`
  ${(props) => (props.$dark ? `background: var(--color-dark);` : ``)};
  flex: 1;
  height: 100vh;

  .Layout {
    width: 100%;
  }
  .index-container,
  .app-container,
  .post-container {
    display: flex;
    flex-direction: column;
  }

  .stroke-dark path,
  .stroke-dark rect,
  .stroke-dark circle,
  .stroke-dark polyline,
  .stroke-dark line {
    stroke: var(--color-dark);
  }
  .fill-dark path,
  .fill-dark rect,
  .fill-dark circle,
  .fill-dark polyline,
  .fill-dark line {
    fill: var(--color-dark);
  }
  .stroke-white path,
  .stroke-white rect,
  .stroke-white circle,
  .stroke-white polyline,
  .stroke-white line {
    stroke: var(--color-white);
  }
  .fill-white path,
  .fill-white rect,
  .fill-white circle,
  .fill-white polyline,
  .fill-white line {
    fill: var(--color-white);
  }

  /* HACK FOR SAFARI ONLY GARBAGE ASS BULLSHIT Safari 7.1+ */
  /* _::-webkit-full-page-media, _:future, :root, .safari-only-post-preview {
    min-height: 250px;
  } */

  #app-confirmation-fade-portal {
    position: absolute;
  }
`

interface ILayout {
  dark?: boolean
}
const Layout: React.FC<ILayout> = ({ dark, children }) => {
  React.useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((r) => r.unregister())
      })
    }
  }, [])

  return (
    <>
      <Helmet>
        <meta name="description" content={config.siteDescription} />
      </Helmet>
      <LayoutWrapper $dark={dark} data-theme="levels">
        <>{children}</>
      </LayoutWrapper>
    </>
  )
}

export default Layout
