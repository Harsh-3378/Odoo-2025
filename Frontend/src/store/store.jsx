import authReducer from "@/state/authSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combine the reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// Configure persistence
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["auth"], // Only persist the 'auth' slice of the state
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Configure persistor
export const persistor = persistStore(store);

export default store;
