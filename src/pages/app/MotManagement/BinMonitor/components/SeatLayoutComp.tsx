import * as React from "react";
import { fabric } from "fabric";
import {
  Button,
  Card,
  Form,
  Input,
  List,
  Radio,
  Space,
  Tabs,
  message,
} from "antd";
import type { RadioChangeEvent } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import HttpService from "@/core/services/HttpService";

type SelectedMode = "PUT" | "OUT";
type RectStatus = "init" | "selected" | "hover";
type FeatureType = "shelf" | "indicator" | "text";
enum RectStatusColor {
  init = "#fff",
  selected = "#95de64",
  hover = "#ffd666",
}

class SeatLayoutComp extends React.Component {
  private selectionRectangle: any;
  private downPoint: any;
  private selectFeats: any[] = [];
  private canvasRef: any = React.createRef();
  private canvas: any = null;
  layoutData: any;
  layoutDataMapping: any;

  constructor(props: any) {
    super(props);
    this.state = {
      selectedMode: "PUT",
      activeTab: "1",
      selectFromShow: false,
      isSelectingOn: false,
      itemEnabled: "1",
      selectIds: [],
      layoutNames: [],
      roadWayNo: "",
      layoutNameShow: false,
      tipsShow: false,
      tipsContent: "测试信息",
      pageCoords: [0, 0],
    };
    this.getLayoutNames();
  }

  componentDidMount() {
    const canvas: fabric.Canvas = new fabric.Canvas(this.canvasRef.current, {
      hoverCursor: "default",
      backgroundColor: "#d5d5d5",
      allowTouchScrolling: true,
      width: 1800,
      height: 960,
      selection: false,
    });
    this.canvas = canvas;
    this.draw();
    this.addSelectionEvent();
    this.addZoomEvent();
    this.addDargeEvent();
    this.addHoverEvent();
  }

  //设置选中
  setListData(f: any[]) {
    const ids = [...f.map((e) => e.get("__id"))];
    this.setState({ selectIds: ids });
  }

  // 删除选中
  deleteSeletedById(id: string) {
    const selectIds = this.state.selectIds.filter((e) => e !== id);
    this.selectFeats = _.remove(this.selectFeats, (obj) => obj.__id === id);
    this.setState({ selectIds: selectIds });
    this.setReactColorById(id, "init");
  }

  //搜索
  onSearch(values: any) {
    const { roadWayNo } = this.state;
    HttpService({
      url: "/api/WCSMS/binMot/getBinNoListByFilter",
      method: "GET",
      params: {
        RoadwayNo: roadWayNo,
        ...values,
      },
    }).then((res) => {
      if (res.status === 0) {
        const selectIds: string[] = [];
        res.data.forEach((e: string) => {
          this.setReactColorById(this.layoutDataMapping[e], "selected");
          selectIds.push(this.layoutDataMapping[e]);
        });
        this.setState({ selectIds: selectIds });
        this.canvas.renderAll();
      }
    });
  }

  //设置
  setUsedFlag() {
    const { itemEnabled, selectIds } = this.state;
    HttpService({
      url: "/api/WCSMS/binMot/batchSetBinStatus",
      method: "POST",
      data: {
        lockMsg: "",
        items: selectIds,
        value: itemEnabled,
      },
    }).then((res) => {
      if (res.status === 0) {
        message.success("设置成功");
      }
    });
  }

  onRadioChange(e: RadioChangeEvent, key) {
    this.setState({ [key]: e.target.value });
  }

  handleTabChange(key: string) {
    this.setState({ activeTab: key, isSelectingOn: false });
  }

  getLayoutNames() {
    HttpService({
      url: "/api/WCSMS/binMot/getRoadWayTab",
      method: "GET",
      params: {},
    }).then((res) => {
      if (res.code === 0) {
        this.setState({
          layoutNames: res.data,
          roadWayNo: res.data[0].roadWayNo,
        });
        this.getLayoutData(res.data[0].roadWayNo);
        this.getLayoutDataMapping(res.data[0].roadWayNo);
      }
    });
  }

