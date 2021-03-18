import React from "react"
import { ContactIcon } from "src/components"
import { useSiteMeta } from "src/hooks"
import styled from "styled-components"
import * as constants from "src/utils/constants"
import media from "src/utils/media"

const AuthorWrapper = styled.div<{ $small?: boolean; $moveUp?: number }>`
  grid-area: author;
  text-align: center;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 100%;
  padding: 0 10px 5px 0;
  padding: ${(props) => (props.$small ? "0px" : "0 10px 5px 0")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--color-dark);
  transform: ${(props) => (props.$moveUp ? `translateY(-${props.$moveUp}px)` : "")};

  display: ${(props) => (props.$small ? "inline-block" : "none")};

  ${(props) => media.tablet`
    display: ${props.$small ? "none" : "block"};
    transform: translateY(40px);
  `}
  ${(props) => media.large`
    padding: 0 20px 10px 40px;  
    text-align: right;
    transform: ${props.$moveUp ? `translateY(-${props.$moveUp}px)` : ""};    
  `}
`
const LandingTitle = styled.h2`
  font-size: 18px;
  color: white;
  font-weight: bold;
  margin-bottom: 5px;
  transform: translateY(-5px);

  ${media.large`
    font-size: 22px;
  `};
`
const LandingSubtitle = styled.p<{ $small?: boolean }>`
  color: white;
  font-weight: 200;
  margin-bottom: ${(props) => (props.$small ? "-20px" : "5px")};
  font-size: 14px;
  margin-top: 10px;

  ${media.small`
    font-size: 18px;  
  `}

  ${media.large`
    font-size: 20px;
  `}
`
const AuthorFooter = styled.div`
  & > span {
    font-size: 12px;
  }
`
const SocialIconContainer = styled.div`
  margin-bottom: 5px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  transform: translateX(-12px);

  ${media.large`
    transform: translateX(0px);
  `}
`

interface IAuthor {
  small?: boolean
  moveUp?: number
}
const Author: React.FC<IAuthor> = ({ small, moveUp }) => {
  const data = useSiteMeta()

  if (small)
    return (
      <AuthorWrapper $small={small} $moveUp={moveUp}>
        <LandingSubtitle $small={small}>{data.site.siteMetadata.subtitle}</LandingSubtitle>
      </AuthorWrapper>
    )

  return (
    <AuthorWrapper $moveUp={moveUp}>
      <LandingTitle>hey i'm jeff astor</LandingTitle>
      <LandingSubtitle>{data.site.siteMetadata.subtitle}</LandingSubtitle>

      <SocialIconContainer>
        {constants.socials.map((item) => (
          <React.Fragment key={item.link}>
            <ContactIcon item={item} size="sm" />
            {/* <SocialIcon item={item} key={item.link} /> */}
          </React.Fragment>
        ))}
      </SocialIconContainer>

      <AuthorFooter>
        <span>{data.site.siteMetadata.copyright}</span>
      </AuthorFooter>
    </AuthorWrapper>
  )
}

export default Author
