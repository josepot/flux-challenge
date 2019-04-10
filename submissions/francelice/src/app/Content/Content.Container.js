import React, { Component } from "react"
import Content from './Content.Component';
import { connect } from 'react-redux';
import { ACTIONS } from '../../modules/items';

class ContentContainer extends Component {
    
    componentDidMount(){
        this.props.getFirstSith();
    }
    
    render() {
        return <Content { ...this.props } />
    }
}

const mapStateToProps = state => ({siths: state.siths});
const mapDispatchToProps = dispatch => ({getFirstSith: () => dispatch({type: ACTIONS.FIRST_FETCH})})

export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer)
