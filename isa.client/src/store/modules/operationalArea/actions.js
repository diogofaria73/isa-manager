export function createOperationalAreaRequest(data) {
  return {
    type: '@operationalArea/CREATE_OPERATIONAL_AREA_REQUEST',
    payload: { data },
  };
}

export function createOperationalAreaSuccess(data) {
  return {
    type: '@operationalArea/CREATE_OPERATIONAL_AREA_SUCCESS',
    payload: { data },
  };
}

export function updateOperationalAreaRequest(data) {
  return {
    type: '@operationalArea/UPDATE_OPERATIONAL_AREA_REQUEST',
    payload: { data },
  };
}

export function deleteOperationalAreaRequest(id) {
  return {
    type: '@operationalArea/DELETE_OPERATIONAL_AREA_REQUEST',
    payload: { id },
  };
}

export function operationalAreaFailure() {
  return {
    type: '@operationalArea/REQUEST_FAILURE',
  };
}
