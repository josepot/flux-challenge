import React from "react"

const rootStyle = 'css-planet-monitor';

export default ({planet:{name}}) => {

    return (
        <h1 className={rootStyle}>
            obi-wan currently on { name }
        </h1>
      )
  }

