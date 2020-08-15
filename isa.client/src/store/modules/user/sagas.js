import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import {
  updateProfileSuccess,
  updateProfileFailure,
  createUserSuccess,
  userFailure,
} from './actions';

export function* createUser({ payload }) {
  try {
    const response = yield call(api.post, 'user', payload.data);

    toast.success(`Usuário ${response.data.name} foi criado com sucesso`);

    yield put(createUserSuccess(response.data));

    history.push('/user');
  } catch (error) {
    toast.error(`Tivemos um problema para cadastrar o usuário.`);
    yield put(userFailure());
  }
}

export function* updateProfile({ payload }) {
  try {
    const { name, email, is_admin } = payload.data;

    const profile = {
      name,
      email,
      is_admin,
    };

    const response = yield call(api.put, 'user', profile);

    toast.success('Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));

    yield put();
  } catch (error) {
    toast.error('Erro ao atualizar perfil, confira seus dados');
    yield put(updateProfileFailure());
  }
}

// export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
export default all([takeLatest('@user/CREATE_USER_REQUEST', createUser)]);
