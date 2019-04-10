//Actions
export const ACTIONS = {UPDATE_PLANET : 'UPDATE_PLANET'};

//Action creators
export const updatePlanet = newPlanet => ({
    type: ACTIONS.UPDATE_PLANET,
    planet: newPlanet
  })

//reducers
export const reducers = (state = "", action) => {
    switch (action.type) {
      case ACTIONS.UPDATE_PLANET:
        return  action.planet
      default:
        return state
    }
  }
  

//sagas --> No sagas for this one
