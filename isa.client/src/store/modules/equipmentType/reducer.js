import produce from 'immer';

const INITIAL_STATE = {
  equipmentType: null,
};

export default function equipmentType(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@equipmentType/CREATE_EQUIPMENT_TYPE_REQUEST': {
        draft.equipmentType = action.payload.equipmentType;
        break;
      }
      case '@equipmentType/CREATE_EQUIPMENT_TYPE_SUCCESS': {
        draft.equipmentType = action.payload.equipmentType;
        break;
      }
      case '@equipmentType/UPDATE_EQUIPMENT_TYPE_REQUEST': {
        draft.equipmentType = action.payload.equipmentType;
        break;
      }
      default:
    }
  });
}
