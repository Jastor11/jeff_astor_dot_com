import React from "react"
import ReactCommento from "./ReactCommento"

const Comments = () => {
  const [show, setShow] = React.useState(false)
  // const timeoutRef = React.useRef<NodeJs.Timeout | null>(null)
  const timeoutRef = React.useRef(setTimeout(() => {}, 5000))

  const onScroll = () => {
    setShow(true)
    window.removeEventListener("scroll", onScroll)
  }

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll)
    timeoutRef.current = setTimeout(onScroll, 5000)

    return () => {
      window.removeEventListener("scroll", onScroll)
      clearTimeout(timeoutRef.current)
    }
  }, [])

  if (!show) {
    return <div style={{ paddingBottom: "320px" }} />
  }

  return <ReactCommento />
}

export default Comments

// export class Comments extends React.PureComponent {
//   state = { show: false }

//   componentDidMount() {
//     window.addEventListener('scroll', this.onScroll)
//     this.timeout = setTimeout(this.onScroll, 5000)
//   }

//   componentWillUnmount() {
//     window.removeEventListener('scroll', this.onScroll)
//     clearTimeout(this.timeout)
//   }

//   onScroll = () => {
//     this.setState({ show: true })
//     window.removeEventListener('scroll', this.onScroll)
//   }

//   render() {
//     if (!this.state.show) {
//       return <div style={{ paddingBottom: '320px' }} />
//     }

//     return (
//       <ReactCommento />
//     )
//   }
// }
