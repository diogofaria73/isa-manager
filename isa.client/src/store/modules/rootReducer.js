import { combineReducers } from 'redux';
import auth from './auth/reducer';
import user from './user/reducer';
import equipment from './equipment/reducer';
import equipmentType from './equipmentType/reducer';
import operationalArea from './operationalArea/reducer';
import parameter from './parameter/reducer';

export default combineReducers({
  auth,
  user,
  equipment,
  equipmentType,
  operationalArea,
  parameter,
});
