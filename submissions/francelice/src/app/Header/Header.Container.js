import React, { Component } from "react"
import Header from './Header.Component';
import { connect } from 'react-redux';
import { updatePlanet } from '../../modules/header';
import suscribeToPlanetSocket from '../../common/utils/socket'; 
import {getStateIsVisitingDangerousPlanet} from '../selectors'

class HeaderContainer extends Component {
    
    componentDidMount(){
        suscribeToPlanetSocket(this.props.updatePlanet);
    }
    
    render() {
        return <Header { ...this.props } />
    }
}

const mapStateToProps = ({planet, siths}) => ({
    planet: planet
});
const mapDispatchToProps = dispatch => ({updatePlanet: (text) => dispatch(updatePlanet(text))})
        
export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)


