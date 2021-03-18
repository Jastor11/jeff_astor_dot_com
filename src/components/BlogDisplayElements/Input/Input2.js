import React from "react"
import styled from "styled-components"

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 20px;
  position: relative;

  & > input {
    border: 1px solid #eee;
    border-radius: 0.25rem;
    background-color: transparent;
    outline: none;
    padding: 12px 3px 12px 15px;
    font-size: 16px;
    transition: all 0.2s ease;
  }
  & > label {
    color: #757575;
    position: absolute;
    top: 15px;
    left: 15px;
    transition: all 0.2s ease;
    z-index: 500;
  }
`

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
const Input = ({ value, type, label, onChange, onFocus, onBlur, setRef, ...props }) => {
  const [focused, setFocused] = React.useState(false)

  const handleOnFocus = () => {
    setFocused(true)
    onFocus()
  }

  const handleOnBlur = () => {
    setFocused(false)
    onBlur()
  }

  const renderLabel = () => label && <label>{label}</label>

  const isFocused = focused || String(value).length || type === "date"

  return (
    <InputContainer focused={isFocused}>
      {renderLabel()}
      <input
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        ref={(ref) => setRef(ref)}
        {...props}
      />
    </InputContainer>
  )
}

Input.defaultProps = {
  type: "text",
  label: "",
  onChange: (text) => {
    console.error(`Missing onChange prop: ${text}`)
  },
  onFocus: () => {},
  onBlur: () => {},
  setRef: () => {},
}

export default () => {
  const [val, setVal] = React.useState("")
  return <Input label="email" type="email" value={val} onChange={(val) => setVal(val)} />
}
