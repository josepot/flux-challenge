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

const mapStateToProps = ({siths}) => ({
    siths: siths,
    scrollUpEnabled: siths.indexTable[0]!==-1 && siths.infoTable[siths.indexTable[0]] && siths.infoTable[siths.indexTable[0]].info && siths.infoTable[siths.indexTable[0]].info.master.id,
    scrollDownEnabled: siths.indexTable[0]!==-1 &&  siths.infoTable[siths.indexTable.slice(-1)[0]] && siths.infoTable[siths.indexTable.slice(-1)[0]].info && siths.infoTable[siths.indexTable.slice(-1)[0]].info.apprentice.id,
    allBlocked: siths.indexTable.filter(item => item!==-1 && item!==null).length === 0 

});

const mapDispatchToProps =  dispatch => (
    {scrollUp: () => dispatch(scrollUp), 
     scrollDown: () => dispatch(scrollDown)})
export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer)
