import React from "react"

import "./layout.css";
import "prismjs/themes/prism.css"
import Main from "./Main"
import Eyecatch from "./Eyecatch"
import Sidebar from "./Sidebar"
import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ location, title, avatar, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let main

  if (location.pathname === rootPath) {
    main = (
      <div>
        <Eyecatch title={title} image={avatar}/>
        <Main sidebar={<Sidebar/>}>{children}</Main>
      </div>
    )
  } else{
    main = (
      <Main sidebar={<Sidebar/>} avatar={avatar}>
        {children}
      </Main>
    )
  }
  return (
    <div class="site-page">
      <Header/>
      {main}
      <Footer/>
    </div>
  )
}

export default Layout
