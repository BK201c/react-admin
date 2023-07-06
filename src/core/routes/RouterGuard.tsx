import * as React from "react";
import { Route } from "react-router-dom";
import path2Comps from "@/core/routes/path2Comps";
import { NotFound, Spinner } from "amis";

export default class RouterGuard extends React.Component<any, any> {
  componentDidMount() {
    this.refreshRoute();
  }

  state = {
    pathname: "",
    component: Spinner,
  };

  componentDidUpdate(
    prevProps: Readonly<any>,
    prevState: Readonly<any>,
    snapshot?: any
  ) {
    this.refreshRoute();
  }

  refreshRoute = () => {
    const pathname = this.props.location.pathname;
    // console.log("guard pathname is ", pathname);
    if (this.state.pathname != pathname) {
      this.setState({ pathname: pathname });
      let path2ComponentItem = path2Comps.find((v) => {
        let path = v.path;
        if (path != null && !path.startsWith("/")) {
          path = "/" + path;
        }
        return path === pathname;
      });

      let component = path2ComponentItem?.component;

      if (path2ComponentItem != null && component != null) {
        this.setState({ component: component });
      } else {
        this.setState({ component: NotFound });
      }
    }
  };

  render() {
    return (
      <Route
        path={this.state.pathname}
        component={this.state.component}
        exact
      />
    );
  }
}
