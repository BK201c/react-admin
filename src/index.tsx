import * as React from "react";
import { render } from "react-dom";
import App from "./App";
import _ from "lodash";
window._ = _;

render(<App />, document.getElementById("root")!);
