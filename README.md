## 使用方法

```
npm i
npm start
```

### 1、首先在 pages 下新增一个 Hello.tsx 页面

```tsx
import schema2component from "@/utils/schema2component";

const schema = {
  type: "page",
  title: "hello",
  body: {
    label: "弹框",
    type: "button",
    actionType: "dialog",
    dialog: {
      title: "弹框",
      body: "这是个简单的弹框。",
    },
  },
};

export default schema2component(schema);
```

### 2、增加路由配置

在`path2Compoment`文件导入 Hello 组件

```tsx
import Hello from "@/pages/Hello";
```

然后在 path2components 对象增加路由

```
{
        path: '/hello',
        component: Hello
}
```

### 3、启动项目，测试即可

通过`npm start`,然后输入
[http://localhost:8080/hello](http://localhost:8080/hello)即可访问刚刚新建的页面
