import type * as React from "react"
import * as parseUtils from "@/utils/parse-utils"
import { cn } from "@/utils/styles"
import type { CommonProps } from "@/types/react"

export const getBoxPositionOnWindowCenter = (width: number, height: number) => ({
  left: window.outerWidth / 2 + (window.screenX || window.screenLeft || 0) - width / 2,
  top: window.outerHeight / 2 + (window.screenY || window.screenTop || 0) - height / 2,
})

export const getBoxPositionOnScreenCenter = (width: number, height: number) => ({
  top: (window.screen.height - height) / 2,
  left: (window.screen.width - width) / 2,
})

export type InitialWindowOpenConfig = Record<"height" | "width", number> & Record<string, any>
export type YesOrNo = "yes" | "no"
export type FullWindowOpenConfig = InitialWindowOpenConfig & {
  location: YesOrNo
  toolbar: YesOrNo
  status: YesOrNo
  directories: YesOrNo
  menubar: YesOrNo
  scrollbars: YesOrNo
  resizable: YesOrNo
  centerscreen: YesOrNo
  chrome: YesOrNo
}
export function windowOpen(
  url: string,
  windowOpenConfig: InitialWindowOpenConfig,
  onClose?: (dialog: Window | null) => void
) {
  const { height, width, ...configRest } = windowOpenConfig
  const config: FullWindowOpenConfig = {
    height,
    width,
    location: "no",
    toolbar: "no",
    status: "no",
    directories: "no",
    menubar: "no",
    scrollbars: "yes",
    resizable: "no",
    centerscreen: "yes",
    chrome: "yes",
    ...configRest,
  }

  const shareDialog = window.open(
    url,
    "",
    Object.keys(config)
      .map((key) => `${key}=${config[key]}`)
      .join(", ")
  )

  if (onClose) {
    const interval = window.setInterval(() => {
      try {
        if (shareDialog === null || shareDialog.closed) {
          window.clearInterval(interval)
          onClose(shareDialog)
        }
      } catch (e) {
        /* eslint-disable no-console */
        console.error(e)
        /* eslint-enable no-console */
      }
    }, 1000)
  }

  return shareDialog
}

export type SocialShareButtonProps = {
  url: string
  title: string
}

// MODIFIED FROM THE `react-share` library

export type NetworkLink<LinkOptions> = (url: string, options: LinkOptions) => string

export type WindowPosition = "windowCenter" | "screenCenter"

type ShareButtonBaseProps<LinkOptions> = CommonProps & {
  /** Disables click action and adds `disabled` class */
  disabled?: boolean
  /**
   * Style when button is disabled
   * @default { opacity: 0.6 }
   */
  disabledStyle?: React.CSSProperties
  forwardedRef?: React.Ref<HTMLButtonElement>
  networkName: string
  networkLink: NetworkLink<LinkOptions>
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, link: string) => void
  openShareDialogOnClick?: boolean
  opts: LinkOptions
  /**
   * URL of the shared page
   */
  url: string
  windowWidth?: number
  windowHeight?: number
  windowPosition?: WindowPosition
  /**
   *  Takes a function that returns a Promise to be fulfilled before calling
   * `onClick`. If you do not return promise, `onClick` is called immediately.
   */
  beforeOnClick?: () => Promise<void> | void
  /**
   * Takes a function to be called after closing share dialog.
   */
  onShareWindowClose?: () => void
  resetButtonStyle?: boolean
}

export type ShareButtonProps<LinkOptions> = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  keyof ShareButtonBaseProps<LinkOptions>
> &
  ShareButtonBaseProps<LinkOptions>

type IOpenShareDialog<LinkOptions> = Pick<
  ShareButtonBaseProps<LinkOptions>,
  "onShareWindowClose" | "windowHeight" | "windowPosition" | "windowWidth"
> & { link: string }
function openShareDialog<LinkOptions>({
  link,
  onShareWindowClose,
  windowHeight = 400,
  windowWidth = 550,
  windowPosition = "windowCenter",
}: IOpenShareDialog<LinkOptions>) {
  const windowConfig = {
    height: windowHeight,
    width: windowWidth,
    ...(windowPosition === "windowCenter"
      ? getBoxPositionOnWindowCenter(windowWidth, windowHeight)
      : getBoxPositionOnScreenCenter(windowWidth, windowHeight)),
  }

  windowOpen(link, windowConfig, onShareWindowClose)
}

export function ShareButton<LinkOptions>({
  disabledStyle = { opacity: 0.6 },
  openShareDialogOnClick = true,
  resetButtonStyle = true,
  onShareWindowClose,
  beforeOnClick,
  disabled,
  networkLink,
  windowPosition,
  windowHeight,
  windowWidth,
  onClick,
  url,
  opts,
  children,
  className = "",
  forwardedRef,
  networkName,
  ...props
}: ShareButtonProps<LinkOptions>) {
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const link = networkLink(url, opts)

    if (disabled) return

    event.preventDefault()

    if (beforeOnClick) {
      const returnVal = beforeOnClick()

      if (parseUtils.isPromise(returnVal)) {
        await returnVal
      }
    }

    if (openShareDialogOnClick) {
      openShareDialog({
        link,
        onShareWindowClose,
        windowHeight: windowHeight ?? 400,
        windowWidth: windowWidth ?? 550,
        windowPosition: windowPosition ?? "windowCenter",
      })
    }

    if (onClick) {
      onClick(event, link)
    }
  }

  const ariaLabel = props["aria-label"] ?? networkName
  const capitalizedNetworkName = networkName.charAt(0).toUpperCase() + networkName.slice(1)
  const title = `Share on ${capitalizedNetworkName} - ${props.title}`

  return (
    <button
      {...props}
      // aria-label={props["aria-label"] || networkName}
      aria-label={ariaLabel}
      className={cn("", className)}
      onClick={handleClick}
      ref={forwardedRef}
      // title={`Share on ${networkName} - ${props.title}`}
      title={title}
    >
      {children}
    </button>
  )
}
