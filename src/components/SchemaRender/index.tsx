import * as React from "react";
import { Schema } from "amis/lib/types";
import ComRenderer from "../ComRenderer";

export default function (schema: Schema) {
  return (props: any) => {
    return <ComRenderer schema={schema} {...props} />;
  };
}
