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
  const [error, setError] = React.useState<string | null>(null)

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true)
    onFocus(e)
  }

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false)
    onBlur(e)
  }

  const validateValue = (val: string) => {
    if (type === "email") {
      // VERY simple email validation
      if (val.indexOf("@") === -1) {
        setError("email is invalid")
      } else {
        setError(null)
      }
    }

    // ... any other validation you could think of
    // ... maybe even pass in an additional validation function as a prop?
  }

  const handleOnChange = (val: string) => {
    validateValue(val)
    onChange(val)
  }

  const isFocused = focused || String(value).length || type === "date"

  return (
    <div className={cn("relative", "flex flex-col", "mt-[30px] mb-[15px] mx-[20px]", "bg-white")}>
      {label ? (
        <label
          className={cn(
            "absolute",
            "text-neutral-500",
            "top-2 left-[15px]",
            "duration-200",
            isFocused ? "px-2 h-[25px] bg-white z-40 text-[13px] translate-y-[-18px] translate-x-[-5px]" : "z-30"
          )}
        >
          {error ? error : label}
        </label>
      ) : null}
      <input
        value={value}
        type={type}
        onChange={(e) => handleOnChange(e.target.value)}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        ref={(ref) => setRef(ref)}
        className={cn(
          "relative z-30",
          "bg-transparent",
          "outline-none",
          "border rounded-md",
          error ? "border-red-500" : "border-neutral-200",
          "duration-200",
          "text-base",
          "py-3 pr-[3px] pl-[15px]"
        )}
        {...props}
      />
    </div>
  )
}

export function Input4() {
  const [val, setVal] = React.useState("")
  return (
    <div className="bg-white px-2 py-4">
      <Input label="email" type="email" value={val} onChange={(val: string) => setVal(val)} />
    </div>
  )
}
