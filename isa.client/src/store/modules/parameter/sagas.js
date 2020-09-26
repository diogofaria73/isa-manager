import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import { createParameterSuccess, parameterFailure } from './actions';

export function* createParameter({ payload }) {
  try {
    const response = yield call(api.post, 'parameter', payload.data);

    toast.success(`Parâmetro ${response.data.name} foi criado com sucesso`);

    yield put(createParameterSuccess(response.data));

    history.push('/parameter');
  } catch (error) {
    toast.error(`Tivemos um problema para cadastrar o parâmetro`);
    yield put(parameterFailure());
  }
}

export function* updateParameter({ payload }) {
  try {
    const response = yield call(
      api.put,
      `parameter/${payload.data.id}`,
      payload.data
    );

    toast.success(`Parâmetro ${response.data.name} foi editado com sucesso.`);

    yield put(createParameterSuccess(response.data));

    history.push('/parameter');
  } catch (error) {
    toast.error(`Tivemos um problema para editar o parâmetro`);
    yield put(parameterFailure());
  }
}

export function* deleteParameter({ payload }) {
  try {
    const response = yield call(api.delete, `parameter/${payload.id}`);

    toast.success(`Parâmetro excluído com sucesso`);

    yield put(createParameterSuccess(response.data));

    history.push('/parameter');
  } catch (error) {
    toast.error(`Tivemos um problema para excluir o parâmetro`);
    yield put(parameterFailure());
  }
}

export default all([
  takeLatest('@parameter/CREATE_PARAMETER_REQUEST', createParameter),
  takeLatest('@parameter/UPDATE_PARAMETER_REQUEST', updateParameter),
  takeLatest('@parameter/DELETE_PARAMETER_REQUEST', deleteParameter),
]);
