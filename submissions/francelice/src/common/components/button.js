import React, { Component } from "react"
import propTypes from 'prop-types'

class Button extends Component {

  render() {
    return (
      <button {...this.props}>
        {this.props.label}
      </button>
    )
  }
}

Button.propTypes = { 
    label: propTypes.string
}

export default Button