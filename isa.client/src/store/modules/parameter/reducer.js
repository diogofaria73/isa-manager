import produce from 'immer';

const INITIAL_STATE = {
  parameter: null,
};

export default function parameter(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@parameter/CREATE_PARAMETER_REQUEST': {
        draft.parameter = action.payload.parameter;
        break;
      }
      case '@parameter/CREATE_PARAMETER_SUCCESS': {
        draft.parameter = action.payload.parameter;
        break;
      }
      case '@parameter/UPDATE_PARAMETER_REQUEST': {
        draft.parameter = action.payload.parameter;
        break;
      }
      default:
    }
  });
}
