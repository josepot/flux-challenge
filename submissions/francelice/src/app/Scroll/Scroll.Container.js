import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {both, partial} from 'ramda';

import {getIsObiWanSafe} from '../../modules/requests';
import {UP, DOWN} from '../../modules/constants';
import {getIsScrollTopEnabled, getIsScrollDownEnabled, onScroll} from '../../modules/siths';
import ScrollComponent from './Scroll.Component';


export default connect(
  createStructuredSelector({
    scrollUpEnabled: both(getIsObiWanSafe, getIsScrollTopEnabled),
    scrollDownEnabled: both(getIsObiWanSafe, getIsScrollDownEnabled)
  }),
  {
    scrollUp: partial(onScroll, [UP]),
    scrollDown: partial(onScroll, [DOWN]),
  }
)(ScrollComponent);
