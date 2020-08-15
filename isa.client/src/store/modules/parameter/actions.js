export function createParameterRequest(data) {
  return {
    type: '@parameter/CREATE_PARAMETER_REQUEST',
    payload: { data },
  };
}

export function createParameterSuccess(data) {
  return {
    type: '@parameter/CREATE_PARAMETER_SUCCESS',
    payload: { data },
  };
}

export function updateParameterRequest(data) {
  return {
    type: '@parameter/UPDATE_PARAMETER_REQUEST',
    payload: { data },
  };
}

export function deleteParameterRequest(id) {
  return {
    type: '@parameter/DELETE_PARAMETER_REQUEST',
    payload: { id },
  };
}

export function parameterFailure() {
  return {
    type: '@parameter/REQUEST_FAILURE',
  };
}
