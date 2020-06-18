import React from "react"
import "./eyecatch.css";

const Eyecatch = ({ image, title }) => {
  let eyecatch
  eyecatch = (
      <div style={{
        width: `100%`,
        backgroundColor: `#000000`,
        backgroundImage: `url("${image}")`,
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`,
      }}>
        <h1 class="eyecatch-h1">{title}</h1>
      </div>
  )

  return (
      <div class="site-eyecatch">{eyecatch}</div>
  )
}

export default Eyecatch
