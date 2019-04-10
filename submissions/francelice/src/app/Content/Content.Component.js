import React,  { Component, Fragment } from "react"
import List from '../../common/components/list';

const rootStyle = 'css-slots';
const itemsStyle = 'css-slot';

const itemInfo = (item) => (<Fragment><h3>{item.name}</h3><h6>Homeworld: {item.homeworld.name}</h6></Fragment>)

export default props => {

 /* const test = [
    {"id":3616,"name":"Darth Sidious","homeworld":{"id":7,"name":"Naboo"},"master":{"url":"http://localhost:3000/dark-jedis/2350","id":2350},"apprentice":{"url":"http://localhost:3000/dark-jedis/1489","id":1489}},
    {"id":3616,"name":"Darth Sidious","homeworld":{"id":7,"name":"Naboo"},"master":{"url":"http://localhost:3000/dark-jedis/2350","id":2350},"apprentice":{"url":"http://localhost:3000/dark-jedis/1489","id":1489}},
    {"id":3616,"name":"Darth Sidious","homeworld":{"id":7,"name":"Naboo"},"master":{"url":"http://localhost:3000/dark-jedis/2350","id":2350},"apprentice":{"url":"http://localhost:3000/dark-jedis/1489","id":1489}},
    {"id":3616,"name":"Darth Sidious","homeworld":{"id":7,"name":"Naboo"},"master":{"url":"http://localhost:3000/dark-jedis/2350","id":2350},"apprentice":{"url":"http://localhost:3000/dark-jedis/1489","id":1489}},
    {"id":3616,"name":"Darth Sidious","homeworld":{"id":7,"name":"Naboo"},"master":{"url":"http://localhost:3000/dark-jedis/2350","id":2350},"apprentice":{"url":"http://localhost:3000/dark-jedis/1489","id":1489}}
  ]*/


    return (<List className={rootStyle} content={props.siths.map(item => (itemInfo(item)))} itemClassName={itemsStyle}/>)
}

