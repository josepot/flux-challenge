import React from "react"
import Slot from '../Slot';

const Sith = ({id, name, homeworld, isDangerous}) => (
  <Slot>
    <h3 style={{color: isDangerous ? 'red' : ''}}>{name}</h3>
    <h6 style={{color: isDangerous ? 'red' : ''}}>{`Homeworld: ${homeworld}`}</h6>
  </Slot>
);

export default Sith;
