import * as React from "react";
import { useState } from "react";
import { fabric } from "fabric";
import { isEmpty, remove } from "lodash";
import { Button, Card, Form, Input, Radio, Tabs } from "antd";
import type { RadioChangeEvent } from "antd";
const { TabPane } = Tabs;
type SelectedMode = "PUT" | "OUT";

class SeatLayoutComponent extends React.Component<Props, any> {
  private isSelecting = false;
  private selectionRectangle: any;
  private downPoint: any;
  private selectedGroup: any[] = [];

  private canvasRef: React.RefObject<any> = React.createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      selectedMode: "PUT",
      activeTab: "1",
    };
  }

  onFinish(values: any) {
    console.log("Received values of form: ", values);
  }

  onRadioChange(e: RadioChangeEvent) {
    console.log("radio checked", e.target.value);
    this.setState({ selectedMode: e.target.value });
  }

  handleTabChange(key: string) {
    this.setState({ activeTab: key });
    this.isSelecting = false;
  }

  setIsSelecting(status: boolean) {
    this.isSelecting = status;
  }

  render() {
    const { selectedMode, activeTab } = this.state;
    return (
      <div>
        <canvas ref={this.canvasRef} />
        <Button onClick={() => this.setIsSelecting(!this.isSelecting)}>
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
              </TabPane>
              <TabPane tab="条件筛选" key="2">
                <Form
                  layout="vertical"
                  name="form_in_modal"
                  onFinish={this.onFinish}
                  initialValues={{ modifier: "PUT" }}
                >
                  <Form.Item name="description" label="托盘号">
                    <Input type="textarea" />
                  </Form.Item>
                  <Form.Item name="title" label="库位号">
                    <Input />
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
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
          _seatId: binNo,
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
      if (!isEmpty(active)) {
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

      if (target && this.isSelecting) {
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
      if (this.isSelecting) {
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
      if (this.isSelecting) {
        // 移除框选矩形
        this.canvas.remove(this.selectionRectangle);

        // 获取框选范围内的图形对象
        const selectedObjects = this.getIntersectingRectangles(
          this.selectionRectangle
        );
        console.log("选中的图形对象:", selectedObjects);
      }
    });
  }

  //获取
  getIntersectingRectangles(rectangleA) {
    const intersectingRectangles: any[] = [];
    this.canvas.forEachObject((obj: any) => {
      if (obj !== rectangleA && this.isPointInsideRectangle(obj, rectangleA)) {
        if (this.state.selectedMode === "PUT") {
          intersectingRectangles.push(obj);
          obj.set("fill", "blue");
        } else {
          remove(
            intersectingRectangles,
            (item) => item._seatId === obj._seatId
          );
          obj.set("fill", "#fff");
        }
      }
    });
    this.selectedGroup = intersectingRectangles;
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

  //设置图片
  setRectangleImage(obj) {
    obj.set("fill", "blue");
    obj.set("stroke", null);
    obj.setCoords();
    obj.canvas.renderAll();
  }
}

export default SeatLayoutComponent;
