import React, { Component } from "react"
import propTypes from 'prop-types'
import Item from './item';

class List extends Component {

  render() {
    const {content, itemClassName, ...others} = this.props;

    return (
      <ul {...others}>
        {content.map( item => <Item content={item.content} key={item.id} className={itemClassName} />)}
      </ul>
    )
  }
}

List.defaultProps = {
  content: []
}

List.propTypes = { 
    content: propTypes.array,
    itemsClassName: propTypes.string
}

export default List