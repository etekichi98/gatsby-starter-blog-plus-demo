import React from "react"
import "./main.css";

export default ({ children, sidebar, avatar }) => (
  <div clas="main-flex">
    <div class="main-Avatar">{avatar}</div>
    <div class="main-Contents">
       <div class="main-Left-Background">
         <div class="main-Left">{children}</div>
       </div>
       <div class="main-Right-Background">
         <div class="main-Right">{sidebar}</div>
       </div>
    </div>
  </div>
)
