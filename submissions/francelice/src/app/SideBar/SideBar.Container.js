import React, { Component } from "react"
import SideBar from './SideBar.Component';
import { connect } from 'react-redux';
import { scrollUp, scrollDown } from '../../modules/items';

class SideBarContainer extends Component {
    
    performScrollUp(){ this.props.scrollUp();}
    performScrollDown(){ this.props.scrollDown();}

    render() {
        return (<SideBar { ...this.props } 
            scrollUp={this.performScrollUp.bind(this)} 
            scrollDown={this.performScrollDown.bind(this)}/>)
    }
}

const mapStateToProps = state => ({
    siths: state.siths,
    scrollUpEnabled: state.siths.infoTable[state.siths.indexTable[0]] && state.siths.infoTable[state.siths.indexTable[0]].info && state.siths.infoTable[state.siths.indexTable[0]].info.master.id,
    scrollDownEnabled: state.siths.infoTable[state.siths.indexTable.slice(-1)[0]] && state.siths.infoTable[state.siths.indexTable.slice(-1)[0]].info && state.siths.infoTable[state.siths.indexTable.slice(-1)[0]].info.apprentice.id
});

const mapDispatchToProps =  dispatch => (
    {scrollUp: () => dispatch(scrollUp), 
     scrollDown: () => dispatch(scrollDown)})
export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer)
