import { combineReducers } from 'redux';
import auth from './auth/reducer';
import user from './user/reducer';
import equipment from './equipment/reducer';

export default combineReducers({ auth, user, equipment });
