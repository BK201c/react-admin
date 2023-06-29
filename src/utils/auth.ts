export function getToken() {
  localStorage.getItem("token");
}

export function setToken(token: string) {
  localStorage.setItem("token", token);
}

export function resetToken() {
  localStorage.getItem("token");
}
