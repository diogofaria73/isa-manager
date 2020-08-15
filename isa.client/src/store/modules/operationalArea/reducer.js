import produce from 'immer';

const INITIAL_STATE = {
  operationalArea: null,
};

export default function operationalArea(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@operationalArea/CREATE_OPERATIONAL_AREA_REQUEST': {
        draft.operationalArea = action.payload.operationalArea;
        break;
      }
      case '@operationalArea/CREATE_OPERATIONAL_AREA_SUCCESS': {
        draft.operationalArea = action.payload.operationalArea;
        break;
      }
      case '@operationalArea/UPDATE_OPERATIONAL_AREA_REQUEST': {
        draft.operationalArea = action.payload.operationalArea;
        break;
      }
      default:
    }
  });
}
