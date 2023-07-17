import * as React from "react";
import { toast } from "amis";
import { RouteComponentProps } from "react-router-dom";
import { IMainStore } from "@/core/stores";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { Input, Button, Card } from "antd";
import appStore from "@/core/stores/appStore";
import HttpService from "../../services/HttpService";
import APPSETTING from "@/config/application.json";
interface LoginProps extends RouteComponentProps<any> {
  store: IMainStore;
}

// @ts-ignore
@inject("store")
@withRouter
@observer
export default class LoginRoute extends React.Component<LoginProps, any> {
  state = {
    username: "superadmin",
    password: "Adm@1ts2",
    grant_type: "password",
    client_id: "public-website-client",
    client_secret: "Adm@1ts2",
  };

  handleFormSaved = (value: any) => {
    const history = this.props.history;
    const store = this.props.store;
    HttpService({
      method: "post",
      url: "/api/BaseService/identityServer/login",
      data: {
        ...this.state,
      },
    }).then((res) => {
      // console.log("login res", res);
      if (res.data !== null && res.code === 200) {
        const data = res.data;
        appStore.userStore.login({
          name: data.name,
          token: `${data.tokenType} ${data.accessToken}`,
        });
        toast.info("登陆成功", { timeout: "1400", position: "top-center" });
        // console.log("replace history to dashboard, value:", value);
        history.replace(`/dashboard`);
      } else {
        toast["error"]("登陆失败", "消息");
      }
    });
  };

  handleChangeForPassword = (e: any) => {
    this.setState({
      password: e.target.value,
    });
  };

  componentDidMount() {
    console.log("appStore.userStore.name", appStore.userStore.name);
    console.log(
      "store.user.isAuthenticated",
      appStore.userStore.isAuthenticated
    );
  }

  handleChangeForUsername = (e: any) => {
    this.setState({
      username: e.target.value,
    });
  };

  render() {
    return (
      <div className="login-page-container bg-gray-50">
        <div className="container mt-5">
          <span className="block m-b-xl text-center text-2x">
            {APPSETTING.title}
          </span>
          <span className="block m-b-xl text-center">欢迎</span>

          <div className="flex flex-row justify-center ">
            <div className="m-24">
              <Card className="p-8">
                <div className="mb-3">
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="用户名"
                    className="w-80"
                    size="large"
                    onChange={this.handleChangeForUsername}
                    defaultValue={this.state.username}
                  ></Input>
                </div>

                <div className="mb-3 bg-glass">
                  <Input
                    placeholder="密码"
                    size="large"
                    prefix={<KeyOutlined className="site-form-item-icon" />}
                    type="password"
                    className="w-80"
                    onChange={this.handleChangeForPassword}
                    defaultValue={this.state.password}
                  ></Input>
                </div>

                <div className="mb-3 flex flex-row justify-center">
                  <Button
                    type="primary"
                    size="large"
                    className="w-80"
                    onClick={this.handleFormSaved}
                  >
                    登录
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
