export function createEquipmentTypeRequest(data) {
  return {
    type: '@equipmentType/CREATE_EQUIPMENT_TYPE_REQUEST',
    payload: { data },
  };
}

export function createEquipmentTypeSuccess(data) {
  return {
    type: '@equipmentType/CREATE_EQUIPMENT_TYPE_SUCCESS',
    payload: { data },
  };
}

export function updateEquipmentTypeRequest(data) {
  return {
    type: '@equipmentType/UPDATE_EQUIPMENT_TYPE_REQUEST',
    payload: { data },
  };
}

export function deleteEquipmentTypeRequest(id) {
  return {
    type: '@equipmentType/DELETE_EQUIPMENT_TYPE_REQUEST',
    payload: { id },
  };
}

export function equipmentTypeFailure() {
  return {
    type: '@equipmentType/REQUEST_FAILURE',
  };
}
