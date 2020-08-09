export function createEquipmentRequest(data) {
  return {
    type: '@equipment/CREATE_EQUIPMENT_REQUEST',
    payload: { data },
  };
}

export function createEquipmentSuccess(data) {
  return {
    type: '@equipment/CREATE_EQUIPMENT_SUCCESS',
    payload: { data },
  };
}

export function updateEquipmentRequest(data) {
  return {
    type: '@equipment/UPDATE_EQUIPMENT_REQUEST',
    payload: { data },
  };
}

export function deleteEquipmentRequest(id) {
  return {
    type: '@equipment/DELETE_EQUIPMENT_REQUEST',
    payload: { id },
  };
}

export function equipmentFailure() {
  return {
    type: '@equipment/REQUEST_FAILURE',
  };
}
