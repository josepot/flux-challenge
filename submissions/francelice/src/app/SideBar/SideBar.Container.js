import React, { Component } from "react"
import SideBar from './SideBar.Component';
import { connect } from 'react-redux';
import { scrollUp, scrollDown } from '../../modules/items';
import {getStateHasMoreMasters, getStateHasMoreApprentices, getStateIsVisitingDangerousPlanet, getStateNoSiths} from '../selectors'


class SideBarContainer extends Component {
    performScrollUp(){ this.props.scrollUp();}
    performScrollDown(){ this.props.scrollDown();}

    render() {
        return (<SideBar { ...this.props } 
            scrollUp={this.performScrollUp.bind(this)} 
            scrollDown={this.performScrollDown.bind(this)}/>)
    }
}

const mapStateToProps = (state) => ({
    scrollUpEnabled: getStateHasMoreMasters(state),
    scrollDownEnabled: getStateHasMoreApprentices(state),
    allBlocked: getStateNoSiths(state) || getStateIsVisitingDangerousPlanet(state) 

});

const mapDispatchToProps =  dispatch => (
    {scrollUp: () => dispatch(scrollUp), 
     scrollDown: () => dispatch(scrollDown)})
export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer)
