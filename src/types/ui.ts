export interface StyledComponent {
  className?: string
}

export interface IIconProps {
  size?: number
  circle?: boolean
  color?: string
  fill?: any
  stroke?: string
  strokeWidth?: number
  strokeLinecap?: "square" | "butt" | "round" | "inherit"
  strokeMiterlimit?: number
  strokeLinejoin?: "miter" | "round" | "inherit" | "bevel"
  style?: Record<string, any>
  className?: string
  fillBackground?: any
  fillText?: any
  fillRule?: "nonzero" | "evenodd" | "inherit"
  alt?: string
  [key: string]: any
}
