import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@user/CREATE_USER_REQUEST': {
        draft.profile = action.payload.user;
        break;
      }
      case '@user/CREATE_USER_SUCCESS': {
        draft.parameter = action.payload.parameter;
        break;
      }
      case '@user/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.user;
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        break;
      }
      default:
    }
  });
}
