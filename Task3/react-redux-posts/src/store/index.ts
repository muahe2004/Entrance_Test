import { configureStore } from '@reduxjs/toolkit';
import { apiPosts } from '../services/apiPosts.ts';

const store = configureStore({
  reducer: {
    [apiPosts.reducerPath]: apiPosts.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiPosts.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
