import React from "react"

const rootStyle = 'css-planet-monitor';

export default props => {
    return (
        <h1 className={rootStyle}>
            obi-wan currently on { props.planet.name }
        </h1>
      )
  }

