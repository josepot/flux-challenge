import React, { Component } from "react"
import Header from '../Header'
import Content from '../Content'
import SideBar from '../SideBar'

const rootStyle = 'css-root';
const scrollStyle = 'css-scrollable-list';

class Layout extends Component {

  render() {
    return (
        <div className={rootStyle}>
            <Header/>
            <section className={scrollStyle}>
                <Content/>
                <SideBar/>
            </section>
        </div>
      )
  }
}

export default Layout;