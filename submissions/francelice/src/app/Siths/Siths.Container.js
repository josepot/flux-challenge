import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {getPaddingTop, getPaddingBottom, getSithIds} from '../../modules/siths'
import SithsComponent from './Siths.Component';

export default connect(
    createStructuredSelector({
        ids: getSithIds,
        paddingTop: getPaddingTop,
        paddingBottom: getPaddingBottom
    }),
    null
)(SithsComponent);
