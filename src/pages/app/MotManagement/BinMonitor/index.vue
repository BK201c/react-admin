<template>
  <div id="mainContainer" class="mainContainer">
    <!-- <button @click="changePage">111</button> -->
    <div class="Tabcontainer">
      <Flicking
        :options="{ align: 'prev', preventClickOnDrag: true }"
        @move-start="onMoveStart"
        @move-end="onMoveEnd"
      >
        <span
          v-for="item in regionGroupTabs"
          :key="item.roadWayNo"
          :class="{ CheckedTab: item.roadWayNo === RegionGroupNo }"
          class="Tabbutton"
          @click="getBinLayout(item.roadWayNo)"
        >
          <a>{{ item.roadWayName }}</a></span
        >
      </Flicking>
    </div>
    <!-- <div class="ModeToolbar">
      <el-radio-group v-model="Mode" size="mini">
        <el-radio-button label="物流模式" />
        <el-radio-button label="生产模式" />
        <el-radio-button label="化成分容模式" />
      </el-radio-group>
    </div> -->
    <div class="MainToolbar">
      <div class="MainToolbar_box" @click="LegendBar = !LegendBar">
        <div class="MainToolbar_item">
          <i class="el-icon-money" style="margin-right: 8px" />
          <span class="MainToolbar-txt">图例说明</span>
        </div>
      </div>
    </div>
    <div class="MainToolbar1">
      <div class="MainToolbar_box" @click="ShowBinsearch">
        <div class="MainToolbar_item">
          <i class="el-icon-mouse" style="margin-right: 8px" />
          <span class="MainToolbar-txt">库位选择</span>
        </div>
      </div>
    </div>
    <div v-if="LegendBar" class="Legendbar">
      <header class="Legendbar-header">
        <span class="Legendbar-title">图例说明：{{ Mode }}</span>
        <span class="Legendbar-panel-close" @click="LegendBar = !LegendBar">
          <i class="el-icon-close" />
        </span>
      </header>
      <Legend
        :mode="Mode"
        :legend-qty="LegendQty"
        :scmode="{
          Craft_Legend: Craft_Legend,
          Process_Legend: Process_Legend,
          Process_Legend_Dic: Process_Legend_Dic,
        }"
      />
    </div>
    <div id="SvgArea" class="pt-perspective">
      <div class="pt-page">
        <svgNode
          v-if="!currPage && svgNodes1.length > 0"
          ref="node1"
          :process-legend-dic="Process_Legend_Dic"
          :region-group-no="RegionGroupNo"
          :svg-attr="svgAttr"
          :crn-info="crnInfo"
          :mode="Mode"
          :bin-set-list="binSetList"
          :svg-nodes="svgNodes1"
          :nodes-state="nodesState"
        />
      </div>
      <div class="pt-page">
        <svgNode
          v-if="currPage && svgNodes2.length > 0"
          ref="node2"
          :process-legend-dic="Process_Legend_Dic"
          :region-group-no="RegionGroupNo"
          :svg-attr="svgAttr"
          :crn-info="crnInfo"
          :mode="Mode"
          :bin-set-list="binSetList"
          :svg-nodes="svgNodes2"
          :nodes-state="nodesState"
        />
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import _ from "lodash";
import vex from "@/lib/vxetbale";
import { Flicking } from "@egjs/vue-flicking";
import svgNode from "./components/svgNode.vue";
import * as signalR from "@microsoft/signalr";
import Legend from "./components/Legend.vue";
import mainAPI from "@/api/modules/monitorManagement/BinMonitorAPI";
export default {
  name: "BinMonitor",
  components: {
    svgNode,
    Flicking,
    Legend,
  },
  data() {
    return {
      svgAttr: { width: 0, height: 0, viewX: 0, viewY: 0 },
      svgpanzoom: null, // svg控制器
      svgNodes1: [], // 节点集合1
      svgNodes2: [], // 节点集合1
      nodesState: {}, // 节点状态
      currPage: 0,
      isMoving: false,
      Mode: "物流模式",
      regionGroupTabs: [],
      connection: null,
      MethodName: null,
      RegionGroupNo: null,
      crnInfo: null,
      LegendBar: false,
      binSetList: null,
      monitorType: null,
      layerNoMargin: 0,
      ProcessColorDic: [
        "#d0e849",
        "#88d27b",
        "#f1a8a2",
        "#50cdc5",
        "#eeb206",
        "#94281d",
        "#26a65b",
        "#ecd5ef",
        "#336f7a",
        "#663f75",
        "#913c89",
        "#2cc3ff",
        "#d0e849",
        "#687fa1",
        "#8bc3f4",
        "#d9faff",
      ],
      Craft_Legend: [],
      Process_Legend: [],
      Process_Legend_Dic: {},
      LegendQty: {},
      shelfX: 0,
      shelfY: 0,
      InitShelfY: 0,
    };
  },
  watch: {
    RegionGroupNo(val) {
      if (!_.isEmpty(val) && this.connection.state === "Connected") {
        switch (this.Mode) {
          case "物流模式":
            this.connection.invoke("LeaveGroup", this.MethodName);
            this.MethodName = "Logistic|" + this.RegionGroupNo;
            this.connection.invoke("Connected", "Logistic|" + val); // signalR切换模式
            break;
          case "化成分容模式":
            this.connection.invoke("LeaveGroup", this.MethodName);
            this.MethodName = "HCFR|" + this.RegionGroupNo;
            this.connection.invoke("Connected", "HCFR|" + val); // signalR切换模式
            break;
          case "生产模式":
            this.connection.invoke("LeaveGroup", this.MethodName);
            this.MethodName = "Product|" + this.RegionGroupNo;
            this.connection.invoke("Connected", "Product|" + val); // signalR切换模式
            break;
          default:
            break;
        }
      }
    },
    Mode(val) {
      if (!_.isEmpty(val)) {
        switch (val) {
          case "物流模式":
            this.connection.invoke("LeaveGroup", this.MethodName);
            this.MethodName = "Logistic|" + this.RegionGroupNo;
            this.connection.invoke(
              "Connected",
              "Logistic|" + this.RegionGroupNo
            ); // signalR切换模式
            break;
          case "化成分容模式":
            this.connection.invoke("LeaveGroup", this.MethodName);
            this.MethodName = "HCFR|" + this.RegionGroupNo;
            this.connection.invoke("Connected", "HCFR|" + this.RegionGroupNo); // signalR切换模式
            break;
          case "生产模式":
            this.connection.invoke("LeaveGroup", this.MethodName);
            this.MethodName = "Product|" + this.RegionGroupNo;
            this.connection.invoke(
              "Connected",
              "Product|" + this.RegionGroupNo
            ); // signalR切换模式
            break;
          default:
            break;
        }
      }
    },
  },
  created() {
    this.getRegionGroupTab();
  },
  mounted() {
    document.getElementById("SvgArea").oncontextmenu = function (event) {
      event.preventDefault();
    };
    this.initTopoWH();
    this.signalRMonitorBuild();
  },
  beforeDestroy() {
    this.connection.stop();
  },
  methods: {
    ShowBinsearch() {
      if (!this.currPage) {
        this.$refs.node1.ShowShowBinsearch();
      } else {
        this.$refs.node2.ShowShowBinsearch();
      }
    },
    signalRMonitorBuild() {
      const wsUrl = sessionStorage.getItem("wsUrl");
      const wsService = sessionStorage.getItem("wsService");
      let signalr_url = `${wsUrl}/api/${wsService}/monitor`;

      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(signalr_url)
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect()
        .build();
      this.connection.keepAliveIntervalInMilliseconds = 5000;
      this.connection.onreconnected(async (id) => {
        switch (this.Mode) {
          case "物流模式":
            this.MethodName = "Logistic|" + this.RegionGroupNo;
            this.connection.invoke("Connected", this.MethodName); // signalR切换模式

            break;
          case "化成分容模式":
            this.MethodName = "HCFR|" + this.RegionGroupNo;
            this.connection.invoke("Connected", this.MethodName); // signalR切换模式

            break;
          case "生产模式":
            this.MethodName = "Product|" + this.RegionGroupNo;
            this.connection.invoke("Connected", this.MethodName); // signalR切换模式

            break;
          default:
            break;
        }
        console.info("已自动重新连接:" + this.MethodName);
      });
      this.connection.onclose(async (error) => {
        if (error) {
          // 异常断开时,需要手动重新连接
          await this.connection.start();
        } else {
          console.info("已断开连接");
        }
      });
    },
    signalRMonitorInit(no) {
      let that = this;
      // if (this.connection.state) return
      this.connection
        .start()
        .then(() => {
          // that.MethodName = 'Logistic|' + no
          that.MethodName = "Logistic|" + no;

          that.connection.invoke("Connected", "Logistic|" + no);
        })
        .catch((e) => {
          console.log(e);
          console.info("signalR连接服务器出错");
          // that.MessageBox(this.$t('app.Field.错误信息'), this.$t('app.Field.连接服务器出错'), 'fault')
        });
      this.connection.on("SendMessage", (msg) => {
        let response = JSON.parse(msg);
        if (!response) {
          return;
        }
        //  console.log(response)
        let index = 0;
        that.nodesState = response.binInfo;
        if (that.Mode === "生产模式") {
          if (response.craftSet) {
            that.Craft_Legend = response.craftSet;
          }
          if (response.colorSet) {
            that.ColorSet = response.colorSet;
          }
          if (response.processSet) {
            that.Process_Legend = response.processSet;
          }
          for (const key in that.Process_Legend) {
            if (that.ColorSet.hasOwnProperty(key)) {
              if (that.ColorSet[key]) {
                that.Process_Legend_Dic[key] = that.ColorSet[key];
              } else {
                that.Process_Legend_Dic[key] = that.ProcessColorDic[index];
                index++;
              }
            } else {
              that.Process_Legend_Dic[key] = that.ProcessColorDic[index];
              index++;
            }
          }
          that.LegendQty = response.staticStatusSet;
        } else if (that.Mode === "物流模式") {
          that.LegendQty = response.binStatusSet;
        } else if (that.Mode === "化成分容模式") {
          that.LegendQty = {
            In: response.ecsInStatusSet,
            Out: response.ecsOutStatusSet,
          };
        }

        if (response.crnInfo && response.crnInfo.length !== 0) {
          that.crnInfo = response.crnInfo;
          if (!that.currPage) {
            that.$refs.node1.CrnMove(response.crnInfo);
          } else {
            that.$refs.node2.CrnMove(response.crnInfo);
          }
        }
      });
    },
    // 切换页面
    changePage() {
      let $pages = $("div.pt-page");
      var $currPage = $pages.eq(this.currPage);
      this.currPage = this.currPage ? 0 : 1;
      var $nextPage = $pages.eq(this.currPage).addClass("pt-page-current");
      const outClass = "pt-page-rotateSlideOut";
      const inClass = "pt-page-rotateSlideIn";
      $currPage.addClass(outClass).on("animationend", function () {
        $currPage.off("animationend");
        // endCurrPage = true
        // if (endNextPage) {
        //   onEndAnimation($currPage, $nextPage)
        // }
        onEndAnimation($currPage, $nextPage);
      });

      $nextPage.addClass(inClass).on("animationend", function () {
        $nextPage.off("animationend");
        // endNextPage = true
        // if (endCurrPage) {
        //   onEndAnimation($currPage, $nextPage)
        // }
        onEndAnimation($currPage, $nextPage);
      });

      function onEndAnimation($outpage, $inpage) {
        $outpage.attr("class", "pt-page");
        $inpage.attr("class", "pt-page pt-page-current");
      }
    },
    // 获取虚拟库区列表数据
    getRegionGroupTab() {
      mainAPI.getRoadWayTab().then((res) => {
        let data = res.data;
        let TabNo = "";
        if (data !== null && data.length > 0) {
          TabNo = data[0].roadWayNo;
          this.regionGroupTabs = data;
          this.getBinLayout(TabNo);
          if (TabNo !== "") this.signalRMonitorInit(TabNo);
        }
      });
    },
    // 获取库区生成数据
    getBinLayout(no) {
      if (this.isMoving) {
        return;
      }
      if (this.RegionGroupNo && this.RegionGroupNo === no) {
        return;
      }
      this.RegionGroupNo = no;
      mainAPI
        .getBinLayout({ roadwayNo: this.RegionGroupNo })
        .then((res) => {
          if (res.code === 0) {
            let data = res.data;
            return data;
          }
        })
        .then((data) => {
          this.monitorType = data.monitorType && data.monitorType.split(",");
          this.createLayout(data);
          this.changePage();
        });
      mainAPI.getBinSet({ roadwayNo: this.RegionGroupNo }).then((res) => {
        if (res.code === 0) {
          this.binSetList = res.data;
        }
      });
    },
    SetShelfY(val) {
      if (
        val.some((t) => t.extensionFlag === 0) &&
        val.some((t) => t.extensionFlag === 1)
      ) {
        if (val.some((t) => t.extensionFlag === 0 && t.upDown === "DOWN")) {
          const item = val.find(
            (item) => item.extensionFlag === 0 && item.upDown === "DOWN"
          );
          this.InitShelfY = (item.endLayerNo + 5) * 43 * 2;
          this.layerNoMargin = (item.endLayerNo + 4) * 43 * 2;
        }
      }
    },
    // 创建库区函数
    createLayout(data) {
      // rowList regionList
      const rowList = data.rowList;
      // const regionList = data.regionList
      let svgNodes = [];
      let doubleNodes = [];
      let craneRow = "";
      this.shelfY = 0;
      this.layerNoMargin = 0;
      this.SetShelfY(rowList);
      rowList.forEach((row) => {
        if (row.itemType === "Shelf") {
          if (row.extensionFlag === 0) {
            svgNodes = [...svgNodes, ...this.createNormalRow(row)];
          } else if (row.extensionFlag === 1) {
            doubleNodes.push(row);
          }
        } else if (row.itemType === "Crane") {
          craneRow = row;
        }
      });
      if (doubleNodes.length) {
        svgNodes = [...svgNodes, ...this.createExtensionRow2(doubleNodes)];
      }
      // if (craneRow) {
      svgNodes = [...svgNodes, ...this.createCraneRow(craneRow)];
      // }

      if (this.currPage) {
        this.svgNodes1 = svgNodes;
      } else {
        this.svgNodes2 = svgNodes;
      }
    },
    // 创建普通货架函数
    createNormalRow(item) {
      let nodes = [];
      const row_min = item.startLayerNo;
      const row_max = item.endLayerNo;
      const row_sort = item.layerSortMode;
      const col_min = item.startColumnNo;
      const col_max = item.endColumnNo;
      const col_sort = item.columnSortMode;
      const hideColumnList = item.hideColumnList;
      const hideSetList = item.hideSetList;
      this.shelfY = (row_max + 5) * 43;

      if (item.upDown === "UP") {
        this.shelfY = 0;
        this.layerNoMargin = (row_max + 4) * 43;
        this.InitShelfY = (row_max + 5) * 43;
        for (let col = col_min; col <= col_max; col++) {
          for (let row = row_min; row <= row_max; row++) {
            let thisRow = row_sort === "ASC" ? row_max + 1 - row : row;
            let thisCol =
              col_sort === "ASC" ? col_max + 1 - col : col - col_min + 1;
            if (col === col_min) {
              nodes.push({
                type: "T",
                id: "col",
                name: row,
                x: this.shelfX + (row_min - 1) * 43,
                y: this.shelfY + thisRow * 43,
                width: 35,
                height: 35,
              });
              if (row === row_max) {
                nodes.push({
                  type: "Tips",
                  id: "Tips",
                  name: item.shelfName,
                  x: this.shelfX + (row_min - 1) * 43,
                  y:
                    this.shelfY +
                    (item.labelDireciton === 0 ? row_min - 2 : row_max + 2) *
                      43,
                  width: 95,
                  height: 65,
                });
              }
            }
            if (row === row_min) {
              if (!hideColumnList?.includes(col.toString())) {
                nodes.push({
                  type: "T",
                  id: "row",
                  name: col,
                  x: this.shelfX + thisCol * 43,
                  y:
                    this.shelfY +
                    (item.labelDireciton === 0 ? row_min - 1 : row_max + 1) *
                      43,
                  width: 35,
                  height: 35,
                });
              }
            }
            if (
              this.nodeShowRules(
                this.RegionGroupNo +
                  "_" +
                  item.shelfNo +
                  "_" +
                  item.rowNo +
                  "_" +
                  col +
                  "_" +
                  row,
                hideSetList
              )
            ) {
              let id =
                this.RegionGroupNo +
                "_" +
                item.shelfNo +
                "_" +
                item.rowNo +
                "_" +
                col +
                "_" +
                row;
              nodes.push({
                type: "B",
                id: id,
                x: this.shelfX + thisCol * 43,
                y: this.shelfY + thisRow * 43,
                width: 35,
                height: 35,
                isSelect: false,
              });
              this.nodesState[id] = [0, 0, 0, 0];
            }
          }
        }
      } else {
        this.shelfY = this.InitShelfY;
        for (let col = col_min; col <= col_max; col++) {
          for (let row = row_min; row <= row_max; row++) {
            let thisRow = row_sort === "ASC" ? row_max + 1 - row : row;
            let thisCol =
              col_sort === "ASC" ? col_max + 1 - col : col - col_min + 1;
            if (col === col_min) {
              nodes.push({
                type: "T",
                id: "col",
                name: row,
                x: this.shelfX + (row_min - 1) * 43,
                y: this.shelfY + thisRow * 43,
                width: 35,
                height: 35,
              });
              if (row === row_max) {
                nodes.push({
                  type: "Tips",
                  id: "Tips",
                  name: item.shelfName,
                  x: this.shelfX + (row_min - 1) * 43,
                  y:
                    this.shelfY +
                    (item.labelDireciton === 0 ? row_min - 2 : row_max + 2) *
                      43,
                  width: 95,
                  height: 65,
                });
              }
            }
            if (row === row_min) {
              if (!hideColumnList?.includes(col.toString())) {
                nodes.push({
                  type: "T",
                  id: "row",
                  name: col,
                  x: this.shelfX + thisCol * 43,
                  y:
                    this.shelfY +
                    (item.labelDireciton === 0 ? row_min - 1 : row_max + 1) *
                      43,
                  width: 35,
                  height: 35,
                });
              }
            }
            if (
              this.nodeShowRules(
                this.RegionGroupNo +
                  "_" +
                  item.shelfNo +
                  "_" +
                  item.rowNo +
                  "_" +
                  col +
                  "_" +
                  row,
                hideSetList
              )
            ) {
              let id =
                this.RegionGroupNo +
                "_" +
                item.shelfNo +
                "_" +
                item.rowNo +
                "_" +
                col +
                "_" +
                row;
              nodes.push({
                type: "B",
                id: id,
                x: this.shelfX + thisCol * 43,
                y: this.shelfY + thisRow * 43,
                width: 35,
                height: 35,
                isSelect: false,
              });
              this.nodesState[id] = [0, 0, 0, 0];
            }
          }
        }
        // this.InitShelfY = (row_max + 5) * 43
      }
      // this.shelfY = 0

      // this.shelfY = this.shelfY + (row_max + 5) * 43
      // this.layerNoMargin = (row_max + 4) * 43
      return nodes;
    },
    // 创建双伸货架函数
    createExtensionRow2(arr) {
      let nodes = [];
      let shelfYFUPFlag = false;
      let shelfYFDOWNFlag = false;
      arr.forEach((item) => {
        const row_min = item.startLayerNo;
        const row_max = item.endLayerNo;
        const row_sort = item.layerSortMode;
        const col_min = item.startColumnNo;
        const col_max = item.endColumnNo;
        const col_sort = item.columnSortMode;
        const hideColumnList = item.hideColumnList;
        const hideSetList = item.hideSetList;
        const rowRange = item.rowRange;
        // if (item.upDown === 'UP') {
        //   this.layerNoMargin = 1500
        // }
        let shelfY = (row_max + 5) * 43 * 2;

        if (item.upDown === "UP") {
          this.shelfY = 0;
          this.InitShelfY = (row_max + 5) * 43 * 2;
          for (let col = col_min; col <= col_max; col++) {
            for (let row = row_min; row <= row_max; row++) {
              // debugger
              let thisRow = row_sort === "ASC" ? row_max + 1 - row : row;
              let thisCol = col_sort === "ASC" ? col_max + 1 - col : col;
              if (col === col_min) {
                if (!shelfYFUPFlag) {
                  nodes.push({
                    type: "T",
                    id: "col",
                    name: row,
                    x: this.shelfX + (row_min - 3) * 43,
                    y: this.shelfY + thisRow * 100,
                    width: 35,
                    height: 78,
                  });
                }
                rowRange.forEach((rowTT, index) => {
                  nodes.push({
                    type: "T",
                    id: "col",
                    name: rowTT.binExtensionIndex === 1 ? "内" : "外",
                    x: this.shelfX + (row_min - 2) * 43,
                    y:
                      rowTT.binExtensionIndex === 1
                        ? this.shelfY + thisRow * 100 + 43
                        : this.shelfY + thisRow * 100,
                    width: 35,
                    height: 35,
                  });
                });
                if (!shelfYFUPFlag) {
                  if (row === row_max) {
                    nodes.push({
                      type: "Tips",
                      id: "Tips",
                      name: item.shelfName,
                      x: this.shelfX + (row_min - 3) * 43,
                      y: this.shelfY + (row_max + 4) * 41 * 2,
                      width: 225,
                      height: 65,
                    });
                  }
                }
              }
              if (row === row_min) {
                if (!_.includes(hideColumnList, col.toString())) {
                  nodes.push({
                    type: "T",
                    id: "row",
                    name: col,
                    x: this.shelfX + thisCol * 43,
                    y:
                      this.shelfY +
                      (item.labelDireciton === 1
                        ? row_min * 100 - 43
                        : row_max * 100 + 90),
                    width: 35,
                    height: 35,
                  });
                }
              }
              rowRange.forEach((rowDD, index) => {
                if (
                  this.nodeShowRules(
                    this.RegionGroupNo +
                      "_" +
                      item.shelfNo +
                      "_" +
                      rowDD.binRow +
                      "_" +
                      col +
                      "_" +
                      row,
                    hideSetList
                  )
                ) {
                  let id =
                    this.RegionGroupNo +
                    "_" +
                    item.shelfNo +
                    "_" +
                    rowDD.binRow +
                    "_" +
                    col +
                    "_" +
                    row;
                  nodes.push({
                    type: "B",
                    id: id,
                    x: this.shelfX + thisCol * 43,
                    y:
                      rowDD.binExtensionIndex === 1
                        ? this.shelfY + thisRow * 100 + 43
                        : this.shelfY + thisRow * 100,
                    width: 35,
                    height: 35,
                  });
                  this.nodesState[id] = [0, 0, 0, 0];
                }
              });
            }
          }
          shelfYFUPFlag = true;
        } else {
          this.shelfY = this.InitShelfY;
          for (let col = col_min; col <= col_max; col++) {
            for (let row = row_min; row <= row_max; row++) {
              // debugger
              let thisRow = row_sort === "ASC" ? row_max + 1 - row : row;
              let thisCol = col_sort === "ASC" ? col_max + 1 - col : col;
              if (col === col_min) {
                if (!shelfYFDOWNFlag) {
                  nodes.push({
                    type: "T",
                    id: "col",
                    name: row,
                    x: this.shelfX + (row_min - 3) * 43,
                    y: this.shelfY + thisRow * 100,
                    width: 35,
                    height: 78,
                  });
                }
                rowRange.forEach((rowTT, index) => {
                  nodes.push({
                    type: "T",
                    id: "col",
                    name: rowTT.binExtensionIndex === 2 ? "内" : "外",
                    x: this.shelfX + (row_min - 2) * 43,
                    y:
                      rowTT.binExtensionIndex === 2
                        ? this.shelfY + thisRow * 100
                        : this.shelfY + thisRow * 100 + 43,
                    width: 35,
                    height: 35,
                  });
                });
                if (!shelfYFDOWNFlag) {
                  if (row === row_max) {
                    nodes.push({
                      type: "Tips",
                      id: "Tips",
                      name: item.shelfName,
                      x: this.shelfX + (row_min - 3) * 43,
                      y: this.shelfY + (row_max + 4) * 41 * 2,
                      width: 225,
                      height: 65,
                    });
                  }
                }
              }
              if (row === row_min) {
                if (!_.includes(hideColumnList, col.toString())) {
                  nodes.push({
                    type: "T",
                    id: "row",
                    name: col,
                    x: this.shelfX + thisCol * 43,
                    y:
                      this.shelfY +
                      (item.labelDireciton === 2
                        ? row_min * 100 - 43
                        : row_max * 100 + 90),
                    width: 35,
                    height: 35,
                  });
                }
              }
              rowRange.forEach((rowDD, index) => {
                if (
                  this.nodeShowRules(
                    this.RegionGroupNo +
                      "_" +
                      item.shelfNo +
                      "_" +
                      rowDD.binRow +
                      "_" +
                      col +
                      "_" +
                      row,
                    hideSetList
                  )
                ) {
                  let id =
                    this.RegionGroupNo +
                    "_" +
                    item.shelfNo +
                    "_" +
                    rowDD.binRow +
                    "_" +
                    col +
                    "_" +
                    row;
                  nodes.push({
                    type: "B",
                    id: id,
                    x: this.shelfX + thisCol * 43,
                    y:
                      rowDD.binExtensionIndex === 2
                        ? this.shelfY + thisRow * 100 + 43
                        : this.shelfY + thisRow * 100,
                    width: 35,
                    height: 35,
                  });
                  this.nodesState[id] = [0, 0, 0, 0];
                }
              });
            }
          }
          shelfYFDOWNFlag = true;
          this.layerNoMargin = this.shelfY;
        }
      });
      //  console.log(nodes, '-------nodes-----')
      return nodes;
    },
    // 创建堆垛机函数
    createCraneRow(item) {
      // debugger
      let nodes = [];
      nodes.push({
        type: "Crane",
        id: item.shelfNo,
        name: item.shelfName,
        x: this.shelfX,
        y: this.layerNoMargin,
        start: item.startColumnNo,
        end: item.endColumnNo,
        cell: item.xCell,
      });
      return nodes;
    },
    onMoveStart(e) {
      this.isMoving = true;
    },
    onMoveEnd(e) {
      this.isMoving = false;
    },
    // 节点校验是否显示
    nodeShowRules(rowcol, HideSetList) {
      if (HideSetList.includes(rowcol)) {
        return false;
      }
      return true;
    },
    initTopoWH() {
      this.$nextTick(() => {
        let ele = document.getElementById("mainContainer");
        let topoW = ele.clientWidth;
        let topoH = ele.clientHeight - 39;
        this.svgAttr.width = topoW;
        this.svgAttr.height = topoH;
        this.svgAttr.minW = topoW;
        this.svgAttr.minH = topoH;
      });
    },
  },
};
</script>

