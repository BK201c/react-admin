import { action, computed, observable } from "mobx";

class UserStore {
  @observable
  name = "";
  token = "";
  authList: any = {};

  constructor() {
    this.name = localStorage.getItem("name") || "";
    this.token = sessionStorage.getItem("token") || "";
  }

  private findNodeByPath(nodes, path) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if (node.path === path) {
        return node.children;
      }

      if (node.children) {
        const result = this.findNodeByPath(node.children, path);
        if (result) {
          return result;
        }
      }
    }

    return null;
  }

  @computed
  get isAuthenticated() {
    return !!this.token;
  }

  @action
  setName(name: any) {
    this.name = name;
  }

  @action
  getName() {
    return this.name;
  }

  @action
  setToken(token: string) {
    this.token = token;
  }

  @action
  getToken() {
    return this.token;
  }

  @action
  setAuthList(list) {
    this.authList = list;
  }

  @action
  getButtonAuthList(path: string) {
    return this.findNodeByPath(this.authList.children, path);
  }

  @action
  login({ name, token }) {
    this.name = name;
    this.token = token;
    localStorage.setItem("name", name);
    sessionStorage.setItem("token", token);
  }

  @action
  logout() {
    localStorage.setItem("name", "");
    sessionStorage.clear();
    this.name = "";
    console.log("logout finished!");
  }
}
export default UserStore;
