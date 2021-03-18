import * as React from "react"
import { About, Navbar } from "src/components"
import Layout from "src/layout"

const AboutPage: React.FC = () => (
  <Layout dark>
    <Navbar dark />
    <About />
  </Layout>
)

export default AboutPage
