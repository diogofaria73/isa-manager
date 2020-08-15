export function createUserRequest(data) {
  return {
    type: '@user/CREATE_USER_REQUEST',
    payload: { data },
  };
}

export function createUserSuccess(data) {
  return {
    type: '@parameter/CREATE_USER_SUCCESS',
    payload: { data },
  };
}

export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}

export function userFailure() {
  return {
    type: '@user/REQUEST_FAILURE',
  };
}
