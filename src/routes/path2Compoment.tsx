import React, { lazy, Suspense } from "react";
import Dashboard from "@/pages/common/dashboard";
import Login from "@/utils/Login";
import Register from "@/utils/Register";

const lazyLoad = (path: string) => {
  const Module = lazy(() => import(`../pages/${path}`));
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Module />
    </Suspense>
  );
};

const path2components = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/app/Base/BasArea",
    component: () => lazyLoad("/app/Base/BasArea"),
  },
];

export default path2components;
