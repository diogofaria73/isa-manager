import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'isa',
      storage,
      stateReconciler: hardSet,
      whitelist: ['auth', 'user'],
    },
    reducers
  );
  return persistedReducer;
};
