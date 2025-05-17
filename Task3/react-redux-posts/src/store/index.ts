// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { apiPosts } from '../services/apiPosts.ts';

const store = configureStore({
  reducer: {
    [apiPosts.reducerPath]: apiPosts.reducer,
    // Bạn có thể thêm các slice khác ở đây
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiPosts.middleware),
});

export default store;

// Xuất type để dùng trong hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
