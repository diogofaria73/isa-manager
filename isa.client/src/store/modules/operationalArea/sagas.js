import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import {
  createOperationalAreaSuccess,
  operationalAreaFailure,
} from './actions';

export function* createOperationalArea({ payload }) {
  try {
    const response = yield call(api.post, 'operationalArea', payload.data);

    toast.success(
      `Area operacional ${response.data.title} foi criada com sucesso`
    );

    yield put(createOperationalAreaSuccess(response.data));

    history.push('/area');
  } catch (error) {
    toast.error(`Tivemos um problema para cadastrar a área operacional`);
    yield put(operationalAreaFailure());
  }
}

export function* updateOperationalArea({ payload }) {
  try {
    const response = yield call(
      api.put,
      `operationalArea/${payload.data.id}`,
      payload.data
    );

    toast.success(
      `Area operacional ${response.data.title} foi editada com sucesso`
    );

    yield put(createOperationalAreaSuccess(response.data));

    history.push('/area');
  } catch (error) {
    toast.error(`Tivemos um problema para editar a área operacional`);
    yield put(operationalAreaFailure());
  }
}

export default all([
  takeLatest(
    '@operationalArea/CREATE_OPERATIONAL_AREA_REQUEST',
    createOperationalArea
  ),
  takeLatest(
    '@operationalArea/UPDATE_OPERATIONAL_AREA_REQUEST',
    updateOperationalArea
  ),
]);
