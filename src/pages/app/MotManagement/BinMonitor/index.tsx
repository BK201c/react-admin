import * as React from "react";
import SeatLayoutComp from "./components/SeatLayoutComp";
// import getBinLayout from "./getBinLayout.json";
// import { Card, Radio, Space } from "antd";
// import type { RadioChangeEvent } from "antd";
// import HttpService from "@/core/services/HttpService";
class App extends React.Component {
  constructor() {
    super();
    // // this.getLayoutNames();
    // this.state = {
    //   nameList: [],
    //   roadWayNo: "",
    //   layoutData: [],
    // };
  }

  componentWillUnmount() {}

  // getLayoutNames() {
  //   HttpService({
  //     url: "/api/WCSMS/binMot/getRoadWayTab",
  //     method: "GET",
  //     params: {},
  //   }).then((res) => {
  //     if (res.code === 0) {
  //       this.setState({ nameList: res.data, roadWayNo: res.data[0].roadWayNo });
  //       this.getLayoutData(res.data[0].roadWayNo);
  //     }
  //   });
  // }

  // getLayoutData(roadwayNo: string) {
  //   HttpService({
  //     url: "/api/WCSMS/binMot/getBinLayout",
  //     method: "GET",
  //     params: { roadwayNo },
  //   }).then((res) => {
  //     if (res.code === 0) {
  //       console.log("获取到布局数据", res);
  //       this.setState({ layoutData: res.data });
  //     }
  //   });
  // }

  // onLayoutChange(e: RadioChangeEvent) {
  //   console.log("radio checked", e.target.value);
  //   this.setState({ roadWayNo: e.target.value });
  //   this.getLayoutData(e.target.value);
  // }

  render() {
    // const { nameList, roadWayNo, layoutData } = this.state;
    return (
      <div>
        {/* <div className="canvas-form canvas-form-list-xd">
          <Card title="巷道列表" style={{ width: 300 }}>
            <Radio.Group
              onChange={(e) => this.onLayoutChange(e)}
              value={roadWayNo}
            >
              <Space direction="vertical">
                {nameList.map((item) => (
                  <Radio key={item.roadWayNo} value={item.roadWayNo}>
                    {item.roadWayName}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Card>
        </div> */}
        <SeatLayoutComp></SeatLayoutComp>
      </div>
    );
  }
}

export default App;
