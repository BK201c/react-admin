import * as React from "react";
import {
  RouteComponentProps,
  Link,
  Switch,
  Redirect,
  matchPath,
  Route,
} from "react-router-dom";
import { Avatar, Dropdown, Space } from "antd";
import { Layout, Button, AsideNav } from "amis";
import { toast } from "amis";
import { inject, observer } from "mobx-react";
import { IMainStore } from "../stores";
import HttpService from "../services/HttpService";
import RouterGuard from "../routes/RouterGuard";
import appStore from "../stores/appStore";
import { setAuthNav } from "../utils/permission";
import Dashboard from "@/pages/common/dashboard";
import logo from "../assets/logo/logo.png";
import RIcon from "../components/RIcon";

type NavItem = {
  label: string;
  children?: Array<NavItem>;
  icon?: string;
  path?: string;
  component?: React.ReactType;
  getComponent?: () => Promise<React.ReactType>;
};

function isActive(link: any, location: any) {
  const ret = matchPath(location.pathname, {
    path: link ? link.replace(/\?.*$/, "") : "",
    exact: true,
    strict: true,
  });

  return !!ret;
}

function traverseTree(node: any) {
  node.label = node.permissionName || node.label;
  if (!node.icon) node.icon = node?.permissionIcon || "icon-gengduochanpin";

  if (node?.permissionType === "page") {
    node.path = node.clientRoute || "";
  }

  if (
    !_.isEmpty(node.children) &&
    node.children[0].permissionType !== "button"
  ) {
    node.children.forEach((child) => {
      traverseTree(child);
    });
  }

  return node;
}

export interface AdminProps extends RouteComponentProps<any> {
  store: IMainStore;
}

@inject("store")
@observer
export default class Admin extends React.Component<AdminProps, any> {
  state = {
    pathname: "",
    hasLoadMenu: false,
    navigations: [],
  };

  logout = () => {
    appStore.userStore.logout();
    const history = this.props.history;
    history.replace(`/login`);
  };

  componentDidMount() {
    const history = this.props.history;
    // console.log("componentDidMount, store.user:", appStore.userStore.name);
    if (!appStore.userStore.isAuthenticated) {
      toast["error"]("用户未登陆，请先登陆！", "消息");
      history.replace(`/login`);
    }
    this.refreshMenu();
  }

  componentDidUpdate() {
    this.refreshMenu();
  }

  refreshMenu = () => {
    let pathname = this.props.location.pathname;
    if (
      pathname != "login" &&
      pathname != "/" &&
      !this.state.hasLoadMenu &&
      appStore.userStore.isAuthenticated
    ) {
      HttpService({
        method: "post",
        url: "/api/BaseService/permission/queryGrantedTreeList",
        data: {
          serviceIdentification: "WCS",
          whouseNo: "",
          isMobileDevicePermission: false,
        },
      }).then((res: any) => {
        const menuList = {
          label: "导航",
          permissionCode: "WCS",
          children: [
            {
              label: "首页",
              path: "/dashboard",
              icon: "icon-home",
              component: Dashboard,
            },
            ...res.data,
          ],
        };
        const menu = traverseTree(menuList);
        setAuthNav(res.data);
        this.setState({
          navigations: [menu],
          hasLoadMenu: true,
        });
      });
    }
  };

  renderHeader() {
    const store = this.props.store;

    const items = [
      {
        key: "1",
        label: <span onClick={this.logout}>退出登录</span>,
      },
    ];

    return (
      <div>
        <div className={`cxd-Layout-brandBar`}>
          <button
            onClick={store.toggleOffScreen}
            className="pull-right visible-xs"
          >
            <i className="fa fa-bars text-white"></i>
          </button>
          <div className={`cxd-Layout-brand`}>
            <img src={logo} alt="home" />
          </div>
        </div>
        <div className={`cxd-Layout-headerBar`}>
          <div className="nav navbar-nav hidden-xs pull-left">
            <Button
              level="link"
              className="no-shadow navbar-btn"
              onClick={store.toggleAsideFolded}
              tooltip="展开或收起侧边栏"
              placement="bottom"
              iconOnly
            >
              <RIcon
                name={store.asideFolded ? "icon-indent" : "icon-outdent"}
              />
            </Button>
          </div>

          <div className="m-l-auto hidden-xs pull-right pt-2">
            <Dropdown
              menu={{ items }}
              placement="bottomLeft"
              trigger={["click", "hover"]}
            >
              <Space>
                <Avatar icon={<RIcon name={"icon-user"}></RIcon>} />
                {appStore.userStore.getName()}
              </Space>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }

  renderAside() {
    const location = this.props.location;
    const store = this.props.store;

    return (
      <AsideNav
        key={store.asideFolded ? "folded-aside" : "aside"}
        navigations={this.state.navigations}
        renderLink={({ link, toggleExpand, classnames: cx, depth }: any) => {
          if (link.hidden || link.permissionType === "button") {
            return null;
          }
          let children: any[] = [];

          if (link.children && link.permissionType === "module") {
            children.push(
              <span
                key="expand-toggle"
                className={cx("AsideNav-itemArrow")}
                onClick={(e) => toggleExpand(link, e)}
              ></span>
            );
          }

          link.badge &&
            children.push(
              <b
                key="badge"
                className={cx(
                  `AsideNav-itemBadge`,
                  link.badgeClassName || "bg-info"
                )}
              >
                {link.badge}
              </b>
            );

          if (link.icon) {
            children.push(<RIcon name={link.icon}></RIcon>);
          } else if (store.asideFolded && depth === 1) {
            children.push(
              <i
                key="icon"
                className={cx(
                  `AsideNav-itemIcon`,
                  link.children ? "fa fa-folder" : "fa fa-info"
                )}
              />
            );
          }
          children.push(
            <span key="label" className={cx("AsideNav-itemLabel")}>
              {link.label}
            </span>
          );

          return link.path ? (
            link.active ? (
              <a>{children}</a>
            ) : (
              <Link to={link.path}>{children}</Link>
            )
          ) : (
            <a
              onClick={
                link.onClick
                  ? link.onClick
                  : link.children
                  ? () => toggleExpand(link)
                  : undefined
              }
            >
              {children}
            </a>
          );
        }}
        isActive={(link: any) => isActive(link.path, location)}
      />
    );
  }

  render() {
    const store = this.props.store;
    let pathname = this.props.location.pathname;
    if (pathname == "login" || pathname == "/") {
      return (
        <Switch>
          <RouterGuard />
          <Redirect to={`/404`} />
        </Switch>
      );
    } else {
      return (
        <Layout
          aside={this.renderAside()}
          header={this.renderHeader()}
          folded={store.asideFolded}
          offScreen={store.offScreen}
        >
          <Switch>
            <RouterGuard />
            <Redirect to={`/404`} />
          </Switch>
        </Layout>
      );
    }
  }
}
