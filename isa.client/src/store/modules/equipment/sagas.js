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

export function* updateEquipment({ payload }) {
  try {
    const response = yield call(
      api.put,
      `equipment/${payload.data.id}`,
      payload.data
    );

    toast.success(`Equipamento ${response.data.name} foi editado com sucesso`);

    yield put(createEquipmentSuccess(response.data));

    history.push('/equipment');
  } catch (error) {
    toast.error(`Tivemos um problema para editar o equipamento.`);
    yield put(equipmentFailure());
  }
}

export function* deleteEquipment({ payload }) {
  try {
    const response = yield call(api.delete, `equipment/${payload.id}`);

    toast.success(`Equipamento excluído com sucesso`);

    yield put(createEquipmentSuccess(response.data));

    history.push('/equipment');
  } catch (error) {
    toast.error(`Tivemos um problema para excluir o equipamento`);
    yield put(equipmentFailure());
  }
}

export default all([
  takeLatest('@equipment/CREATE_EQUIPMENT_REQUEST', createEquipment),
  takeLatest('@equipment/UPDATE_EQUIPMENT_REQUEST', updateEquipment),
  takeLatest('@equipment/DELETE_EQUIPMENT_REQUEST', deleteEquipment),
]);
