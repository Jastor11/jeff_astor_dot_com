import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { useMyWorkImages } from "src/hooks"
import media from "src/utils/media"

const WorkContainer = styled.div`
  flex: 1;
  height: auto;

  & a {
    font-size: 1em;
    color: var(--color-highlight);
  }
  & a:hover {
    text-decoration: underline;
  }
  ${media.mobileOnly`
    margin: 0 20px;
  `}
  ${media.small`
    margin: 1em 5em;
  `}
  ${media.tablet`
    margin: 1em 10em;
    padding: 0 1em;  
  `}
`

const WorkTitle = styled.h2``
const WorkStaggeredHero = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & .row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & p {
      flex: 1;
      margin-bottom: var(--space-md);
      line-height: 1.7em;
    }
    & .space {
      flex: 0.1;
    }
    & a {
      flex: 1;
      margin-bottom: var(--space-md) & img {
        border: solid 1px rgb(222, 222, 222);
      }
    }
  }

  ${media.mobileOnly`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
  `}
  ${media.small`
    margin-top: 10px;
  `}

  @media screen and (max-width: 1200px) {
    & .row {
      flex-direction: column;
    }
    & .row:nth-of-type(2) {
      flex-direction: column-reverse;
    }
    .row .space {
      flex: 0.3;
    }
    .row .gatsby-image-wrapper {
    }
    .row a {
      min-height: 250px;
      min-width: 100% !important;
    }
  }
`

const ImageLink = styled.a`
  ${media.mobileOnly`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `}
`

export const MyWork = () => {
  const data = useMyWorkImages()

  return (
    <WorkContainer>
      <WorkTitle>my Work</WorkTitle>
      <WorkStaggeredHero>
        <div className="row">
          <p>
            {`During my career as a teacher I've worked with a variety of partners on a range of issues in education.
                I've served on the Bill and Melinda Gates Teacher Advisory Panel, taught the first two summers of Karlie Kloss' Kode with Klossy JavaScript courses, `}
            {`and participated in BetterLesson's first `}
            <a target="_blank" href="https://betterlesson.com/browse/master_teachers/blended">
              Blended Learning master teacher program
            </a>
            .
          </p>
          <div className="space" />
          <ImageLink target="_blank" href="https://betterlesson.com/browse/master_teachers/blended">
            {/* <Image fluid={betterLesson.edges[0].node.childImageSharp.fluid} /> */}
            <GatsbyImage image={data?.betterlesson?.childImageSharp?.gatsbyImageData} alt="better lesson project" />
          </ImageLink>
        </div>
        <div className="row">
          <ImageLink target="_blank" href="https://teacherhub.upperlinecode.com/">
            {/* <Image fluid={upperline.edges[0].node.childImageSharp.fluid} /> */}
            <GatsbyImage image={data?.upperline?.childImageSharp?.gatsbyImageData} alt="better lesson project" />
          </ImageLink>
          <div className="space" />
          <p>
            {`For the last half of the decade I've worked for organizations promoting access to high-quality education in the computer science sector. Since 2015, I've been an instructor for `}
            <a target="_blank" href="https://www.upperlinecode.com">
              Upperline School of Code
            </a>
            {` in New York, designing and teaching summer session courses in software engineering, data science, and machine learning. In 2017, I also built Upperline's teacher training and onboarding platform that is still in use today.`}
          </p>
        </div>
        <div className="row">
          <p>
            {`In 2018, I served as the principal designer on the Google team that published
            the machine learning and cloud computing pathways for Google's `}
            <a target="_blank" href="https://techdevguide.withgoogle.com/">
              Tech Dev Guide
            </a>
            .
            {` My work here ties heavily into my interests to curate
            freely available content into easy-to-use learning guides.`}
          </p>
          <div className="space" />
          <ImageLink target="_blank" href="https://techdevguide.withgoogle.com/">
            {/* <Image fluid={techdev.edges[0].node.childImageSharp.fluid} /> */}
            <GatsbyImage image={data?.techdev?.childImageSharp?.gatsbyImageData} alt="better lesson project" />
          </ImageLink>
        </div>
        <p>
          {`Currently employed by The Walt Disney Company doing mostly data engineering, content recommendation, and data visualization.`}
        </p>
        <p>
          {`If you're interested in working together in any of these disciplines, please `}
          <Link to="/contact">get in touch</Link>.
        </p>
      </WorkStaggeredHero>
    </WorkContainer>
  )
}

export default MyWork
