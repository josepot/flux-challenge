import React from "react"

import Sith from './Sith';
import Slot from './Slot';

const range = x => Array(x).fill().map((x, idx) => idx);

export default ({ids, paddingTop, paddingBottom}) => (
  <ul className='css-slots'>
    {range(paddingTop).map(idx => <Slot key={`topSlot${idx}`} />)}
    {ids.map(id => <Sith key={id} id={id} />)}
    {range(paddingBottom).map(idx => <Slot key={`bottomSlot${idx}`} />)}
  </ul>
);
