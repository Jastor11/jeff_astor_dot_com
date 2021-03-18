import * as React from "react"
import Layout from "src/layout"
import { ContactIcon, Navbar } from "src/components"
import * as constants from "src/utils/constants"
import styled from "styled-components"
import media from "src/utils/media"

const ContactContainer = styled.div`
  flex: 1;
  background: var(--color-dark);
  color: var(--color-white);
  width: 100%;
  max-width: 100vw;
  padding: 20px;

  ${media.large`
    padding: 0;
  `}
`
const ContactTitle = styled.h2`
  color: white;
  text-align: center;
  margin-top: 60px;

  ${media.small`
    width: 95%;
    margin-left: auto;  
    text-align: left;
  `}
  ${media.tablet`
    margin-top: 40px;
    width: 90%;
    font-size: 64px;
  `}
`
const IconContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  margin: 50px 0;

  ${media.small`
    grid-template-columns: repeat(4, 1fr);
  `}
`

const Contact: React.FC = () => {
  return (
    <Layout dark>
      <Navbar dark />
      <ContactContainer>
        <ContactTitle>connect with me</ContactTitle>
        <IconContainer>
          {constants.socials.map((item) => (
            <ContactIcon item={item} size="lg" key={item.link} />
          ))}
        </IconContainer>
      </ContactContainer>
    </Layout>
  )
}
export default Contact
