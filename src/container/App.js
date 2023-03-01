import React from "react";
import { Suspense } from "react";
import axios from "axios";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../Redux/store";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import Loader from "../components/common/loader";
import { setupAxios } from "../utils";
import { ErrorBoundary } from "../components/Error";


import { QueryClient, QueryClientProvider } from 'react-query';

// const { PUBLIC_URL } = process.env;

setupAxios(axios, store);

//import LoginPage from "../pages/SignIn/LoginPage";

const queryClient = new QueryClient();

const AppContainer = () => (
  <>
    <ErrorBoundary>
      <Provider store={store}>
    
        <Suspense fallback={<Loader isSuspense />}>
          <Loader>
          <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                <Routes />
              </BrowserRouter>
              </QueryClientProvider>
          </Loader>
        </Suspense>
       
      </Provider>
    </ErrorBoundary>
    <ToastContainer />
  </>
);

export default AppContainer;
