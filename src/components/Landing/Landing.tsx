import React from "react"
import { Link } from "gatsby"

import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

import { Author, Navbar, PostPreview } from "src/components"
import { useLandingQuery, useAuthorPhoto } from "src/hooks"

import styled from "styled-components"
import media from "src/utils/media"

const LandingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "nav nav"
    "main main"
    "main main";
  min-height: 100vh;
  background: var(--color-dark);
  color: var(--color-white);

  ${media.tablet`
    grid-template-columns: 2fr 300px;
    grid-template-rows: 1fr 340px;
    grid-template-areas: 
    "main hero"
    "main author";  
    overflow: hidden;          
  `}
  ${media.large`
    grid-template-columns: 2fr 1.2fr;
    grid-template-rows: 1fr 260px;
  `}
`
const JumboSlantedImage = styled(GatsbyImage)`
  clip-path: polygon(0 0, 100% 0%, 100% 60%, 0% 100%);
  clip-path: polygon(100% 0, 100% 70%, 15% 100%, 0 100%, 0 0);

  height: 500px
  grid-area: hero;
  display: none;

  ${media.tablet`
    display: inline-block;
  `}
`

const LandingMain = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: main;
  padding: 20px;
  width: 100vw;
  height: 100vh;

  ${media.tablet`
    width: 100%;
  `}
  ${media.large`
    padding: 40px 80px 0 80px;  
  `}
`

const LandingFeed = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`

const StyledLink = styled(Link)`
  display: inline-block;

  & > span {
    transition: all 0.2s ease;
  }

  &:hover > span {
    margin-left: 5px;
  }
`

const MobileGreetingImage = styled(GatsbyImage)`
  flex-shrink: 0;
  width: 100%;
  max-height: 280px;
  border-radius: 6px;

  & img {
    max-height: 260px;
  }
`

const MobileGreetingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  visibility: visible;
  padding: 10px;
  border-bottom: solid 1px white;
  margin-bottom: 5px;
  flex: 1 0 auto;

  ${media.small`
    display: none;
    visibility: hidden;
    height: 0px;
  `}
`

interface IMobileGreeting {
  image: IGatsbyImageData
}
const MobileGreeting: React.FC<IMobileGreeting> = ({ image }) => {
  return (
    <MobileGreetingContainer>
      <MobileGreetingImage image={image} alt="author photo" />
      <Author small moveUp={20} />
    </MobileGreetingContainer>
  )
}

const Landing = () => {
  const data = useLandingQuery()
  const imageData = useAuthorPhoto()
  const image = imageData?.fullWidth?.childImageSharp?.gatsbyImageData

  return (
    <LandingContainer>
      <LandingMain>
        <Navbar isLandingPage />
        <LandingFeed>
          {<MobileGreeting image={image} />}
          {data?.allMdx.edges.map(({ node }) => (
            <PostPreview postNode={node} key={node.fields.slug} />
          ))}
          <StyledLink to="/blog">
            See Older Posts <span>→</span>
          </StyledLink>
          <br />
        </LandingFeed>
      </LandingMain>

      <JumboSlantedImage image={image} alt="author photo" />
      <Author moveUp={5} />
    </LandingContainer>
  )
}

export default Landing
