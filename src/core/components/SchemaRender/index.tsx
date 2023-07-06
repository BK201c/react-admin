import * as React from "react";
import { Schema } from "amis/lib/types";
import CompRenderer from "../CompRenderer";

export default function (schema: Schema) {
  return (props: any) => {
    return <CompRenderer schema={schema} {...props} />;
  };
}
