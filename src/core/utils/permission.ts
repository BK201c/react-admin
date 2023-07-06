interface NavNode {
  path: string;
  permissionCode: string;
  children: Array<NavNode>;
}

export const setAuthNav = (nav: Array<NavNode>) => {
  let r = {};
  for (let i = 0; i < nav.length; i++) {
    const m = nav[i];
    for (let j = 0; j < m.children.length; j++) {
      const p: NavNode = m.children[j];
      if (p.children.length > 0) {
        Object.assign(r, {
          [p.path]: p.children
            .reduce(
              (pre: string, b: NavNode) =>
                pre + "," + b.permissionCode.split(".").slice(-1)[0],
              ""
            )
            .slice(1),
        });
      }
    }
  }
  sessionStorage.setItem("auth_nav_button", JSON.stringify(r));
};

export const getAuthNav = () => {
  const r = sessionStorage.getItem("auth_nav_button");
  return r ? JSON.parse(r) : "";
};

export const getAuthDataByPath = (path: string) => {
  const r = getAuthNav();
  const button = {};
  r[path]?.split(",").forEach((b: string) => (button[b] = true));
  return {
    auth: {
      button,
    },
  };
};
