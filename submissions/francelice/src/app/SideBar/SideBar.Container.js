import React, { Component } from "react"
import SideBar from './SideBar.Component';
import { connect } from 'react-redux';
import { updateSiths } from '../../modules/items';

class SideBarContainer extends Component {
    
    componentDidMount(){
        //FETCH FIRST JEDI    
    }
    
    render() {
        return <SideBar { ...this.props } />
    }
}

const mapStateToProps = state => ({siths: state.siths});
const mapDispatchToProps = { updateSiths  }


export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer)