<style scoped>
.mainContainer {
  height: calc(100% - 84px);
  background: rgb(207, 207, 207);
}
.Legendbar {
  position: absolute;
  top: 90px;
  right: 20px;
  z-index: 100;
  /* padding: 0px 9px; */
  white-space: nowrap;
  overflow: hidden;
  zoom: 1;
  width: 300px;
  /* height: 300px; */
  line-height: 26px;
  background: rgb(255, 255, 255);
  -webkit-box-shadow: 0 2px 6px 0 rgb(0 0 0 / 20%), 0 2px 6px 0 rgb(0 0 0 / 19%);
  -moz-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2),
    0 2px 6px 0 rgba(0, 0, 0, 0.19);
  box-shadow: 0 2px 6px 0 rgb(0 0 0 / 20%), 0 2px 6px 0 rgb(0 0 0 / 19%);
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.Legendbar-header {
  line-height: 27px;
  border-bottom: 1px solid #cbcccd;
  position: relative;
  display: block;
  text-align: left;
  background: #9baec5;
  padding: 0 10px;
  color: #fff;
}
.Legendbar-title {
  font-size: 14px;
  font-weight: 700;
}
.Legendbar-panel-close {
  position: absolute;
  right: 5px;
  cursor: pointer;
  font-size: 1.2em;
}
.MainToolbar {
  position: absolute;
  top: 50px;
  z-index: 100;
  right: 20px;
  background: #fff;
  box-shadow: 0 2px 2px rgb(0 0 0 / 15%);
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  border-radius: 3px;
}
.MainToolbar1 {
  position: absolute;
  top: 50px;
  z-index: 100;
  right: 150px;
  background: #fff;
  box-shadow: 0 2px 2px rgb(0 0 0 / 15%);
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  border-radius: 3px;
}
.MainToolbar_box {
  padding: 8px 0 8px;
  display: flex;
  cursor: pointer;
}
.ModeToolbar {
  position: absolute;
  bottom: 20px;
  z-index: 100;
  left: 20px;
}
.MainToolbar_item {
  cursor: pointer;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 12px;
  border-left: 1px dashed #dbdee2;
}
.MainToolbar-txt {
  display: inline-block;
}
.MainToolbar_item:hover {
  opacity: 0.6;
  text-decoration: none;
}
.pt-perspective {
  position: relative;
  width: 100%;
  height: calc(100% - 39px);
  -webkit-perspective: 1200px;
  -moz-perspective: 1200px;
  perspective: 1200px;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
.pt-page {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  background: #f0f2f5;
}
.pt-page-current {
  visibility: visible;
}

/* slide */
.pt-page-rotateSlideOut {
  -webkit-animation: rotateSlideOut 1s both ease;
  -moz-animation: rotateSlideOut 1s both ease;
  animation: rotateSlideOut 1s both ease;
}
.pt-page-rotateSlideIn {
  -webkit-animation: rotateSlideIn 1s both ease;
  -moz-animation: rotateSlideIn 1s both ease;
  animation: rotateSlideIn 1s both ease;
}

/********************************* keyframes **************************************/

/* slide */

@-webkit-keyframes rotateSlideOut {
  25% {
    opacity: 0.5;
    -webkit-transform: translateZ(-500px);
  }
  75% {
    opacity: 0.5;
    -webkit-transform: translateZ(-500px) translateX(-200%);
  }
  100% {
    opacity: 0.5;
    -webkit-transform: translateZ(-500px) translateX(-200%);
  }
}
@-moz-keyframes rotateSlideOut {
  25% {
    opacity: 0.5;
    -moz-transform: translateZ(-500px);
  }
  75% {
    opacity: 0.5;
    -moz-transform: translateZ(-500px) translateX(-200%);
  }
  100% {
    opacity: 0.5;
    -moz-transform: translateZ(-500px) translateX(-200%);
  }
}
@keyframes rotateSlideOut {
  25% {
    opacity: 0.5;
    transform: translateZ(-500px);
  }
  75% {
    opacity: 0.5;
    transform: translateZ(-500px) translateX(-200%);
  }
  100% {
    opacity: 0.5;
    transform: translateZ(-500px) translateX(-200%);
  }
}

@-webkit-keyframes rotateSlideIn {
  0%,
  25% {
    opacity: 0.5;
    -webkit-transform: translateZ(-500px) translateX(200%);
  }
  75% {
    opacity: 0.5;
    -webkit-transform: translateZ(-500px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateZ(0) translateX(0);
  }
}
@-moz-keyframes rotateSlideIn {
  0%,
  25% {
    opacity: 0.5;
    -moz-transform: translateZ(-500px) translateX(200%);
  }
  75% {
    opacity: 0.5;
    -moz-transform: translateZ(-500px);
  }
  100% {
    opacity: 1;
    -moz-transform: translateZ(0) translateX(0);
  }
}
@keyframes rotateSlideIn {
  0%,
  25% {
    opacity: 0.5;
    transform: translateZ(-500px) translateX(200%);
  }
  75% {
    opacity: 0.5;
    transform: translateZ(-500px);
  }
  100% {
    opacity: 1;
    transform: translateZ(0) translateX(0);
  }
}

/* animation delay classes */

.pt-page-delay100 {
  -webkit-animation-delay: 0.1s;
  -moz-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
</style>
<style scoped>
.CheckedTab {
  background-color: #1890ff !important;
  color: #fff !important;
}
.Tabcontainer {
  background-color: #f0f2f5 !important;
  /* position: absolute; */
  width: 100%;
  padding: 7px 3px;
  border-bottom: 2px solid #d8d8d8;
}
.Tabbutton {
  background-color: #fff;
  border-color: transparent;
  color: #0a0a0a;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  padding: 3px 5px;
  margin-right: 0.5rem !important;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: none;
  align-items: center;
  display: flex;
}
</style>
<style>
.flicking-viewport {
  position: relative;
  overflow: hidden;
}
.flicking-camera {
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: relative;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  z-index: 1;
}
.flicking-camera > * {
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
.flicking-viewport.vertical {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
}
.flicking-viewport.vertical > .flicking-camera {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
/*# sourceMappingURL=flicking.css.map */

#mainContainer .vxe-modal--header.is--ellipsis {
  padding: 2px 5px;
  background: #1890ff;
  color: #fff;
  font-size: 13px;
}
#mainContainer i.vxe-modal--close-btn.trigger--btn.vxe-icon--close {
  top: 4px !important;
}
</style>
