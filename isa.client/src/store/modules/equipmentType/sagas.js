import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import { createEquipmentTypeSuccess, equipmentTypeFailure } from './actions';

export function* createEquipmentType({ payload }) {
  try {
    const response = yield call(api.post, 'equipmentType', payload.data);

    toast.success(
      `Tipo de equipamento ${response.data.title} foi criado com sucesso`
    );

    yield put(createEquipmentTypeSuccess(response.data));

    history.push('/type');
  } catch (error) {
    toast.error(`Tivemos um problema para cadastrar o tipo de equipamento`);
    yield put(equipmentTypeFailure());
  }
}

export default all([
  takeLatest(
    '@equipmentType/CREATE_EQUIPMENT_TYPE_REQUEST',
    createEquipmentType
  ),
]);
