import React, { Component } from "react"
import propTypes from 'prop-types'
import Item from './item';

class List extends Component {

  render() {
    const {className, content, itemClassName} = this.props;
    return (
      <ul className={className}>
        {content.map( item => <Item content={item} className={itemClassName} />)}
      </ul>
    )
  }
}

List.propTypes = { 
    className: propTypes.string,
    content: propTypes.array,
    itemsClassName: propTypes.string
}

export default List