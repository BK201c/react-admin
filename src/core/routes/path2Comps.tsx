import React, { lazy, Suspense } from "react";
import Dashboard from "@/pages/common/dashboard";
import Register from "../utils/Register";
import Login from "../components/Login";
import p404 from "../components/404";

const lazyLoad = (path: string) => {
  const endPoint = path.slice(0, -10);
  const Module = lazy(() => import(endPoint));
  return (
    <Suspense fallback={<div></div>}>
      <Module />
    </Suspense>
  );
};
const modules = import.meta.glob("../pages/app/**/index.tsx");
const dynamicRoutes = [
  ...Object.keys(modules).map((key) =>
    Object.assign(
      {},
      {
        path: key.slice(8, -10),
        component: () => lazyLoad(key),
      }
    )
  ),
];

const path2Comps = [
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
  ...dynamicRoutes,
  {
    path: "/404",
    component: p404,
  },
];

export default path2Comps;
