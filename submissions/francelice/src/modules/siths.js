import {isNil, length, pipe, values, map, path, prop, add, compose, subtract} from 'ramda';
import {createSelector} from 'reselect';
import {UP, DOWN, TOTAL_LIST_SLOTS, SCROLL_SLOTS} from './constants';

export const SITH_LOADED = 'SITH_LOADED';
export const SCROLL = 'SCROLL';

export const onScroll = direction => ({type: SCROLL, payload: {direction}});
export const onSithLoaded = (sith, direction) => ({type: SITH_LOADED, payload: {direction, sith}});

const paddingTopInitialState = Math.floor(TOTAL_LIST_SLOTS / 2);

const paddingTop = (state = paddingTopInitialState, {type, payload}) => {
  switch (type) {
    case SCROLL: {
      if (payload.direction === UP) {
        return state + SCROLL_SLOTS;
      }
      return Math.max(0, state - SCROLL_SLOTS);
    }
    case SITH_LOADED: {
      return payload.direction === UP
        ? Math.max(0, state - 1)
        : state;
    }
    default: return state;
  }
}

const initialListSithsState = {
  paddingTop: paddingTopInitialState,
  ids: [],
  siths: {},
};

const listSiths = (state = initialListSithsState, action) => {
  const nextPaddingTop = paddingTop(state.paddingTop, action);

  const {type, payload} = action;
  let nextIds = state.ids;
  let nextSiths = state.siths;

  switch (type) {
    case SITH_LOADED: {
      const {direction, sith} = payload;
      nextIds = (direction === DOWN)
        ? state.ids.concat(sith.id)
        : [sith.id, ...state.ids];
      nextSiths = {...state.siths, [sith.id]: sith};
      break;
    }
    case SCROLL: {
      const {direction} = payload;

      if (direction === UP) {
        if (state.ids.length + nextPaddingTop > TOTAL_LIST_SLOTS) {
          nextIds = state.ids.filter((s, idx) => idx + nextPaddingTop < TOTAL_LIST_SLOTS)
        } 
      } else {
        const nToRemove = Math.max(0, SCROLL_SLOTS - state.paddingTop)
        nextIds = nToRemove === 0
          ? state.ids
          : state.ids.slice(nToRemove);
      }

      if (nextIds !== state.ids) {
        nextSiths = nextIds.reduce((acc, id) => {
          acc[id] = state.siths[id];
          return acc;
        }, {})
      }
      break;
    }
  }

  return nextPaddingTop === state.paddingTop && nextSiths === state.siths && nextIds === state.ids
    ? state
    : {
      paddingTop: nextPaddingTop,
      ids: nextIds,
      siths: nextSiths,
    };
};

export default listSiths;

// selectors

const getRootSiths = prop('siths');

export const getPaddingTop = createSelector(getRootSiths, prop('paddingTop'));
export const getSithIds = createSelector(getRootSiths, prop('ids'));
export const getSithsDict = createSelector(getRootSiths, prop('siths'));

export const getSithsHomeIds = createSelector(
  getSithsDict,
  pipe(
    values,
    map(path(['homeworld', 'id'])),
  )
);

const getNSiths = createSelector(getSithIds, length);

export const getPaddingBottom = createSelector(
  [getNSiths, getPaddingTop],
  compose(subtract(TOTAL_LIST_SLOTS), add)
);

export const getNextApprenticeId = createSelector(
  [getSithIds, getSithsDict],
  (ids, dict) => ids.length > 0 ? dict[ids[ids.length - 1]].apprentice.id : null 
)

const getIsLastSith = createSelector(
  [getNextApprenticeId],
  isNil
);

export const getNextMasterId = createSelector(
  [getSithIds, getSithsDict],
  (ids, dict) => ids.length > 0 ? dict[ids[0]].master.id : null 
)

const getIsFirstSith = createSelector(
  [getNextMasterId],
  isNil
);

const isScrollDirectionEnabled = padding =>
  TOTAL_LIST_SLOTS - padding <= SCROLL_SLOTS;

export const getIsScrollTopEnabled = createSelector(
  [getIsFirstSith, getPaddingTop],
  (isFirst, padding) => !isFirst  && !isScrollDirectionEnabled(padding)
)

export const getIsScrollDownEnabled = createSelector(
  [getIsLastSith, getPaddingBottom],
  (isLast, padding) => !isLast  && !isScrollDirectionEnabled(padding)
)

export const getSithSelector = id => createSelector(
  [getSithsDict], dict => dict[id]
);
