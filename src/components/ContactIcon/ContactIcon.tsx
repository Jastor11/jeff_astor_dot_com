import React from "react"
import styled from "styled-components"
import { Codepen, Envelope, Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from "src/components/Icons"
import { CommonTypes } from "src/types"
import { IIconProps } from "src/types/ui"

type ContactIconSize = "sm" | "md" | "lg"

// height: ${(props) => (props.$size === "sm" ? "14px" : props.$size === "md" ? "19px" : "24px")};
// width: ${(props) => (props.$size === "sm" ? "14px" : props.$size === "md" ? "19px" : "24px")};

const ContactIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledIconLink = styled.a<{ $size: ContactIconSize }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;

  border: solid 1px transparent;
  border-radius: ${(props) => (props.$size === "sm" ? "4px" : props.$size === "md" ? "6px" : "8px")};
  background: transparent;
  color: white;

  margin: ${(props) => (props.$size === "sm" ? "0.2rem" : props.$size === "md" ? "0.5rem" : "1rem")};
  padding: ${(props) => (props.$size === "sm" ? "0.4rem" : props.$size === "md" ? "0.75rem" : "1rem")};

  ${(props) =>
    false &&
    props.$size !== "lg" &&
    `
    height: ${props.$size === "sm" ? "20px" : "40px"};
    width: ${props.$size === "sm" ? "20px" : "40px"};
  `}

  & svg {
    max-height: ${(props) => (props.$size === "sm" ? "18px" : props.$size === "md" ? "24px" : "48px")};
    max-width: ${(props) => (props.$size === "sm" ? "18px" : props.$size === "md" ? "24px" : "48px")};
    will-change: scale;
    transition: all 0.3s ease !important;
  }

  & .hovered {
    fill: #212121;
    stroke: #212121;
  }
  & .none {
    fill: rgb(222, 222, 222);
    stroke: rgb(222, 222, 222);
  }

  &:hover {
    background: white;
    border: solid 1px rgb(222, 222, 222);

    & svg {
      transform: scale(1.2);
    }
  }
`

const iconMapping: Record<CommonTypes.SocialType, React.FC<IIconProps>> = {
  codepen: Codepen,
  email: Envelope,
  facebook: Facebook,
  github: Github,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
}

interface IContactIcon {
  size: ContactIconSize
  item: { icon: keyof typeof iconMapping; link: string }
}
const ContactIcon: React.FC<IContactIcon> = ({ item, size }) => {
  const [iconClassname, setIconClassname] = React.useState("white")
  const Icon = iconMapping[item.icon]

  const getClassname = () => {
    if (item.icon === "email") return `stroke-${iconClassname}`
    return `fill-${iconClassname} stroke-${iconClassname}`
  }

  return (
    <ContactIconContainer>
      <StyledIconLink
        rel="noopener noreferrer"
        target="_blank"
        href={item.link}
        $size={size}
        // onMouseEnter={() => setIconClassname("white")}
        // onMouseLeave={() => setIconClassname("dark")}
        onMouseOver={() => setIconClassname("dark")}
        onMouseOut={() => setIconClassname("white")}
      >
        <Icon className={getClassname()} />
      </StyledIconLink>
    </ContactIconContainer>
  )
}

export default ContactIcon
