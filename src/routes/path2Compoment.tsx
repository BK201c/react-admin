import Dashboard from "@/pages/app/dashboard";
import BasicForm from "@/pages/app/form/Basic";
import Advanced from "../pages/app/form/Advanced";
import Wizard from "../pages/app/form/Wizard";
import Login from "@/utils/Login";
import Register from "@/utils/Register";

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
    path: "/form/basic",
    component: BasicForm,
  },
  {
    path: "/form/basic/advanced",
    component: Advanced,
  },
  {
    path: "/form/advanced",
    component: Advanced,
  },
  {
    path: "/form/wizard",
    component: Wizard,
  },
];

export default path2components;
