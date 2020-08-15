import { all } from 'redux-saga/effects';
import auth from './auth/sagas';
import user from './user/sagas';
import equipment from './equipment/sagas';
import equipmentType from './equipmentType/sagas';
import operationalArea from './operationalArea/sagas';
import parameter from './parameter/sagas';

export default function* rootSaga() {
  return yield all([
    auth,
    user,
    equipment,
    equipmentType,
    operationalArea,
    parameter,
  ]);
}
