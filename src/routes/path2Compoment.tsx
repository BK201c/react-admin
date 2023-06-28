import Dashboard from "../pages/Dashboard";
import BasicForm from "@/pages/admin/form/Basic";
import Advanced from "../pages/admin/form/Advanced";
import Wizard from "../pages/admin/form/Wizard";
import Editor from "../pages/admin/form/Editor";
import CustomIndex from "@/pages/admin/customer";
import Login from "../pages/admin/common/Login";
import Register from "../pages/admin/common/Register";
import Icon from "@/pages/admin/icon/Simple";
import Tabs from "@/pages/admin/common/Tabs";

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
  {
    path: "/tabs",
    component: Tabs,
  },
];

export default path2components;
