import React from "react"
import "./footer.css";

export default () => (
  <footer class="site-footer">
    © {new Date().getFullYear()}, Built with
    {` `}
    <a href="https://www.gatsbyjs.org">Gatsby</a>
  </footer>
)
