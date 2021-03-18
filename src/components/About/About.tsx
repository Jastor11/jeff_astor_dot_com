import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useAuthorPhoto } from "src/hooks"
import { AboutMyWork } from "src/components"
import media from "src/utils/media"
import styled from "styled-components"

const AboutContainer = styled.div`
  background: var(--color-dark);
  height: calc(100vh - var(--navbar-height));
  max-width: 100vw;
  width: 100%;
  overflow-y: scroll;

  & h2 {
    color: var(--color-white);
  }
  & p {
    color: var(--color-white);
  }
  & a {
    color: var(--color-highlight);
  }
  & a:hover {
    text-decoration: underline;
  }
  & p {
    margin: 1rem 0;
  }

  ${media.large`
    padding: 0;  
  `}
`
const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  max-width: 100vw;
  width: 100%;
  margin: 0 auto;
  overflow-y: scroll;
  padding-top: 25px;

  ${media.small`
    padding-top: 50px;
  `}
`
const AboutInfo = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  margin: 1rem 20px 2rem;
  padding: 1rem 0 0;
  flex: 1 0 auto;
  height: auto;

  ${media.small`
    margin: 1rem 5rem 2rem;
  `}
  ${media.medium`
    flex-direction: row;
    align-items: center;
  `}
  ${media.tablet`
    margin: 1rem 10rem;     
  `}
`
const JumboText = styled.p`
  font-size: 1.4rem;
  text-align: center;
  color: var(--color-white);
  width: 80%;
  margin: 0 auto;

  ${media.tablet`
      font-size: 1.7rem;
  `}
`
const AboutInfoImageContainer = styled.div`
  min-width: 200px;
  margin: 30px auto;

  ${media.medium`
    min-width: 300px;
  `}
  ${media.tablet`
    min-width: 400px;
  `}
`
const AboutInfoImage = styled(GatsbyImage)`
  flex-shrink: 0;
  clip-path: polygon(100% 0, 100% 80%, 35% 100%, 0 100%, 0 0);
  min-width: 100%;

  ${media.medium`
    margin-right: 50px;
    margin-top: 30px;
  `}
`
const AboutMe = styled.div`
  margin: 1rem 1rem;
  display: flex;
  flex-direction: column;
  height: auto;
  flex: 1 0 auto;

  ${media.small`
    margin: 1rem 5rem;
  `}
  ${media.tablet`
    margin: 1rem 10rem;
    padding: 0 1rem;  
  `}
`
const ThisSite = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 1rem 1rem 2rem;

  ${media.small`
    margin: 1rem 5rem;
  `}
  ${media.tablet`
    margin: 1rem 10rem;
    padding: 0 1rem;    
  `}
`

const FlexColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
`
const CenteredFlexColumnContainer = styled(FlexColumnContainer)`
  align-items: center;
`

const About: React.FC = () => {
  const imageData = useAuthorPhoto()
  const image = imageData?.fullWidth?.childImageSharp?.gatsbyImageData

  return (
    <AboutContainer>
      <AboutContent>
        <AboutInfo>
          <AboutInfoImageContainer>
            <AboutInfoImage image={image} alt="author photo" />
          </AboutInfoImageContainer>

          <CenteredFlexColumnContainer>
            <JumboText>
              I'm Jeff, an educator and a programmer who spends a lot of time thinking about how to enrich peoples'
              lives through technology.
            </JumboText>
          </CenteredFlexColumnContainer>
        </AboutInfo>
        <AboutMe>
          <h2>about me</h2>
          <FlexColumnContainer>
            <FlexColumnContainer>
              <p>
                {`I completed my early education in Glendale, and then at `}
                <a target="_blank" href="https://www.loyolahs.edu">
                  Loyola High School
                </a>
                . After graduating from{" "}
                <a href="https://www.cmc.edu/" target="_blank">
                  Claremont McKenna College
                </a>{" "}
                in 2011, I enlisted with{" "}
                <a target="_blank" href="https://www.teachforamerica.org">
                  Teach for America
                </a>{" "}
                and taught high school chemistry and computer science for the next 8 years.
              </p>
            </FlexColumnContainer>
            <FlexColumnContainer>
              <p>
                {`During my career I've been fortunate to learn from a number
              of brilliant folks. Through them I've discovered how to design learning
              experiences, develop digital curriculum, and bring my own ideas to life with code.`}
              </p>
            </FlexColumnContainer>
            <FlexColumnContainer>
              <p>
                {`Today I spend my time writing software, curating educational materials,
              and applying data science techniques to intriguing problems. If you're 
              interested in chatting or grabbing a cup of coffee, contact me.
              I live in Santa Monica and rarely turn down free caffeine.`}
              </p>
            </FlexColumnContainer>
          </FlexColumnContainer>
        </AboutMe>

        <AboutMyWork />

        <ThisSite>
          <h2>tHis siTe</h2>
          <p>
            This site is created using Gatsby.js and was built using the Gatsby{" "}
            <a href="https://github.com/Vagr9K/gatsby-advanced-starter" rel="noopener noreferrer" target="_blank">
              advanced starter
            </a>
            .
          </p>
          <p>
            All styling is done using a combination of css variable designations based on the structure from the{" "}
            <a href="https://codyhouse.co/" rel="noopener noreferrer" target="_blank">
              codyhouse{" "}
            </a>
            front-end framework and custom generated
            <a href="https://www.styled-components.com/" rel="noopener noreferrer" target="_blank">
              {" "}
              styled components
            </a>
            . Code highlighting is a derivative of{" "}
            <a href="https://dankneon.com/" rel="noopener noreferrer" target="_blank">
              dank neon
            </a>{" "}
            prism highlighting.
          </p>
          <p>
            Media is entirely self-generated besides the beautiful{" "}
            <a href="https://undraw.co/" rel="noopener noreferrer" target="_blank">
              unDraw
            </a>{" "}
            svgs that are used throughout the site.
          </p>
        </ThisSite>
      </AboutContent>
    </AboutContainer>
  )
}

export default About
