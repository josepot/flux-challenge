import React, { Component } from "react"
import propTypes from 'prop-types'

class Button extends Component {

  render() {
    const {onClick , className, label} = this.props;
    return (
      <button onClick={onClick} className={className}>
        {label}
      </button>
    )
  }
}

Button.propTypes = { 
    className: propTypes.string,
    onClick: propTypes.func,
    label: propTypes.string
}

export default Button