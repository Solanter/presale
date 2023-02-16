import React from "react";

const HOME = "/";

export const ROUTES_PATHS = {
  HOME,
};

export const appRoutes = [
  {
    exact: true,
    path: ROUTES_PATHS.HOME,
    component: React.lazy(() => import("./pages/Home")),
  },
];
