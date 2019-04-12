import React, { Component } from "react"
import Content from './Content.Component';
import { connect } from 'react-redux';
import { firstSith } from '../../modules/items';
import {getStateSithList, getStateDangerousSithsIndex} from '../selectors'

class ContentContainer extends Component {
    
    componentDidMount(){
        this.props.getFirstSith();
    }
    
    render() {
        return <Content { ...this.props } />
    }
}

const mapStateToProps = ({siths, planet}) => ({
    siths: getStateSithList(siths),
    dangerousSiths: getStateDangerousSithsIndex(siths, planet)
});
const mapDispatchToProps = dispatch => ({getFirstSith: () => dispatch(firstSith)})
export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer)
