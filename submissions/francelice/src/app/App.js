import React from 'react';

import Header from './Header'
import Siths from './Siths'
import Scroll from './Scroll'

export default () => (
  <div className="css-root">
    <Header/>
    <section className="css-scrollable-list">
      <Siths />
      <Scroll/>
    </section>
  </div>
)
