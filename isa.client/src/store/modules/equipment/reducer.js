import produce from 'immer';

const INITIAL_STATE = {
  equipment: null,
};

export default function equipment(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@equipment/CREATE_EQUIPMENT_REQUEST': {
        draft.equipment = action.payload.equipment;
        break;
      }
      case '@equipment/CREATE_EQUIPMENT_SUCCESS': {
        draft.equipment = action.payload.equipment;
        break;
      }
      case '@equipment/UPDATE_EQUIPMENT_REQUEST': {
        draft.equipment = action.payload.equipment;
        break;
      }
      default:
    }
  });
}
