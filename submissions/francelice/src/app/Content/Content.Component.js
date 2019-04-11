import React,  { Component, Fragment } from "react"
import List from '../../common/components/list';

const rootStyle = 'css-slots';
const itemsStyle = 'css-slot';

const itemInfo = (item, i) => {

  return item && item.info ?
  {id: item.id, content: <Fragment><h3>{item.info.name}</h3><h6>{`Homeworld: ${item.info.homeworld.name}`}</h6></Fragment>}:
  {id: i, content: <Fragment/>}}

export default props => {
    return (<List className={rootStyle} content={props.siths.map((item,i) => (itemInfo(item,i)))} itemClassName={itemsStyle}/>)
}

