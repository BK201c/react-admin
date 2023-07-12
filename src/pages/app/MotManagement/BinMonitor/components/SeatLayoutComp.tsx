import * as React from "react";
import { fabric } from "fabric";
import { Button, Card, Form, Input, List, Radio, Tabs } from "antd";
import type { RadioChangeEvent } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;

type SelectedMode = "PUT" | "OUT";

type ReactStatus = "init" | "selected" | "hover";

enum ReactStatusColor {
  init = "#fff",
  selected = "green",
  hover = "yellow",
}

class SeatLayoutComponent extends React.Component<Props, any> {
  private selectionRectangle: any;
  private downPoint: any;
  private selectedGroup: any[] = [];
  private canvasRef: any = React.createRef();
  private canvas: any;

  constructor(props: any) {
    super(props);
    this.state = {
      selectedMode: "PUT",
      activeTab: "1",
      selectFromShow: false,
      isSelectingOn: false,
      selectSeatListData: [],
    };
  }

  //设置选中
  setListData(f: any[]) {
    const ids = [...f.map((e) => e.get("__id"))];
    this.setState({ selectSeatListData: ids });
  }

  // 删除选中
  deleteSeletedById(id: string) {
    const selectSeatListData = this.state.selectSeatListData.filter(
      (e) => e !== id
    );
    this.setState({ selectSeatListData: selectSeatListData });
    this.setReactColorById(id, "init");
  }

  //悬浮选中
  handleMouseEnter(id: string) {}

  onFinish(values: any) {
    console.log("Received values of form: ", values);
  }

  onRadioChange(e: RadioChangeEvent) {
    this.setState({ selectedMode: e.target.value });
  }

  handleTabChange(key: string) {
    this.setState({ activeTab: key, isSelectingOn: false });
  }

