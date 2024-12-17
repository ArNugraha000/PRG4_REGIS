import React, { Suspense, useEffect } from "react";
import { BrowserRouter as RouterApp, Routes } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style/Component.css";
import Loading from "./component/Loading";
import Router from "./route/Router";
import { NavigationProvider } from "./utils/useNavigation";
import "@flaticon/flaticon-uicons/css/all/all.css";
import "react-image-gallery/styles/css/image-gallery.css";

("use client");

import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./component/error/error";
import { ScrollToTop } from "./route/ScrollToTop";

const App = () => {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <RouterApp>
        <Suspense fallback={<Loading />}>
          <NavigationProvider>
            <ScrollToTop />
            <Router />
          </NavigationProvider>
        </Suspense>
      </RouterApp>
    </ErrorBoundary>
  );
};

export default App;
