import React, { Component } from "react"
import Content from './Content.Component';
import { connect } from 'react-redux';
import { updateSiths } from '../../modules/items';

class ContentContainer extends Component {
    
    componentDidMount(){
        //FETCH FIRST JEDI    
    }
    
    render() {
        return <Content { ...this.props } />
    }
}

const mapStateToProps = state => ({siths: state.siths});
const mapDispatchToProps = { updateSiths }

export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer)
