import * as React from "react";
import axios from "axios";
import { toast } from "amis";
import { RouteComponentProps } from "react-router-dom";
import { IMainStore } from "@/stores";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { Input, Button, Card } from "antd";
import appStore from "@/stores/appStore";
interface LoginProps extends RouteComponentProps<any> {
  store: IMainStore;
}

@inject("store")
// @ts-ignore
@withRouter
@observer
export default class LoginRoute extends React.Component<LoginProps, any> {
  state = {
    username: "admin",
    password: "admin",
    grant_type: "password",
    client_id: "public-website-client",
    client_secret: "Adm@1ts2",
  };

  handleFormSaved = (value: any) => {
    const history = this.props.history;
    const store = this.props.store;
    console.log("username:", this.state.username);
    // appStore.userStore.login({
    //   name: "超级管理",
    //   token: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkMxN0U0NjEyRDA2ODEwQ0U0MTJBRTU0MzMyNTREMjE3IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2ODgwMTk0ODEsImV4cCI6MTcxOTU1NTQ4MSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoyMDAwMyIsImF1ZCI6WyIwMDEtQkFTRSIsIjAwMS1JVEYiLCIwMDEtV0NTIiwiMDAxLVdNUyIsIjU5NC1JVEYiLCI1OTQtV0NTIiwiNTk0LVdNUyIsIjU5NFdtc1NlcnZpY2UiLCJCYXNlU2VydmljZSIsIkRpc0l0ZlNlcnZpY2UiLCJEaXNwYXRjaEludGVyZmFjZSIsIkRpc3BhdGNoU2VydmljZSIsIkxlc1NlcnZpY2UiLCJMT0NBTC1XQ1MiLCJMT0NBTC1XTVMiLCJQdWJsaWNHYXRld2F5IiwiUXVhcnR6U2VydmljZSIsIldjc0Jhc2VTZXJ2aWNlIiwiV0NTRFMiLCJXQ1NJUyIsIldDU01TIiwiV21zSXRmU2VydmljZSIsIldtc1NlcnZpY2UiXSwiY2xpZW50X2lkIjoicHVibGljLXdlYnNpdGUtY2xpZW50Iiwic3ViIjoiOGNlNTMxMGQtNzFlZS0wOTI1LTgyYWMtM2EwOWNkOWJkZWEyIiwiYXV0aF90aW1lIjoxNjg4MDE5NDgxLCJpZHAiOiJsb2NhbCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6Iui2hee6p-euoeeQhuWRmCIsInBob25lX251bWJlciI6IjEyMzQ1IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJlbWFpbCI6InN1cGVyYWRtaW5AeHh4LmNuIiwiZW1haWxfdmVyaWZpZWQiOiJGYWxzZSIsIm5hbWUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNjg4MDE5NDgxLCJzY29wZSI6WyIwMDEtQkFTRSIsIjAwMS1JVEYiLCIwMDEtV0NTIiwiMDAxLVdNUyIsIjU5NC1JVEYiLCI1OTQtV0NTIiwiNTk0LVdNUyIsIjU5NFdtc1NlcnZpY2UiLCJCYXNlU2VydmljZSIsIkRpc0l0ZlNlcnZpY2UiLCJEaXNwYXRjaEludGVyZmFjZSIsIkRpc3BhdGNoU2VydmljZSIsIkxlc1NlcnZpY2UiLCJMT0NBTC1XQ1MiLCJMT0NBTC1XTVMiLCJQdWJsaWNHYXRld2F5IiwiUXVhcnR6U2VydmljZSIsIldjc0Jhc2VTZXJ2aWNlIiwiV0NTRFMiLCJXQ1NJUyIsIldDU01TIiwiV21zSXRmU2VydmljZSIsIldtc1NlcnZpY2UiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.x3jcUDZuV54gcRcHH3J_ThPcAyaE3KDrjGfwVVlN40upU9G7kwqAEutX4hyR01hgYJNNQbdHbYLwUW26Wg_YXSgQPbUvmQFM6rV4zpOFdnKUSu6MO9C0ZZIpgZ4LnHDrhD3BAXLVzCEAlMpRGBkuTMn93kDsj_WLnA8AcJGYJyB0wgLWTDYZ-OMBr-6Y1Ib1eqn7Jv7vGPyyA5-2-RfmwYwPB7lfTwk6nyRI18RNUjkamHMvcYxev5iHBL8XMtQrdxksC0cG5sMMEhnK45lHZ3szc1QhbDSx1V6uormau9NchInL1pfpKK8hvHvTP43bXvFLCSY1V62y2MYG59uW5w`,
    // });
    // history.replace(`/dashboard`);
    axios({
      method: "post",
      url: "/api/BaseService/identityServer/login",
      data: {
        ...this.state,
      },
    }).then((res) => {
      console.log("login res", res);
      if (res.data != null && res.data.status === 0) {
        appStore.userStore.login({
          name: res.data.name,
          token: `${res.data.tokenType} ${res.data.accessToken}`,
        });
        toast.info("登陆成功", { timeout: "1400", position: "top-center" });
        // 跳转到dashboard页面
        console.log("replace history to dashboard, value:", value);
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
          <span className="block m-b-xl text-center text-2x">React-Admin</span>
          <span className="block m-b-xl text-center">Welcome</span>

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
