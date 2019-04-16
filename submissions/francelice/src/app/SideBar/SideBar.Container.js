import React, { Component } from "react"
import SideBar from './SideBar.Component';
import { connect } from 'react-redux';
import { scrollUp, scrollDown } from '../../modules/items';
import {getStateFirstMasterOnTop, getStateLastApprenticeOnBottom, getStateIsVisitingDangerousPlanet, getStateNoSiths} from '../selectors'


class SideBarContainer extends Component {
    performScrollUp(){ this.props.scrollUp();}
    performScrollDown(){ this.props.scrollDown();}

    render() {
        return (<SideBar { ...this.props } 
            scrollUp={this.performScrollUp.bind(this)} 
            scrollDown={this.performScrollDown.bind(this)}/>)
    }
}

const mapStateToProps = ({siths, planet}) => ({
    scrollUpEnabled: getStateFirstMasterOnTop(siths),
    scrollDownEnabled: getStateLastApprenticeOnBottom(siths),
    allBlocked: getStateNoSiths(siths) || getStateIsVisitingDangerousPlanet(siths, planet) 

});

const mapDispatchToProps =  dispatch => (
    {scrollUp: () => dispatch(scrollUp), 
     scrollDown: () => dispatch(scrollDown)})
export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer)
