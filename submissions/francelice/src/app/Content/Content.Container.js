import React, { Component } from "react"
import Content from './Content.Component';
import { connect } from 'react-redux';
import { firstSith } from '../../modules/items';
import {getSithsOnSlots, getStateDangerousSithsIndex} from '../selectors'

class ContentContainer extends Component {
    
    componentDidMount(){
        this.props.getFirstSith();
    }
    
    render() {
        return <Content { ...this.props } />
    }
}

const mapStateToProps = (state) => ({
    siths: getSithsOnSlots(state),
    dangerousSiths: getStateDangerousSithsIndex(state)
});

const mapDispatchToProps = dispatch => ({getFirstSith: () => dispatch(firstSith())})
export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer)
