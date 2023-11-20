import * as React from "react"
import { cn } from "@/utils/styles"

/**
 * A Plaid-inspired custom input component
 *
 * @param {string} value - the value of the controlled input
 * @param {string} type - the type of input we'll deal with
 * @param {string} label - the label used to designate info on how to fill out the input
 * @param {function} onChange - function called when the input value changes
 * @param {function} onFocus - function called when the input is focused
 * @param {function} onBlur - function called when the input loses focus
 * @param {function} setRef - function used to add this input as a ref for a parent component
 */
interface InputProps extends Omit<React.HTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string
  type?: HTMLInputElement["type"]
  label?: React.ReactNode
  onChange: (v: string) => void
  setRef?: (ref: HTMLInputElement | null) => void
}
const Input = ({
  value,
  type = "text",
  label = null,
  onChange = (v: string) => null && v,
  onFocus = (e: React.FocusEvent<HTMLInputElement>) => null && e,
  onBlur = (e: React.FocusEvent<HTMLInputElement>) => null && e,
  setRef = (ref: HTMLInputElement | null) => null && ref,
  ...props
}: InputProps) => {
  const [focused, setFocused] = React.useState(false)

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true)
    onFocus(e)
  }

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false)
    onBlur(e)
  }

  const isFocused = focused || String(value).length || type === "date"

  return (
    <div className={cn("relative", "flex flex-col", "mt-[30px] mb-[15px] mx-[20px]", isFocused ? "focused" : "")}>
      {label ? (
        <label
          className={cn(
            "absolute",
            "text-neutral-500",
            "top-2 left-[15px]",
            "duration-200 ease-op-ease-4",
            "z-layer-3"
          )}
        >
          {label}
        </label>
      ) : null}
      <input
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        ref={(ref) => setRef(ref)}
        className={cn(
          "border border-neutral-100 rounded-md",
          "duration-200 ease-op-ease-4",
          "text-base",
          "py-3 pr-[3px] pl-[15px]"
        )}
        {...props}
      />
    </div>
  )
}

export function Input2() {
  const [val, setVal] = React.useState("")
  return <Input label="email" type="email" value={val} onChange={(val: string) => setVal(val)} />
}
