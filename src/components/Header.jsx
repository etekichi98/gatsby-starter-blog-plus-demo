import React from "react"
import { Link } from "gatsby"
import Sidebar from "./Sidebar"
import "./header.css";

const Header = () => {
  const LinkStyles = {
    textDecoration: 'none',
    boxShadow: 'none',
    marginBottom: '0',
    height: '40px',
    padding: '0',
  }

  let header
  header = (
      <header class="site-header">
        <ul class="menu">
          <li class="menu__home">
            <Link style={LinkStyles} activeStyle={LinkStyles} class="menu-link" to="/">
              <img class="menu-icon" src="/icon-home.png" alt="Home" width="40" height="40"/>
            </Link>
          </li>
          <li class="menu__single">
             <img class="menu-icon" src="/icon-book.png" alt="Articles" width="40" height="40"/>
             <ul class="menu__second-level">
               <li><Link class="menu-link" to="/categories/all">All</Link></li>
               <li><Link class="menu-link" to="/categories/">Categories</Link></li>
               <li><Link class="menu-link" to="/archives/">Archives</Link></li>
               <li><Link class="menu-link" to="/tags/">Tags</Link></li>
             </ul>
          </li>
          <li class="menu__none">
            <Link style={LinkStyles} activeStyle={LinkStyles} class="menu-link" to="/Site_Recipe">
              <img class="menu-icon" src="/icon-recipe.png" alt="Recipe" width="40" height="40"/>
            </Link>
          </li>
          <li class="menu__none">
            <Link style={LinkStyles} activeStyle={LinkStyles} class="menu-link" to="/about">
              <img class="menu-icon" src="/icon-about.png" alt="About" width="40" height="40"/>
            </Link>
          </li>
          <li class="menu__right">
            <div id="nav_drawer">
              <input type="checkbox" id="nav_input" class="nav_unshown"/>
              <label for="nav_input" id="nav_open">
                <span class="navbar_toggle_icon"></span>
                <span class="navbar_toggle_icon"></span>
                <span class="navbar_toggle_icon"></span>
              </label>
              <label for="nav_input" class="nav_unshown" id="nav_close"></label>
              <div id="nav_content">
                <Sidebar/>
              </div>
            </div>
          </li>
        </ul>
      </header>
  )
  
  return (
      <header>{header}</header>
  )
}

export default Header
