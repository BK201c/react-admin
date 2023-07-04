import { action, computed, observable } from "mobx";

class UserStore {
  @observable
  name = "";
  token = "";

  constructor() {
    this.name = localStorage.getItem("name") || "";
    this.token = sessionStorage.getItem("token") || "";
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
