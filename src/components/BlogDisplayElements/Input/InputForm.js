import React from "react"
import Input3 from "./Input3"

const InputForm = () => {
  const [state, setState] = React.useState({
    email: "",
    password: "",
    username: "",
    birthday: "",
  })

  const style = {
    background: "#FFF",
    borderRadius: "0.25rem",
    padding: "20px",
    boxShadow:
      "0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
  }

  return (
    <div style={{ margin: "0 20px" }}>
      <Input3 label="email" type="email" value={state.email} onChange={(val) => setState({ ...state, email: val })} />
      <Input3
        label="password"
        type="password"
        value={state.password}
        onChange={(val) => setState({ ...state, password: val })}
      />
      <Input3
        label="username"
        type="text"
        value={state.username}
        onChange={(val) => setState({ ...state, username: val })}
      />
      <Input3
        label="birthday"
        type="date"
        value={state.birthday}
        onChange={(val) => setState({ ...state, birthday: val })}
      />
      <div style={style}>
        FORM STATE:
        <pre>
          <code>{JSON.stringify(state, null, 2)}</code>
        </pre>
      </div>
    </div>
  )
}

export default InputForm
