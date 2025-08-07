import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './features/search/searchSlice';
import themeReducer from './features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    theme: themeReducer,
  },
});
