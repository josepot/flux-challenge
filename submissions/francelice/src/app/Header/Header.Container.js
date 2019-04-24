import Header from './Header.Component';
import {createStructuredSelector} from 'reselect';
import { connect } from 'react-redux';
import { getCurrentPlanetName } from '../../modules/currentPlanet';

const getPlanetProps = createStructuredSelector({
  name: getCurrentPlanetName
});

export default connect(getPlanetProps, null)(Header);
