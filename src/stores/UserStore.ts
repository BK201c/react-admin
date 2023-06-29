import { action, computed, observable } from "mobx";

class UserStore {
  @observable
  name = "";
  token = "";

  constructor() {
    this.name = localStorage.getItem("name") || "";
    this.token = localStorage.getItem("token") || "";
  }

  @computed
  get isAuthenticated() {
    return !!this.token;
  }

  @action
  setName(name) {
    this.name = name;
  }

  @action
  login({ name, token }) {
    this.name = name;
    this.token = token;
    localStorage.setItem("name", name);
    localStorage.setItem("token", token);
  }

  @action
  logout() {
    localStorage.setItem("name", "");
    this.name = "";
    console.log("logout finished!");
  }
}
export default UserStore;
