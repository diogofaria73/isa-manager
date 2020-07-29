import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

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

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
