import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import {getSithSelector} from '../../../modules/siths';
import {getCurrentPlanetId} from '../../../modules/currentPlanet';
import SithsComponent from './Sith.Component';

const getSithProps = (s, {id}) => {
  const getSith = getSithSelector(id);
  return createSelector(
    [getSith, getCurrentPlanetId],
    ({homeworld, ...sith}, planetId) => ({
      ...sith,
      homeworld: homeworld.name,
      isDangerous: homeworld.id === planetId
    })
  );
}

export default connect(getSithProps, null)(SithsComponent);
