import React,  { Fragment } from "react"
import List from '../../common/components/list';
import {notEmpty} from '../../common/utils/generalUtils'

const rootStyle = 'css-slots';
const itemsStyle = 'css-slot';

const itemColor = (item, list) => list.indexOf(item.id) !== -1 ? {...item, ...{color: "red"}}: item

const itemInfo = ({id, name, homeworld, color}) => (
  notEmpty(name)
  ?{id: id, content:<Fragment key={id}><h3 style={{color: color}}>{name}</h3><h6 style={{color: color}}>{`Homeworld: ${homeworld.name}`}</h6></Fragment>}
  :{id: id, content: <Fragment/>})
  

  export default ({siths, dangerousSiths}) => (
      <List className={rootStyle} content={siths.map(item => itemColor(item, dangerousSiths)).map((item) => itemInfo(item))} itemClassName={itemsStyle}/>)


