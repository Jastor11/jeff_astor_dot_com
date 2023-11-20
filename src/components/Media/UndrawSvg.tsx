import * as React from "react"
import {
  //
  getUndrawSvgNameFromCategory,
  categoryToUndrawMapping,
  undrawImageAssetMapping,
} from "@/lib/undraw"

type Props = {
  name: string
  className?: string
  width?: number
  height?: number
  color?: string
  style?: React.CSSProperties
}

export function UndrawSvg({ className = "", ...props }: Props) {
  const undrawSvgName = categoryToUndrawMapping?.[props.name] ?? getUndrawSvgNameFromCategory("Tech")
  const imageAsset = undrawImageAssetMapping?.[undrawSvgName]
  if (!imageAsset) return null
  return <img src={imageAsset.src} alt="undraw svg cover image" className={className} style={props.style} />
}

export default UndrawSvg
