import React from "react"

const ReactCommento = () => {
  React.useEffect(() => {
    const script = document.createElement("script")
    script.async = true
    script.type = "text/javascript"
    script.src = "//cdn.commento.io/js/commento.js"
    script.setAttribute("data-css-override", "/commento.min.css")

    const head = document.getElementsByTagName("head")[0]
    head.appendChild(script)
  }, [])

  return <div id="commento" />
}

export default ReactCommento

// export default class ReactCommento extends React.PureComponent {
//   componentDidMount() {
//     const script = document.createElement('script')
//     script.async = true
//     script.type = 'text/javascript'
//     script.src = '//cdn.commento.io/js/commento.js'
//     script.setAttribute('data-css-override', '/commento.min.css')

//     const head = document.getElementsByTagName('head')[0]
//     head.appendChild(script)
//   }

//   render() {
//     return (
//       <div id="commento" />
//     )
//   }
// }
