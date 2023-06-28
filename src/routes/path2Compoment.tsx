import Dashboard from "@/pages/app/dashboard";
import BasicForm from "@/pages/app/form/Basic";
import Advanced from "../pages/app/form/Advanced";
import Wizard from "../pages/app/form/Wizard";
import Editor from "../pages/app/form/Editor";
import CustomIndex from "@/pages/app/customer";
import Login from "@/utils/Login";
import Register from "@/utils/Register";
import Icon from "@/pages/app/icon/Simple";

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
  {
    path: "/form/editor",
    component: Editor,
  },
  {
    path: "/customer/index",
    component: CustomIndex,
  },

  {
    path: "/icon/simple",
    component: Icon,
  },
];

export default path2components;