  render() {
    const { selectedMode, activeTab, selectSeatListData } = this.state;
    return (
      <div className="page-main" style={{ background: "#d5d5d5" }}>
        <canvas ref={this.canvasRef} />
        <Button onClick={() => this.setState({ selectFromShow: true })}>
          库位选择
        </Button>
        <div className="canvas-form canvas-form-select">
          <Card style={{ width: 300 }}>
            <Tabs
              activeKey={activeTab}
              onChange={(key) => this.handleTabChange(key)}
            >
              <TabPane tab="鼠标框选" key="1">
                <Radio.Group
                  onChange={(e) => this.onRadioChange(e)}
                  value={selectedMode}
                >
                  <Radio value="PUT">正选</Radio>
                  <Radio value="OUT">反选</Radio>
                </Radio.Group>
                <Button onClick={() => this.setState({ isSelectingOn: true })}>
                  开始框选
                </Button>
              </TabPane>
              <TabPane tab="条件筛选" key="2">
                <Form
                  layout="vertical"
                  name="form_in_modal"
                  onFinish={this.onFinish}
                  initialValues={{ modifier: "PUT" }}
                >
                  <Form.Item name="TrayBarCode" label="托盘号">
                    <Input />
                  </Form.Item>
                  <Form.Item name="BinNo" label="库位号">
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit">查询</Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          </Card>
        </div>
        <div className="canvas-form canvas-form-list">
          <Card title="已选择库位列表" style={{ width: 300 }}>
            <List
              style={{ height: 300, overflow: "auto" }}
              dataSource={selectSeatListData}
              renderItem={(item) => (
                <List.Item
                  key={item}
                  onMouseEnter={() =>
                    this.setReactColorById(item as string, "hover")
                  }
                  onMouseLeave={() =>
                    this.setReactColorById(item as string, "selected")
                  }
                  actions={[
                    <Button
                      type="danger"
                      onClick={() => this.deleteSeletedById(item as string)}
                      icon={<DeleteOutlined />}
                    ></Button>,
                  ]}
                >
                  <List.Item.Meta title={<div>{item}</div>} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const canvas: fabric.Canvas = new fabric.Canvas(this.canvasRef.current, {
      hoverCursor: "pointer",
      backgroundColor: "#d5d5d5",
      allowTouchScrolling: true,
      width: 1800,
      height: 960,
    });

    const seatData = this.props.source.binNoList as Array<any>;
    const seatInfo = this.props.source.rowList as Array<any>;
    const seatWidth = 35;
    const seatHeight = 35;
    const seatDist = 8;
    const layoutDist = 100;
    const originPoint = [0, 0];
    let preLayoutH = 0;

    for (const item of seatData) {
      const seatItem = item;
      if (seatItem) {
        const { binCol, binLayer, binRow, binNo } = seatItem;

        if (binRow > 1) {
          preLayoutH =
            seatInfo.filter((l) => l.rowGroup === binRow - 1)[0].endLayerNo *
              (seatHeight + seatDist) +
            layoutDist;
        }

        const seat: fabric.Rect = new fabric.Rect({
          __id: binNo,
          _seatType: "shelf",
          width: seatWidth,
          height: seatHeight,
          fill: "#fff",
          stroke: "#d5d5d5",
          left: binCol * seatWidth + originPoint[0],
          top: binLayer * seatHeight + preLayoutH + originPoint[1],
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
          hasBorders: false,
        });

        // const text = new fabric.Text(`${binCol}-${binLayer}`, {
        //   fontSize: 16,
        //   fill: "black",
        //   left: binCol * seatWidth + 2,
        //   top: binLayer * seatHeight + seatHeight / 2 + preLayoutH,
        //   hasControls: false,
        //   lockMovementX: true,
        //   lockMovementY: true,
        // });

        canvas.add(seat);
      }
    }
    canvas.getObjects().forEach((block: any) => {
      block.top = canvas.getHeight() - block.top - block.height;
      block.setCoords();
    });
    canvas.renderAll();

    this.canvas = canvas;
    this.addCanvasEvent();
  }

  componentWillUnmount() {
    this.canvas.clear();
  }

  setSelectedGroup() {
    const group = this.canvas.getActiveObject();
    group.set({
      selection: false,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      hasBorders: false,
    });
  }

  addCanvasEvent() {
    this.canvas.on("selection:created", (e: any) => {
      console.log("selection:created", e);
      const active = e.selected;
      if (!_.isEmpty(active)) {
        this.setSelectedGroup();
      }
    });

    // 监听鼠标按下事件
    this.canvas.on("mouse:down", (event) => {
      const pointer = this.canvas.getPointer(event.e);
      const x = pointer.x;
      const y = pointer.y;
      this.downPoint = pointer;

      // 检查是否点击到图形上
      const target = this.canvas.findTarget(event.e);

      if (target && this.state.isSelectingOn) {
        // 创建框选矩形
        this.selectionRectangle = new fabric.Rect({
          left: x,
          top: y,
          width: 0,
          height: 0,
          fill: "rgba(0,0,255,0.3)",
          selectable: false,
          evented: false,
        });

        this.canvas.add(this.selectionRectangle);
      }
    });

    // 监听鼠标移动事件
    this.canvas.on("mouse:move", (event) => {
      if (this.state.isSelectingOn && this.selectionRectangle) {
        const pointer = this.canvas.getPointer(event.e);
        const { x, y } = pointer;
        const left = Math.min(x, this.selectionRectangle.left);
        const top = Math.min(y, this.selectionRectangle.top);
        const width = Math.abs(x - this.downPoint.x);
        const height = Math.abs(y - this.downPoint.y);

        // 设置框选矩形的位置和大小
        this.selectionRectangle.set({
          left: left,
          top: top,
          width: width,
          height: height,
        });

        this.canvas.renderAll();
      }
    });

    // 监听鼠标释放事件
    this.canvas.on("mouse:up", (event) => {
      if (this.state.isSelectingOn) {
        // 移除框选矩形
        this.canvas.remove(this.selectionRectangle);

        // 获取框选范围内的图形对象
        const selectedObjects = this.getIntersectingRectangles(
          this.selectionRectangle
        );

        if (this.state.selectedMode === "PUT") {
          this.selectedGroup = _.unionBy(
            this.selectedGroup,
            selectedObjects,
            "__id"
          );
        } else {
          this.selectedGroup = _.differenceBy(
            this.selectedGroup,
            selectedObjects,
            "__id"
          );
        }
        this.setListData(this.selectedGroup);
        console.log("选中的图形对象:", selectedObjects, this.selectedGroup);
      }
    });
  }

  //获取
  getIntersectingRectangles(rectangleA) {
    const intersectingRectangles: any[] = [];
    this.canvas.forEachObject((obj: any) => {
      if (obj !== rectangleA && this.isPointInsideRectangle(obj, rectangleA)) {
        intersectingRectangles.push(obj);
        if (this.state.selectedMode === "PUT") {
          obj.set("fill", ReactStatusColor.selected);
        } else {
          obj.set("fill", ReactStatusColor.init);
        }
      }
    });
    return intersectingRectangles;
  }

  //相交判断
  isPointInsideRectangle(point: any, rectangle: any) {
    const { left, top, width, height } = rectangle;
    return (
      point.left >= left &&
      point.left <= left + width &&
      point.top >= top &&
      point.top <= top + height
    );
  }

  //设置图形颜色
  setReactColorById(id: string, status: ReactStatus) {
    this.canvas.forEachObject((obj) => {
      if (obj.__id === id) {
        obj.set("fill", ReactStatusColor[status]);
        obj.canvas.renderAll();
      }
    });
  }

  //设置选中
  setSelectGroupById(...ids: string[]) {
    this.canvas.forEachObject((obj: any) => {
      if (obj._seatType === "shelf" && ids.includes(obj.__id)) {
        obj.set("fill", "blue");
      }
    });
  }
}

export default SeatLayoutComponent;