  getLayoutData(roadwayNo: string) {
    HttpService({
      url: "/api/WCSMS/binMot/getBinLayout",
      method: "GET",
      params: { roadwayNo },
    }).then((res) => {
      if (res.code === 0) {
        this.layoutData = res.data;
        this.draw();
      }
    });
  }

  getLayoutDataMapping(roadwayNo: string) {
    HttpService({
      url: "/api/WCSMS/binMot/getBinSet",
      method: "GET",
      params: { roadwayNo },
    }).then((res) => {
      if (res.code === 0) {
        this.layoutDataMapping = res.data;
      }
    });
  }

  onLayoutChange(e: RadioChangeEvent) {
    this.getLayoutData(e.target.value);
    this.setState({ roadWayNo: e.target.value });
  }

  render() {
    const {
      selectedMode,
      activeTab,
      selectIds,
      isSelectingOn,
      itemEnabled,
      roadWayNo,
      layoutNames,
      selectFromShow,
      layoutNameShow,
      tipsShow,
      tipsContent,
      pageCoords,
    } = this.state;
    return (
      <div className="page-main" style={{ background: "#d5d5d5" }}>
        <canvas ref={this.canvasRef} />
        <div>
          <Button
            onClick={() => this.setState({ layoutNameShow: !layoutNameShow })}
          >
            巷道列表
          </Button>
          <Button
            onClick={() => this.setState({ selectFromShow: !selectFromShow })}
          >
            库位框选
          </Button>
        </div>
        {tipsShow ? (
          <Card
            className="canvas-form canvas-form-tips"
            style={{
              width: 300,
              left: pageCoords[0] + "px",
              top: pageCoords[1] + "px",
            }}
          >
            <p>{tipsContent}</p>
          </Card>
        ) : null}
        {layoutNameShow ? (
          <div className="canvas-form canvas-form-list-xd">
            <Card title="巷道列表" style={{ width: 300 }}>
              <Radio.Group
                onChange={(e) => this.onLayoutChange(e)}
                value={roadWayNo}
              >
                <Space direction="vertical">
                  {layoutNames.map((item) => (
                    <Radio key={item.roadWayNo} value={item.roadWayNo}>
                      {item.roadWayName}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Card>
          </div>
        ) : null}
        {selectFromShow ? (
          <div>
            <div className="canvas-form canvas-form-select">
              <Card style={{ width: 300 }}>
                <Tabs
                  activeKey={activeTab}
                  onChange={(key) => this.handleTabChange(key)}
                  items={[
                    {
                      label: "鼠标框选",
                      key: "1",
                      children: (
                        <div>
                          <Radio.Group
                            onChange={(e) =>
                              this.onRadioChange(e, "selectedMode")
                            }
                            value={selectedMode}
                          >
                            <Radio value="PUT">正选</Radio>
                            <Radio value="OUT">反选</Radio>
                          </Radio.Group>
                          <Button
                            type={isSelectingOn ? "primary" : "dashed"}
                            onClick={() =>
                              this.setState({ isSelectingOn: true })
                            }
                          >
                            开始框选
                          </Button>
                        </div>
                      ),
                    },
                    {
                      label: "条件筛选",
                      key: "2",
                      children: (
                        <Form
                          layout="vertical"
                          name="form_in_modal"
                          onFinish={(values) => this.onSearch(values)}
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
                      ),
                    },
                  ]}
                ></Tabs>
              </Card>
            </div>
            <div className="canvas-form canvas-form-list">
              <Card title="已选择库位列表" style={{ width: 300 }}>
                <List
                  style={{ height: 300, overflow: "auto" }}
                  dataSource={selectIds}
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
                <Radio.Group
                  onChange={(e) => this.onRadioChange(e, "itemEnabled")}
                  value={itemEnabled}
                >
                  <Radio value="1">启用</Radio>
                  <Radio value="0">禁用</Radio>
                </Radio.Group>
                <Button onClick={() => this.setUsedFlag()}>确认</Button>
              </Card>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  addZoomEvent() {
    this.canvas.on("mouse:wheel", (opt: any) => {
      if (opt.e.altKey === true) {
        const delta = opt.e.deltaY;
        let zoom = this.canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;

        this.canvas.zoomToPoint(
          {
            x: opt.e.offsetX,
            y: opt.e.offsetY,
          },
          zoom
        );
      }
    });
  }

  addDargeEvent() {
    this.canvas.on("mouse:down", (opt: any) => {
      let evt = opt.e;
      if (evt.altKey === true) {
        this.canvas.isDragging = true;
        this.canvas.lastPosX = evt.clientX;
        this.canvas.lastPosY = evt.clientY;
      }
    });

    this.canvas.on("mouse:move", (opt: any) => {
      if (this.canvas.isDragging) {
        let e = opt.e;
        let vpt = this.canvas.viewportTransform;
        vpt[4] += e.clientX - this.canvas.lastPosX;
        vpt[5] += e.clientY - this.canvas.lastPosY;
        this.canvas.requestRenderAll();
        this.canvas.lastPosX = e.clientX;
        this.canvas.defaultCursor = "grabbing";
        this.canvas.lastPosY = e.clientY;
      }
    });

    this.canvas.on("mouse:up", (opt: any) => {
      this.canvas.setViewportTransform(this.canvas.viewportTransform);
      this.canvas.isDragging = false;
      this.canvas.defaultCursor = "default";
    });
  }

  addHoverEvent() {
    this.canvas.on("mouse:down", (opt: any) => {
      const obj = opt.target;
      const pageCoords = [opt.e.pageX, opt.e.pageY];
      if (obj?.__featureType === "shelf") {
        this.setState({
          tipsShow: true,
          tipsContent: obj.__id,
          pageCoords,
        });
      } else {
        this.setState({
          tipsShow: false,
        });
      }
    });
  }

  draw() {
    this.canvas.clear();
    const seatSize = [25, 25];
    const seatDist = 5;
    const layoutDist = 200;
    const originPoint = [100, 50];
    const featureGroup: any[] = [];

    if (_.isEmpty(this.layoutData)) return;

    const seatData = this.layoutData.binNoList as Array<any>;
    const seatInfoList = this.layoutData.rowList as Array<any>;
    const seatLayoutGroup = seatInfoList.reduce((pre, curr) => {
      const index = Number(curr.rowGroup);
      const title = curr.shelfName;
      const columnRange = Array.from(
        { length: curr.endColumnNo - curr.startColumnNo + 1 },
        (_, index) => curr.startColumnNo + index
      );
      const layerRange = Array.from(
        { length: curr.endLayerNo - curr.startLayerNo + 1 },
        (_, index) => curr.startLayerNo + index
      );

      const layoutHeight =
        (curr.endLayerNo - curr.startLayerNo + 1) * (seatSize[1] + seatDist);

      return {
        ...pre,
        [index]: { columnRange, layerRange, layoutHeight, title },
      };
    }, {});

    for (const item of seatData) {
      const seatItem = item;
      if (seatItem) {
        const { binCol, binLayer, binRow, binNo } = seatItem;

        const preLayoutH =
          binRow > 1 && seatLayoutGroup[binRow - 1]?.layoutHeight + layoutDist;

        const seat: fabric.Rect = new fabric.Rect({
          __id: binNo,
          __featureType: "shelf",
          width: seatSize[0],
          height: seatSize[1],
          fill: RectStatusColor.init,
          stroke: "#262626",
          strokeWidth: 2,
          left: binCol * (seatSize[0] + seatDist) + originPoint[0],
          top:
            binLayer * (seatSize[1] + seatDist) + preLayoutH + originPoint[1],
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
          hasBorders: false,
        });

        featureGroup.push(seat);
      }
    }

    Object.keys(seatLayoutGroup).forEach((key: number) => {
      const preLayoutH =
        key > 1 && seatLayoutGroup[key - 1].layoutHeight + layoutDist;
      seatLayoutGroup[key].columnRange.forEach((col) => {
        const seatIndicatorX: fabric.Rect = new fabric.Rect({
          __featureType: "indicator",
          width: seatSize[0],
          height: seatSize[1],
          fill: RectStatusColor.init,
          stroke: "#69b1ff",
          strokeWidth: 2,
          left: col * (seatSize[0] + seatDist) + originPoint[0],
          top: 1 * seatSize[1] + preLayoutH + originPoint[1] - seatSize[1],
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
          hasBorders: false,
          selectable: false,
        });
        const textX = new fabric.Text(`${col}`, {
          __featureType: "text",
          fontSize: 14,
          fill: "#262626",
          left: col * (seatSize[0] + seatDist) + originPoint[0] + 9,
          top: 1 * seatSize[1] + preLayoutH + originPoint[1] - 25,
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
        });
        featureGroup.push(seatIndicatorX, textX);
      });
      seatLayoutGroup[key].layerRange.forEach((layer) => {
        const seatIndicatorY: fabric.Rect = new fabric.Rect({
          __featureType: "indicator",
          width: seatSize[0],
          height: seatSize[1],
          fill: RectStatusColor.init,
          stroke: "#69b1ff",
          strokeWidth: 2,
          left:
            1 * (seatSize[0] + seatDist) +
            originPoint[0] -
            seatSize[0] -
            seatDist,
          top: layer * (seatSize[1] + seatDist) + preLayoutH + originPoint[1],
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
          hasBorders: false,
          selectable: false,
        });
        const textY = new fabric.Text(`${layer}`, {
          __featureType: "text",
          fontSize: 14,
          fill: "#262626",
          left: 1 * (seatSize[0] + seatDist) + originPoint[0] - seatSize[0],
          top:
            layer * (seatSize[1] + seatDist) + preLayoutH + originPoint[1] + 10,
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
          hasBorders: false,
          selectable: false,
        });
        featureGroup.push(seatIndicatorY, textY);
      });
      const textTitle = new fabric.Text(`${seatLayoutGroup[key].title}`, {
        __featureType: "text",
        fontSize: 16,
        fill: "#262626",
        left: 1 * (seatSize[0] + seatDist) + originPoint[0] - seatSize[0],
        top: 1 * (seatSize[1] + seatDist) + preLayoutH + originPoint[1] - 70,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        selectable: false,
      });
      featureGroup.push(textTitle);
    });
    this.canvas.add(...featureGroup);
    this.canvas.getObjects().forEach((block: any) => {
      block.top = this.canvas.getHeight() - block.top - block.height;
      block.setCoords();
    });
    this.canvas.renderAll();
  }

  componentWillUnmount() {
    this.canvas?.clear();
  }

  addSelectionEvent() {
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
        if (pointer && this.downPoint) {
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
      }
    });

    // 监听鼠标释放事件
    this.canvas.on("mouse:up", (event) => {
      if (this.state.isSelectingOn && this.selectionRectangle) {
        // 移除框选矩形
        this.canvas.remove(this.selectionRectangle);

        // 获取框选范围内的图形对象
        const selectedObjects = this.getIntersectingRectangles(
          this.selectionRectangle
        );

        if (this.state.selectedMode === "PUT") {
          this.selectFeats = _.unionBy(
            this.selectFeats,
            selectedObjects,
            "__id"
          );
        } else {
          this.selectFeats = _.differenceBy(
            this.selectFeats,
            selectedObjects,
            "__id"
          );
        }
        this.downPoint = null;
        this.setListData(this.selectFeats);
        this.canvas.renderAll();
      }
    });
  }

  //获取
  getIntersectingRectangles(rectangleA) {
    const intersectingRectangles: any[] = [];
    this.canvas.forEachObject((obj: any) => {
      if (obj !== rectangleA && obj.__featureType === "shelf") {
        if (this.isPointInsideRectangle(obj, rectangleA)) {
          intersectingRectangles.push(obj);
          if (this.state.selectedMode === "PUT") {
            obj.set("fill", RectStatusColor.selected);
          } else {
            obj.set("fill", RectStatusColor.init);
          }
        }
      }
    });
    this.canvas.renderAll();
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
  setReactColorById(id: string, status: RectStatus) {
    this.canvas.forEachObject((obj) => {
      if (obj.__id === id) {
        obj.set("fill", RectStatusColor[status]);
        obj.canvas.renderAll();
      }
    });
  }

  //设置选中
  setSelectGroupById(...ids: string[]) {
    this.canvas.forEachObject((obj: any) => {
      if (obj.__featureType === "shelf" && ids.includes(obj.__id)) {
        obj.set("fill", "blue");
        obj.canvas.renderAll();
      }
    });
  }
}

export default SeatLayoutComp;
