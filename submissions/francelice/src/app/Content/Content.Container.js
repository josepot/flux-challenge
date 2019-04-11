import React, { Component } from "react"
import Content from './Content.Component';
import { connect } from 'react-redux';
import { firstSith } from '../../modules/items';

class ContentContainer extends Component {
    
    componentDidMount(){
        this.props.getFirstSith();
    }
    
    render() {
        return <Content { ...this.props } />
    }
}

const mapStateToProps = state => ({siths: state.siths.indexTable.map(item => state.siths.infoTable[item])});
const mapDispatchToProps = dispatch => ({getFirstSith: () => dispatch(firstSith)})

export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer)
