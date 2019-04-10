import React, { Component } from "react"
import propTypes from 'prop-types'

class Item extends Component {

  render() {
    const {className, content} = this.props;
    return (
      <li className={className}>
        {content}
      </li>
    )
  }
}

Item.propTypes = { 
    className: propTypes.string,
    content: propTypes.element
}

export default Item