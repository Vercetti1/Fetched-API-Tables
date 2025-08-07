import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './redux/searchSlice.js';

const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      </BrowserRouter>
      </Provider>
  </React.StrictMode>
);
