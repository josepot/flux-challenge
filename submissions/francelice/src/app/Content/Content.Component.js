import React,  { Component, Fragment } from "react"
import List from '../../common/components/list';

const rootStyle = 'css-slots';
const itemsStyle = 'css-slot';
const empty = "";

const itemInfo = (item) => (<Fragment><h3>{item.name?item.name:empty}</h3><h6> {item.homeworld?`Homeworld: ${item.homeworld.name}`:empty}</h6></Fragment>)

export default props => {
    return (<List className={rootStyle} content={props.siths.map(item => (itemInfo(item)))} itemClassName={itemsStyle}/>)
}

