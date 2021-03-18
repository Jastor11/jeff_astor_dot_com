import * as React from "react"
import { Blog, Navbar } from "src/components"
import Layout from "src/layout"

const BlogPage: React.FC = () => (
  <Layout dark>
    <Navbar dark noMargin />
    <Blog />
  </Layout>
)

export default BlogPage
