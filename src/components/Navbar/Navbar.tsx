import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import media from "src/utils/media"

const LandingNavContainer = styled.div<{ $isLandingPage?: boolean; $isDark?: boolean; $noMargin?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  min-height: 100px;
  padding: ${(props) => (props.$isLandingPage ? "0 0 25px 0" : "0 40px")};

  ${(props) =>
    props.$isDark &&
    `
      background: var(--color-dark);
      color: var(--color-white);
    `}

  margin-bottom: ${(props) => (props.$noMargin ? "0" : "5px")};
  border-bottom: solid 1px white;
  grid-area: nav;

  ${media.mobileOnly`
    flex-direction: column;
    padding: 5px 0 25px 0;
  `}
`

const BrandIcon = styled.div`
  clip-path: polygon(0 0, 100% 0%, 100% 70%, 0% 100%);
  clip-path: polygon(100% 0, 100% 80%, 35% 100%, 0 100%, 0 0);
  background: var(--color-highlight);
  height: 30px;
  width: 10px;
  margin-right: 10px;
`
const LandingNavLinkList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-width: 300px;

  ${media.mobileOnly`
    padding-top: 10px;
    border-top: solid 1px white;
  `}

  ${media.large`
    min-width:  400px;  
  `}
`
const BrandLogo = styled(Link)`
  color: white;
  font-family: var(--font-heading), "IBM Plex Mono", monospace !important;
  display: flex;

  ${media.mobileOnly`
    padding-bottom: 10px;
  `}
`
const LandingNavLink = styled(Link)`
  color: white;
  font-family: var(--font-heading), "IBM Plex Mono", monospace;
  font-size: 20px;
`
const LandingNavItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`

interface INavbar {
  isLandingPage?: boolean
  dark?: boolean
  noMargin?: boolean
}
const Navbar: React.FC<INavbar> = ({ isLandingPage, dark, noMargin }) => {
  return (
    <LandingNavContainer $isLandingPage={isLandingPage} $isDark={dark} $noMargin={noMargin}>
      <BrandLogo to="/">
        <BrandIcon /> JeffAstor
      </BrandLogo>
      <LandingNavLinkList>
        <LandingNavItem>
          <LandingNavLink to="/about">about</LandingNavLink>
        </LandingNavItem>
        <LandingNavItem>
          <LandingNavLink to="/blog">blog</LandingNavLink>
        </LandingNavItem>
        <LandingNavItem>
          <LandingNavLink to="/contact">contact</LandingNavLink>
        </LandingNavItem>
      </LandingNavLinkList>
    </LandingNavContainer>
  )
}

export default Navbar
