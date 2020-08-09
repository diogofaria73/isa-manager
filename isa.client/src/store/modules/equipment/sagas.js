import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import { createEquipmentSuccess, equipmentFailure } from './actions';

export function* createEquipment({ payload }) {
  try {
    const response = yield call(api.post, 'equipment', payload.data);

    toast.success(
      `Equipamento ${response.data.name} de TAG ${response.data.tag} foi criado com sucesso`
    );

    yield put(createEquipmentSuccess(response.data));

    history.push('/equipment');
  } catch (error) {
    toast.error(`Tivemos um problema para cadastrar o equipamento`);
    yield put(equipmentFailure());
  }
}

export default all([
  takeLatest('@equipment/CREATE_EQUIPMENT_REQUEST', createEquipment),
]);
