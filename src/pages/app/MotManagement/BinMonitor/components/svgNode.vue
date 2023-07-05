<template>
  <div>
    <SvgPanZoom
      :style="{ width: svgAttr.width + 'px', height: svgAttr.height + 'px' }"
      :zoom-enabled="true"
      :control-icons-enabled="false"
      :fit="true"
      :zoom-scale-sensitivity="0.3"
      :dbl-click-zoom-enabled="false"
      :center="true"
      :min-zoom="0.3"
      @RegionCheck="RegionCheck"
      @svgpanzoom="registerSvgPanZoom"
    >
      <svg
        id="svg-1"
        xmlns="http://www.w3.org/2000/svg"
        style="
          display: inline;
          width: inherit;
          min-width: inherit;
          max-width: inherit;
          height: inherit;
          min-height: inherit;
          max-height: inherit;
        "
        version="1.1"
      >
        <defs>
          <filter id="f1" x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceGraphic" dx="2" dy="2" />
            <feColorMatrix
              result="matrixOut"
              in="offOut"
              type="matrix"
              values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0"
            />
            <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>
        <g>
          <g
            v-for="(ele, index) in svgNodes"
            :key="index"
            class="nodesG"
            :transform="`translate(${ele.x},${ele.y})`"
            @mouseout.stop="mouseoutNode($event)"
            @mouseover.stop="mouseoverNode(ele.id, $event)"
          >
            <!-- 物流模式 -->
            <g
              v-if="
                ele.type === 'B' && nodesState[ele.id] && mode === '物流模式'
              "
              @dblclick.prevent="(event) => ShowBinDetails(event, ele.id)"
            >
              <rect
                rx="2"
                ry="2"
                :stroke="BasicStateStroke(nodesState[ele.id][0])"
                :fill="BasicStateColor(nodesState[ele.id])"
                :width="ele.width"
                :height="ele.height"
                class="reactClassBIN"
              />

              <CommonNodeState
                :showIn="nodesState[ele.id][2] === '1'"
                :showOut="nodesState[ele.id][2] === '2'"
                :showEquipment="nodesState[ele.id][2] === '3'"
                :showFire="nodesState[ele.id][3] === '1'"
                :showLock="nodesState[ele.id][3] === '2'"
                :showHeartBreak="nodesState[ele.id][3] === '3'"
                :showDisable="nodesState[ele.id][1] === '0'"
                :showOnlyIn="nodesState[ele.id][1] === '2'"
                :showOnlyOut="nodesState[ele.id][1] === '3'"
              />
            </g>
            <!-- 生产模式 -->
            <g
              v-else-if="
                ele.type === 'B' && nodesState[ele.id] && mode === '生产模式'
              "
              @dblclick.prevent="(event) => ShowBinDetails(event, ele.id)"
            >
              <template>
                <rect
                  rx="2"
                  ry="2"
                  :fill="ProductStateColor(nodesState[ele.id])"
                  :width="ele.width"
                  :stroke-width="
                    nodesState[ele.id][3] && nodesState[ele.id][3] !== ''
                      ? 5.5
                      : 3.5
                  "
                  :height="ele.height"
                  :stroke="ZZStateStroke(nodesState[ele.id][4], ele)"
                  class="reactClassBIN"
                />
              </template>
              <!-- 超时 -->
              <svg
                v-if="nodesState[ele.id][4] === '6'"
                x="3"
                y="3"
                viewBox="0 0 1024 1024"
                width="10"
                height="10"
              >
                <path :d="svgIcon.warning.d" fill="#d81e06" />
              </svg>
              <text
                v-if="nodesState[ele.id][2] != ''"
                font-weight="bold"
                x="20"
                y="14"
                stroke="#000"
                xml:space="preserve"
                text-anchor="start"
                font-family="Junction, sans-serif"
                font-size="12"
                stroke-width="0"
                fill="#000000"
              >
                {{ nodesState[ele.id][2] }}
              </text>
              <text
                v-if="parseInt(nodesState[ele.id][6]) > 0"
                font-weight="bold"
                x="10"
                y="14"
                stroke="#000"
                xml:space="preserve"
                text-anchor="start"
                font-family="Junction, sans-serif"
                font-size="12"
                stroke-width="0"
                fill="#000000"
              >
                {{ nodesState[ele.id][6] }}
              </text>
              <text
                v-if="parseInt(nodesState[ele.id][5]) > 0"
                font-weight="bold"
                :x="ele.width / 2"
                y="25"
                stroke="#000"
                style="
                  dominant-baseline: middle;
                  text-anchor: middle;
                  font-weight: bold;
                "
                font-size="12"
                stroke-width="0"
                fill="#000000"
              >
                {{ nodesState[ele.id][5] }}
              </text>
              <CommonNodeState
                :showIn="nodesState[ele.id][0] === '1'"
                :showOut="nodesState[ele.id][0] === '2'"
                :showEquipment="nodesState[ele.id][0] === '3'"
                :showFire="nodesState[ele.id][1] === '1'"
                :showLock="nodesState[ele.id][1] === '2'"
                :showHeartBreak="nodesState[ele.id][1] === '3'"
                :showDisable="nodesState[ele.id][7] === '4'"
                :showOnlyIn="nodesState[ele.id][7] === '2'"
                :showOnlyOut="nodesState[ele.id][7] === '3'"
              />
            </g>
            <!-- 化成分容模式 -->
            <g
              v-else-if="
                ele.type === 'B' &&
                nodesState[ele.id] &&
                mode === '化成分容模式'
              "
              @dblclick.prevent="(event) => ShowBinDetails(event, ele.id)"
            >
              <rect
                rx="2"
                ry="2"
                :fill="
                  HCStateColor(
                    nodesState[ele.id][0],
                    nodesState[ele.id][1],
                    nodesState[ele.id][2],
                    nodesState[ele.id][4]
                  )
                "
                :width="ele.width"
                :height="ele.height"
                stroke="#ededed"
                class="reactClassBIN"
              />

              <CommonNodeState
                :showIn="nodesState[ele.id][3] === '1'"
                :showOut="nodesState[ele.id][3] === '2'"
                :showEquipment="nodesState[ele.id][3] === '3'"
                :showFire="nodesState[ele.id][4] === '1'"
                :showLock="nodesState[ele.id][4] === '2'"
                :showHeartBreak="nodesState[ele.id][4] === '3'"
                :showDisable="nodesState[ele.id][2] === '4'"
                :showOnlyIn="nodesState[ele.id][2] === '2'"
                :showOnlyOut="nodesState[ele.id][2] === '3'"
              />
            </g>
            <!-- 其他 -->
            <g v-else>
              <rect
                v-if="ele.type === 'B'"
                rx="2"
                ry="2"
                fill="#D1D1D1"
                :width="ele.width"
                :height="ele.height"
                class="reactClassBIN"
              />
            </g>
            <!-- 选中状态 -->
            <g
              v-if="selectionBoxHaveChecked[ele.id]"
              :class="{ HoverBin: HoverBinNo === ele.id }"
            >
              <rect
                rx="2"
                ry="2"
                :width="ele.width"
                :height="ele.height"
                class="reactClassHoverBinNo"
              />
              <svg viewBox="0 0 1024 1024" x="5" y="5" width="25" height="25">
                <path :d="svgIcon.checked.d" fill="#ffffff" />
              </svg>
            </g>
            <!-- 提示 -->
            <g v-if="ele.type === 'T'">
              <rect
                rx="2"
                ry="2"
                :width="ele.width"
                :height="ele.height"
                class="Titleclass"
              />
              <text
                :x="ele.width / 2"
                :y="ele.height / 2"
                class="nodeName"
                style="
                  dominant-baseline: middle;
                  text-anchor: middle;
                  font-weight: bold;
                "
              >
                {{ ele.name }}
              </text>
            </g>
            <!-- 坐标轴数字标识 -->
            <g v-if="ele.type === 'Tips'">
              <text
                class="nodeName"
                style="
                  dominant-baseline: left;
                  text-anchor: left;
                  font-weight: bold;
                  font-size: 20px;
                "
                :x="ele.width / 2"
                :y="ele.height / 2"
              >
                {{ ele.name }}
              </text>
            </g>
            <!-- 堆垛机 -->
            <!-- 轨道 -->
            <g v-if="ele.type === 'Crane'">
              <rect
                :x="0"
                :y="0"
                class="st0"
                :width="ele.cell * 43"
                height="28.2"
              />
              <rect
                :x="0"
                :y="0 + 6"
                class="st1"
                :width="ele.cell * 43"
                height="15.2"
              />
            </g>
            <!-- 堆垛机主体 -->
            <g
              v-if="ele.type === 'Crane'"
              :id="'Crane' + ele.id"
              class="CRNs"
              @click="ShowCrnDetails(ele.id)"
            >
              <rect
                v-if="crnInfo && crnInfo[ele.id]"
                x="46.3"
                y="13"
                :fill="CRNstateColor(crnInfo[ele.id][0])"
                class="CRNst0"
                width="56.5"
                height="57.9"
              />
              <rect x="45" y="5.5" class="CRNst1" width="103.1" height="17.7" />
              <rect x="58.8" y="0" class="CRNst2" width="20.1" height="29.1" />
              <rect x="108.8" y="0" class="CRNst2" width="20.1" height="29.1" />
              <g>
                <rect x="1" y="5" class="CRNst3" width="16.9" height="14.6" />
                <line class="CRNst3" x1="1" y1="14.7" x2="17.9" y2="14.7" />
                <line class="CRNst3" x1="1" y1="9.8" x2="17.9" y2="9.8" />
                <line class="CRNst3" x1="13.7" y1="5" x2="13.7" y2="19.6" />
                <line class="CRNst3" x1="9.5" y1="5" x2="9.5" y2="19.6" />
                <line class="CRNst3" x1="5.2" y1="5" x2="5.2" y2="19.6" />
              </g>
              <!-- 有载无载 -->
              <rect x="3.1" y="-4.3" class="CRNst4" width="40" height="38" />
              <text x="62" y="17" style="font-size: 12px">{{ ele.id }}</text>
            </g>
          </g>
        </g>
        <rect
          v-show="selectionBox.isShow"
          :x="selectionBox.x"
          :y="selectionBox.y"
          :width="selectionBox.width"
          :height="selectionBox.height"
          stroke-dasharray="5,5"
          stroke-width="1"
          stroke="#222"
          fill="rgba(170,210,232,0.5)"
        />
      </svg>
    </SvgPanZoom>

    <vxe-modal
      ref="BINWLModal"
      v-model="BINWLModal"
      :title="'库位信息'"
      width="400"
      height="360"
      :lock-view="false"
      :loading="binloading"
      :mask="false"
      destroy-on-close
      :position="{ top: modelPos.top, left: modelPos.left }"
    >
      <template v-slot:title>
        <span>{{ "库位信息" }}</span>
        <i
          :title="'刷新'"
          style="cursor: pointer; margin-left: 8px"
          class="el-icon-refresh"
          @click="GetBinInfo('WL', BinInfoDetails['binNo'])"
        />
      </template>
      <el-row
        v-for="bin in BINInfo"
        :key="bin.id"
        style="font-size: 13px; margin: 2px 0"
      >
        <div style="float: left">{{ bin.name }}</div>
        <div v-if="BinInfoDetails" style="float: right">
          {{
            BinInfoDetails[bin.id] === ""
              ? "-"
              : bin.id === "inTimeLen"
              ? TimeStamp(BinInfoDetails[bin.id])
              : BinInfoDetails[bin.id]
          }}
        </div>
      </el-row>
      <el-row v-if="BinInfoDetails">
        <vxe-list
          v-if="BinInfoDetails.trayBarcodeList.length !== 0"
          height="120"
          class="TrayList"
          :data="BinInfoDetails.trayBarcodeList"
        >
          <template v-slot="{ items }">
            <div
              v-for="(item, index) in items"
              :key="index"
              class="my-list-item"
            >
              <el-link
                type="primary"
                @click="routToLoadDtl(item.trayBarcode, item.trayCode)"
                >{{ item.trayBarcode }}</el-link
              >-{{ item.trayTypeName }} {{ item.trayLoadedTypeName }}
            </div>
          </template>
        </vxe-list>
      </el-row>
    </vxe-modal>

    <vxe-modal
      v-model="CRNModal"
      :title="'堆垛机信息'"
      width="630"
      :lock-view="false"
      height="600"
      :mask="false"
      :loading="Crnloading"
      destroy-on-close
      remember
    >
      <template v-slot:title>
        <span>{{ "堆垛机信息" }}</span>
        <i
          :title="'刷新'"
          style="cursor: pointer; margin-left: 8px"
          class="el-icon-refresh"
        />
      </template>
      <el-row v-if="CRNmodalInfo.craneInfo">
        <el-card class="InfoCard">
          <el-col :span="14">
            <el-row>
              <div style="font-size: 20px">
                <span style="margin-left: 10px"
                  >{{ CRNmodalInfo.craneInfo.devName }}（{{ CrnNo }}）</span
                >
              </div>
            </el-row>
            <el-row style="margin: 10px 0px">
              <el-tag
                :type="
                  CRNmodalInfo.craneInfo.isConnect === 1 ? 'success' : 'info'
                "
                size="small"
                effect="dark"
              >
                {{ CRNmodalInfo.craneInfo.isConnect === 1 ? "在线" : "离线" }}
              </el-tag>
              <template v-if="CRNmodalInfo.craneInfo.isConnect === 1">
                <el-tag
                  :type="
                    CRNmodalInfo.craneInfo.isWarning === 1
                      ? 'danger'
                      : 'success'
                  "
                  size="small"
                  effect="dark"
                >
                  {{ CRNmodalInfo.craneInfo.isWarning === 1 ? "故障" : "正常" }}
                </el-tag>
                <el-tag
                  :type="
                    CRNmodalInfo.craneInfo.isAuto === 1 ? 'success' : 'warning'
                  "
                  size="small"
                  effect="dark"
                >
                  {{ CRNmodalInfo.craneInfo.isAuto === 1 ? "自动" : "手动" }}
                </el-tag>
                <el-tag
                  :type="
                    CRNmodalInfo.craneInfo.isFree === 1 ? 'warning' : 'success'
                  "
                  size="small"
                  effect="dark"
                >
                  {{ CRNmodalInfo.craneInfo.isFree === 1 ? "空闲" : "忙碌" }}
                </el-tag>
                <el-tag
                  :type="
                    CRNmodalInfo.craneInfo.isRun === 1 ? 'success' : 'danger'
                  "
                  size="small"
                  effect="dark"
                >
                  {{ CRNmodalInfo.craneInfo.isRun === 1 ? "正运行" : "未运行" }}
                </el-tag>
                <el-tag
                  :type="
                    CRNmodalInfo.craneInfo.isHaveGoods === 1
                      ? 'success'
                      : 'warning'
                  "
                  size="small"
                  effect="dark"
                >
                  {{
                    CRNmodalInfo.craneInfo.isHaveGoods === 1 ? "有载" : "无载"
                  }}
                </el-tag>
              </template>
            </el-row>
          </el-col>
          <el-col :span="10">
            <el-col :span="8">
              <div class="CrnRowCol">
                <div class="rowcol">{{ CRNmodalInfo.craneInfo.xCord }}</div>
                <div class="tagss">{{ "排" }}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="CrnRowCol">
                <div class="rowcol">{{ CRNmodalInfo.craneInfo.yCord }}</div>
                <div class="tagss">{{ "列" }}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="CrnRowCol">
                <div class="rowcol">{{ CRNmodalInfo.craneInfo.zCord }}</div>
                <div class="tagss">{{ "层" }}</div>
              </div>
            </el-col>
          </el-col>
        </el-card>
      </el-row>
      <el-row>
        <el-tabs tab-position="left" type="border-card" style="height: 310px">
          <el-tab-pane
            v-for="(flok, index) in CRNmodalInfo.taskInfo"
            :key="index"
            :label="'货叉' + flok.partIndex"
          >
            <div class="CrnDetails">
              <ul style="font-size: 16px">
                <li v-for="item in CranTaskInfo" :key="item.id">
                  <div style="margin: 4px 0; display: flex">
                    <span style="font-size: 15px"
                      >{{ $t(`app.Field.${item.name}`) }}:
                    </span>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="flok[item.id] === '' ? '-' : flok[item.id]"
                      placement="top-start"
                    >
                      <span
                        style="
                          font-size: 10px;
                          color: #818181;
                          width: 100%;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                          flex: 1;
                          cursor: default;
                        "
                      >
                        {{ flok[item.id] === "" ? "-" : flok[item.id] }}
                      </span>
                    </el-tooltip>
                  </div>
                </li>
              </ul>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-row>
      <el-row v-if="CRNmodalInfo.craneInfo">
        <el-card class="CraneInfoFaultDesc">
          <div
            style="
              margin-left: 10px;
              height: 90px;
              overflow-y: auto;
              width: 560px;
              word-break: break-all;
            "
          >
            <i
              class="el-icon-warning"
              style="color: #ff9800; font-size: 13px"
            />
            {{ "报警信息:" }}
            {{
              CRNmodalInfo.craneInfo.isWarning === 1
                ? CRNmodalInfo.craneInfo.faultDesc
                : ""
            }}
          </div>
        </el-card>
      </el-row>
    </vxe-modal>

    <vxe-modal
      v-model="BinSearchModal"
      :title="'库位搜索'"
      width="300"
      :position="{ top: 10, left: 10 }"
      :lock-view="false"
      :mask="false"
      @close="BinChildPageBack"
    >
      <div class="tabCrad">
        <div
          class="tabItem"
          :class="BinSearchMode === 0 ? 'TabChecked' : ''"
          @click="BinSearchMode = 0"
        >
          框选
        </div>
        <div
          class="tabItem"
          :class="BinSearchMode === 1 ? 'TabChecked' : ''"
          @click="BinSearchMode = 1"
        >
          条件筛选
        </div>
      </div>
      <template v-if="BinSearchMode === 1">
        <el-form
          ref="BinSearchForm"
          style="padding: 10px 10px 0 0"
          size="mini"
          label-width="80px"
        >
          <el-row :class="{ gray: !BinSearchchecked.BinNo }">
            <el-col :span="1">
              <el-checkbox v-model="BinSearchchecked.BinNo" />
            </el-col>
            <el-col :span="23">
              <el-form-item :label="'库位号'">
                <el-input v-model="BinSearchForm.BinNo" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row :class="{gray:!BinSearchchecked.StaticFrom}">
            <el-col :span="1">
              <el-checkbox v-model="BinSearchchecked.StaticFrom" />
            </el-col>
            <el-col :span="23">
              <el-form-item :label="'静置时间'">
                <el-input v-model="BinSearchForm.StaticFrom" style="width:77px" />
                -
                <el-input v-model="BinSearchForm.StaticTo" style="width:78px" />
              </el-form-item>
            </el-col>
          </el-row> -->
          <!-- <el-row :class="{gray:!BinSearchchecked.CraftNo}">
            <el-col :span="1">
              <el-checkbox v-model="BinSearchchecked.CraftNo" />
            </el-col>
            <el-col :span="23">
              <el-form-item :label="'工艺'">
                <el-select v-model="BinSearchForm.CraftNo" style="width:100%" clearable placeholder="" @change="CraftOptionChange">
                  <el-option v-for="item in Craftoptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :class="{gray:!BinSearchchecked.ProcessNo}">
            <el-col :span="1">
              <el-checkbox v-model="BinSearchchecked.ProcessNo" />
            </el-col>
            <el-col :span="23">
              <el-form-item :label="'工序'">
                <el-select v-model="BinSearchForm.ProcessNo" style="width:100%" clearable placeholder="">
                  <el-option v-for="item in Processoptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row :class="{ gray: !BinSearchchecked.TrayBarCode }">
            <el-col :span="1">
              <el-checkbox v-model="BinSearchchecked.TrayBarCode" />
            </el-col>
            <el-col :span="23">
              <el-form-item :label="'托盘号'">
                <el-input v-model="BinSearchForm.TrayBarCode" clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <vxe-button
            type="primary"
            style="width: 100%"
            @click="BinSearchFormSubmit"
            >{{ "查询" }}</vxe-button
          >
        </el-form>
      </template>
      <template v-else>
        <div class="ModeChangePick">
          <div
            class="ModeChangePickItem"
            :class="ModeChangePickMode === 0 ? 'ModeChangePickChecked' : ''"
            @click="ModeChangePickMode = 0"
          >
            正选
          </div>
          <div
            class="ModeChangePickItem"
            :class="ModeChangePickMode === 1 ? 'ModeChangePickChecked' : ''"
            @click="ModeChangePickMode = 1"
          >
            反选
          </div>
        </div>
        <span>*鼠标右键按住拖动框选</span>
      </template>
    </vxe-modal>

    <vxe-modal
      v-model="BinSearchModal"
      title="已选库位列表"
      width="250"
      :position="{ top: 380, left: 10 }"
      class="CheckedBinlist"
      :lock-view="false"
      :mask="false"
      @close="BinChildPageBack"
    >
      <vxe-list
        height="220"
        class="bin-list"
        :data="selectionBoxHaveCheckedCompute"
      >
        <template v-slot="{ items }">
          <div
            v-for="(item, index) in items"
            :key="index"
            :title="item"
            class="bin-list-item"
            @mouseover="hoverStyle(item)"
            @mouseout="hoverOutStyle(item)"
          >
            {{ binSetList[item] }}
            <el-link
              type="danger"
              style="float: right"
              size="mini"
              icon="el-icon-delete"
              circle
              @click="deleteBinSearchList(item)"
            />
          </div>
        </template>
      </vxe-list>
      <div style="border-top: 6px solid #e6e6e6; padding: 10px">
        <el-select
          v-model="BinChangeSelect"
          style="width: 133px; margin-right: 9px"
          size="mini"
        >
          <el-option
            v-for="item in BinSelectOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button
          type="primary"
          size="mini"
          :loading="BinChangeSelectSubmitLoading"
          @click="BinChangeSelectSubmit"
          >{{ "确认" }}</el-button
        >
      </div>
      <!-- <el-button style="width:100%"
                   @click="BinChildPageBack">{{ 取消') }}</el-button> -->
    </vxe-modal>
    <div v-show="showTips" id="myTips" class="mTips mTips-default">
      <h4>库位号 ：{{ BinTipsInfo.binNo }}</h4>
    </div>
    <vxe-modal
      ref="dialog"
      v-model="trayInfodialog"
      :title="$t('库存信息查询')"
      width="1300"
      resizable
      transfer
      resize
      destroy-on-close
      :z-index="2000"
      @zoom="zoom"
    >
      <trayInfo
        :code="trayBarcode"
        :tray-code="trayCode"
        :table-height="tableHeight"
      />
    </vxe-modal>
  </div>
</template>

<script>
import vex from "@/lib/vxetbale.js";
import SvgPanZoom from "./svgpanzoom.js";
//import { TimelineLite } from 'gsap/TweenMax'
import CommonNodeState from "./CommonNodeState";
import trayInfo from "./trayInfo.vue";
import mainAPI from "@/api/modules/monitorManagement/BinMonitorAPI";

export default {
  name: "SvgNode",
  components: {
    CommonNodeState,
    SvgPanZoom,
    trayInfo,
  },
  props: {
    regionGroupNo: {
      type: String,
      default() {
        return "";
      },
    },
    mode: {
      type: String,
      default() {
        return "物流模式";
      },
    },
    svgAttr: {
      type: Object,
      default() {
        return { width: 0, height: 0 };
      },
    },
    crnInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    binSetList: {
      type: Object,
      default() {
        return {};
      },
    },
    svgNodes: {
      type: Array,
      default() {
        return [];
      },
    },
    nodesState: {
      type: Object,
      default() {
        return {};
      },
    },
    processLegendDic: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      trayCode: "",
      trayBarcode: null,
      tableHeight: 0,
      trayInfodialog: false,
      BinSelectOption: [],
      showTips: false,
      Craftoptions: [],
      Processoptions: [],
      BinChangeSelectSubmitLoading: false,
      BinChangeSelect: null,
      BinSearchList: [],
      BinSearchForm: {
        BinNo: "",
        // 'CraftNo': '',
        // 'ProcessNo': '',
        TrayBarCode: "",
        // 'StaticFrom': '',
        // 'StaticTo': ''
      },
      BinSearchchecked: {
        BinNo: true,
        // 'CraftNo': true,
        // 'ProcessNo': true,
        TrayBarCode: true,
        // 'StaticFrom': true
      },
      BinSearchMode: 0, // 0 点选 1 条件
      ModeChangePickMode: 0, // 0 正选 1 反选
      BinSearchModal: false,
      HoverBinNo: null,
      selectionBoxHaveChecked: {},
      selectionBoxHaveCheckedCompute: [],
      selectionBox: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        isShow: false,
      },
      selectionStartPoint: { x: 0, y: 0 },
      selectionStartW: 0,
      selectionStartH: 0,
      modelPos: {
        top: 0,
        left: 0,
      },
      svgpanzoom: null,
      CRNTimeLine: {},
      BinInfoDetails: null,
      BINWLModal: false,
      binloading: false,
      CRNmodalInfo: {},
      Crnloading: false,
      CrnNo: null,
      CRNModal: false,
      Process_Legend_Dic: {},
      BINInfo: [
        { id: "binNo", name: "库位编号" },
        //{ id: 'extBinNo', name: '外部库位编号' },
        { id: "binName", name: "库位描述" },
        // { id: 'regionName', name: '库区' },
        { id: "binTypeName", name: "库位类型" },
        { id: "binStatusDesc", name: "库位状态" },
        { id: "binErrFlagDesc", name: "异常标识" },
        { id: "binUsedFlagName", name: "启用标识" },

        // { id: 'balanceStatusName', name: '库位状态' },
        // { id: 'useStatus', name: '使用状态' },
        // { id: 'craftName', name: '工艺名称' },
        // { id: 'processName', name: '工序' },
        // { id: 'trayGroupCode', name: '托盘组码' },
        // { id: 'craftTimeLength', name: '工艺时长' },
        // { id: 'inTime', name: '入库时间' },
        // { id: 'outTime', name: '预计出库时间' },
        // { id: 'inTimeLen', name: '在库时长' },
        // { id: 'timeLeft', name: '出库倒计时' }
      ],
      CranTaskInfo: [
        { id: "partNo", name: "货叉编号" },
        { id: "partName", name: "货叉名称" },
        { id: "taskNo", name: "任务编号" },
        { id: "activeTypeName", name: "动作类型" },
        { id: "cmdNo", name: "指令编号" },
        { id: "cmdStatusName", name: "指令状态" },
        { id: "cmdTypeName", name: "指令类型" },
        { id: "trayBarcode", name: "托盘条码" },
        { id: "trayLoadTypeName", name: "托盘状态" },
        { id: "startBinNo", name: "起始库位" },
        { id: "startLocationName", name: "起始站台" },
        { id: "endBinNo", name: "目标库位" },
        { id: "endLocationName", name: "目标站台" },
        { id: "cmdLog", name: "指令信息" },
      ],
      svgIcon: {
        warning: {
          d: "M939.3 775.2L589.7 169.8c-42.7-74-112.6-74-155.4 0L84.8 775.2C42 849.3 77 909.7 162.4 909.7h699.2c85.4 0 120.4-60.4 77.7-134.5z m-384 0.8c-9.3 9.1-20 14.6-31.9 16.7-3.8 0.2-7.5 0.3-11.4 0.3s-7.6-0.1-11.4-0.3c-12-2.1-22.6-7.7-31.9-16.7-12.1-11.9-18.1-26.1-18.1-43 0-16.7 6-31.2 18.1-43.3 12.1-12.1 26.6-18.2 43.3-18.2 16.7 0 31.2 6.1 43.3 18.2 12.1 12.1 18.1 26.6 18.1 43.3 0.1 16.8-5.9 31.2-18.1 43z m-13.9-141.3h-57.7c-7-85.4-33-202.8-33-218.8 0-18.3 5.7-33.7 17.2-46.1 11.6-12.5 26.2-18.8 44.2-18.8 17.9 0 32.6 6.2 44.2 18.5 11.5 12.4 17.2 27.8 17.2 46.4 0 16-24 133.4-32.1 218.8z",
        },
        checked: {
          d: "M787.692308 0a236.307692 236.307692 0 0 1 236.307692 236.307692v551.384616a236.307692 236.307692 0 0 1-236.307692 236.307692H236.307692a236.307692 236.307692 0 0 1-236.307692-236.307692V236.307692a236.307692 236.307692 0 0 1 236.307692-236.307692h551.384616z m67.938461 207.005538c-18.904615-15.556923-39.620923-13.036308-54.311384 7.010462l-371.2 412.514462-202.988308-198.892308-3.623385-4.332308c-15.36-15.990154-35.918769-14.493538-53.287384 0-18.825846 15.753846-14.887385 36.588308 0 56.516923l195.544615 272.935385 4.647385 5.710769c30.523077 34.697846 81.565538 39.345231 117.326769 9.452308 5.513846-4.647385 10.476308-9.964308 14.808615-15.872l350.011077-487.463385 3.072-4.765538c11.027692-19.692308 17.526154-38.439385 0-52.775385z",
        },
        extinguisher: {
          d: "M793.088 307.2v-10.24a5.12 5.12 0 0 0-5.632-5.12h-5.632a184.832 184.832 0 0 0-77.824-158.72 181.248 181.248 0 0 0-105.472-36.352 12.8 12.8 0 0 1-7.168-4.096 9.728 9.728 0 0 0-10.24-9.216h-31.744a60.416 60.416 0 0 0-51.2-28.672 61.952 61.952 0 0 0-45.056 18.944c-29.184 0-139.264 0-220.16-3.072-12.8 0-12.8 0-19.456 6.144a40.96 40.96 0 0 0 0 35.84 11.264 11.264 0 0 0 7.68 3.072A744.448 744.448 0 0 1 398.848 102.4c4.096 0 8.704 5.632 0 10.24-26.112 15.36-106.496 41.984-134.656 51.2a19.968 19.968 0 0 0-12.288 12.288 108.032 108.032 0 0 0 0 22.528 9.728 9.728 0 0 0 13.824 7.68 879.104 879.104 0 0 1 157.184-71.68 43.008 43.008 0 0 1 19.456 0v107.52a144.896 144.896 0 0 0-140.8 138.752v554.496c0 27.136 6.144 36.864 24.064 36.864h349.696c17.92 0 24.064-9.728 24.064-36.864V387.584v-3.072a145.92 145.92 0 0 0-145.408-138.752v-102.4h28.16a9.728 9.728 0 0 0 10.24-9.216s4.608-5.12 6.656-5.12a146.432 146.432 0 0 1 83.456 24.576 153.6 153.6 0 0 1 68.608 135.68h-4.096a5.12 5.12 0 0 0-5.632 5.12V307.2a51.2 51.2 0 0 0-28.672 44.032v135.68a5.12 5.12 0 0 0 5.632 5.12H819.2a5.12 5.12 0 0 0 5.12-5.12V350.208a51.2 51.2 0 0 0-31.232-43.008z",
        },
        heartBreak: {
          d: "M317.103 429.404c11.571-11.54 30.262-11.654 41.966-0.256l237.208 231.007c11.946 11.637 12.058 30.801 0.247 42.582l-95.872 95.626c-77.416 77.416-192.408 92.605-270.707 38.009L120.038 946.246c-11.676 11.672-30.606 11.672-42.281 0-11.49-11.487-11.673-29.998-0.547-41.708l0.547-0.562 109.67-109.64c-55.967-78.326-41.111-194.39 36.848-272.35z m21.35 63.133l-71.916 71.723-1.883 1.912c-61.82 63.543-67.918 156.28-16.193 208.005 52.247 52.247 146.34 45.498 209.949-18.11l74.42-74.23-194.377-189.3z m613.79-422.783c11.49 11.487 11.673 29.998 0.547 41.708l-0.547 0.562-109.11 109.084c57.203 78.339 42.65 195.365-35.795 273.81L714.51 587.5c-11.57 11.54-30.261 11.655-41.966 0.256L626.8 543.208l-18.078 18.075c-11.676 11.673-30.606 11.673-42.281 0-11.49-11.487-11.673-29.998-0.548-41.708l0.548-0.561 17.524-17.521-61.698-60.085-20.092 20.087c-11.675 11.672-30.605 11.672-42.28 0-11.49-11.487-11.673-29.998-0.548-41.708l0.547-0.562 19.538-19.532-44.096-42.943c-11.826-11.52-12.054-30.42-0.598-42.227l0.351-0.355 95.872-95.626c76.927-76.927 190.955-92.411 269.218-39.036L909.962 69.754c11.676-11.672 30.606-11.672 42.281 0z m-169.09 172.973c-52.248-52.247-146.34-45.498-209.95 18.111l-74.42 74.231 194.377 189.3 71.937-71.748 1.862-1.889c61.82-63.543 67.918-156.28 16.193-208.005z",
        },
        disable: {
          d: "M149.937502 873.952787a511.981715 511.981715 0 1 1 724.088426 0 511.981715 511.981715 0 0 1-724.088426 0z m103.420307-620.594978a365.701225 365.701225 0 0 0-46.517196 460.271561l506.788757-506.788757a365.701225 365.701225 0 0 0-460.271561 46.517196z m563.691868 56.97625l-506.715618 506.715618a365.701225 365.701225 0 0 0 506.715618-506.715618z",
        },
        lock: {
          d: "M800.421 436.525h-63.661v-148.673c0-124.507-100.762-225.757-224.732-225.757-123.98 0-224.857 101.25-224.857 225.766v148.662h-63.593c-30.667 0-55.532 24.952-55.532 55.752v407.048c0 30.848 24.865 55.82 55.532 55.82h576.9c30.667 0 55.465-24.97 55.465-55.82v-407.048c0-30.802-24.855-55.752-55.532-55.752zM543.203 706.409v88.88c-0.016 4.026-3.264 7.287-7.282 7.325h-47.733c-4.039-0.022-7.307-3.287-7.334-7.322v-88.882c-22.423-11.518-37.953-34.602-37.953-61.659 0-38.288 30.945-69.425 69.070-69.425 38.183 0 69.138 31.136 69.138 69.415 0.057 27.067-15.473 50.152-37.905 61.659zM650.514 436.525h-276.989v-144.986c0-76.691 62.196-139.146 138.552-139.146 76.366 0 138.447 62.454 138.447 139.146v144.986z",
        },
        fire: {
          d: "M511.8194 43.705115c0 0-631.015168 705.783422-54.541093 927.198589 220.692769 84.881834 343.13933-116.306173 382.510053-272.705467C895.77425 474.615873 504.956614 346.390123 511.8194 43.705115zM684.833862 825.701587c-19.504762 78.019048-80.908642 178.793651-191.074427 136.172134-288.237037-110.526984 27.451146-463.418695 27.451146-463.418695C517.23739 649.797531 713.007407 714.091005 684.833862 825.701587z",
        },
        equipment: {
          d: "M877.312 286.72a32.416 32.416 0 0 0-45.344 0.48l-95.264 95.2c-21.696 21.376-56.544 21.248-85.824-8.064-29.312-29.312-29.376-64.64-8.256-85.76l95.072-95.04c12.928-12.896 12.16-33.568 0.448-45.28a29.632 29.632 0 0 0-11.328-7.072 254.688 254.688 0 0 0-327.264 312.416 1.152 1.152 0 0 1-0.448 1.28l-206.08 156.16a390.72 390.72 0 0 0-15.872 12.544c-62.176 62.176-69.76 155.328 0 225.12 69.792 69.792 162.688 61.888 224.832-0.256l1.792-2.08c18.88-23.168 167.552-219.744 167.552-219.744a1.088 1.088 0 0 1 1.184-0.384 254.656 254.656 0 0 0 311.776-328.256 29.024 29.024 0 0 0-6.976-11.232z m-43.008 88.64a191.68 191.68 0 0 1-55.68 141.216 190.464 190.464 0 0 1-187.904 48.32l-43.744-12.192-191.936 252.16c-27.424 36.8-85.344 48.512-133.952-0.096-46.944-46.944-37.504-102.528-4-131.232l256.32-195.488-12.448-42.464a190.4 190.4 0 0 1 48.128-188.384 189.28 189.28 0 0 1 140.352-55.904L597.44 243.296a115.296 115.296 0 0 0-33.408 89.408c2.144 31.808 16.544 61.824 41.6 86.88 52.224 52.192 127.872 55.808 176.352 8.064l52.352-52.288zM288 784a48 48 0 1 0 0-96 48 48 0 0 0 0 96z",
        },
      },
      mouseoverNodeTimeOut: null,
      BinTipsInfo: {
        binNo: "",
      },
    };
  },
  computed: {},
  watch: {
    BinSearchModal(val) {
      if (!val) {
        this.selectionBoxHaveChecked = {};
        this.selectionBoxHaveCheckedCompute = [];
      }
    },
  },
  beforeDestroy() {
    if (Object.keys(this.CRNTimeLine).length !== 0) {
      for (const key in this.CRNTimeLine) {
        this.CRNTimeLine[key].clear();
      }
    }
  },
  methods: {
    zoom() {
      this.$nextTick(() => {
        const h = this.$refs.dialog.getBox().clientHeight;
        this.tableHeight = h - 80;
      });
    },
    TimeStamp(time) {
      var day = parseInt(time / 60 / 24);
      var hour = parseInt((time / 60) % 24);
      var min = parseInt(time % 60);
      var timeN = "";
      if (day > 0) {
        timeN = day + "天";
      }
      if (hour > 0) {
        timeN += hour + "小时";
      }
      if (min >= 0) {
        timeN += min + "分钟";
      }
      return time === "" ? "0分钟" : timeN;
    },
    // 鼠标滑过node
    mouseoverNode(id, event) {
      this.mouseoverNodeTimeOut = setTimeout(() => {
        if (
          typeof this.binSetList[id] !== "undefined" &&
          id !== "col" &&
          id !== "row"
        ) {
          this.BinTipsInfo.binNo = this.binSetList[id];
          this.showTips = true;
          const doc = document.getElementById("myTips");
          doc.style.top = event.clientY - doc.offsetTop - 85 + "px";
          doc.style.left = event.clientX - 200 + "px";
        }
      }, 200);
    },
    // 鼠标划出左侧箭头时，将connectingLine.endNode再次初始化
    mouseoutNode(event) {
      clearTimeout(this.mouseoverNodeTimeOut);
      this.showTips = false;
    },
    hoverStyle(id) {
      this.HoverBinNo = id;
    },
    hoverOutStyle(id) {
      this.HoverBinNo = null;
    },
    deleteBinSearchList(id) {
      this.selectionBoxHaveChecked[id] = false;
      this.ComputeselectionBoxHaveChecked();
    },
    BinChangeSelectSubmit() {
      if (this.BinChangeSelect === null) {
        return this.$message.warning("请选择要转换的库位状态");
      }
      const items = this.selectionBoxHaveCheckedCompute.map(
        (ele) => this.binSetList[ele]
      );
      // this.$loadingOpen()
      // this.$http.post(this.$mot + '/binMot/batchSetBinStatus', {
      //   'items': items,
      //   'value': this.BinChangeSelect,
      //   'lockMsg': ''
      // }).then(() => {
      //   this.BinSearchModal = false
      // }).finally(() => {
      //   // this.$loadingClose()
      // })
      let params = {
        items: items,
        value: this.BinChangeSelect,
        lockMsg: "",
      };
      mainAPI.batchSetBinStatus(params).then((res) => {
        if (res.code === 200 || res.code === 0) {
          this.BinSearchModal = false;

          this.$message.success(res.message);
        } else {
          this.BinSearchModal = false;
          this.$message.error(res.message);
        }
      });
    },
    BinSearchFormSubmit() {
      // this.$http.get(this.$mot + '/binMot/binNoListByFilter', { params:
      //  {
      //    'RoadwayNo': this.regionGroupNo,
      //    'BinNo': this.BinSearchchecked.BinNo ? this.BinSearchForm.BinNo : '',
      //    //  'CraftNo': this.BinSearchchecked.CraftNo ? this.BinSearchForm.CraftNo : '',
      //    //  'ProcessNo': this.BinSearchchecked.ProcessNo ? this.BinSearchForm.ProcessNo : '',
      //    'TrayBarCode': this.BinSearchchecked.TrayBarCode ? this.BinSearchForm.TrayBarCode : ''
      //    //  StaticFrom: this.BinSearchchecked.StaticFrom ? this.BinSearchForm.StaticFrom : '',
      //    //  StaticTo: this.BinSearchchecked.StaticFrom ? this.BinSearchForm.StaticTo : ''
      //  }
      // }).then(res => {
      //   this.selectionBoxHaveChecked = {}
      //   res.forEach(node => { this.selectionBoxHaveChecked[node] = true })
      //   this.ComputeselectionBoxHaveChecked()
      // })
      let params = {
        RoadwayNo: this.regionGroupNo,
        BinNo: this.BinSearchchecked.BinNo ? this.BinSearchForm.BinNo : "",
        TrayBarCode: this.BinSearchchecked.TrayBarCode
          ? this.BinSearchForm.TrayBarCode
          : "",
      };
      mainAPI.getBinNoListByFilter(params).then((res) => {
        this.selectionBoxHaveChecked = {};
        res.data.forEach((node) => {
          this.selectionBoxHaveChecked[node] = true;
        });
        this.ComputeselectionBoxHaveChecked();
      });
    },
    ShowShowBinsearch() {
      this.BinSearchModal = !this.BinSearchModal;
      // this.$httpLms.get('/option/versionCraft').then(res => { this.Craftoptions = res.items })
      // debugger
      // this.$http.get(this.$mot + '/binMot/binUsedStatus').then(res => { this.BinSelectOption = res.items })
      mainAPI.getBinUsedStatus().then((res) => {
        this.BinSelectOption = res.data.items;
      });
    },
    RegionCheck(Pos, type) {
      if (!this.BinSearchModal) {
        return;
      }
      switch (type) {
        case "mousedown":
          this.selectionStartPoint = Pos;
          this.selectionStartW = 0;
          this.selectionStartW = 0;
          this.selectionBox.x = Pos.x;
          this.selectionBox.y = Pos.y;
          this.selectionBox.isShow = true;
          break;
        case "mousemove":
          if (this.selectionBox.isShow) {
            if (Pos.x - this.selectionStartPoint.x <= 0) {
              this.selectionBox.x = Pos.x;
            } else {
              // this.selectionBox.x = this.selectionStartPoint.x
            }
            if (Pos.y - this.selectionStartPoint.y <= 0) {
              this.selectionBox.y = Pos.y;
            } else {
              // this.selectionBox.y = Pos.y
            }
            this.selectionBox.width = Math.abs(
              Pos.x - this.selectionStartPoint.x
            );
            this.selectionBox.height = Math.abs(
              Pos.y - this.selectionStartPoint.y
            );
          }
          break;
        case "mouseup":
          this.ComputeCheckedBin(Pos);
          this.selectionBox = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            isShow: false,
          };
          break;
        default:
          break;
      }
    },
    ComputeCheckedBin(EndP) {
      let that = this;
      let selectionBoxObj = this.selectionBox;
      let sW = selectionBoxObj.width;
      let sH = selectionBoxObj.height;
      let sX = selectionBoxObj.x;
      let sY = selectionBoxObj.y;
      this.svgNodes.forEach((node, key) => {
        if (node.type === "B") {
          if (
            sX <= node.x &&
            sY <= node.y &&
            node.x + node.width <= sX + sW &&
            node.y + node.height <= sY + sH
          ) {
            that.selectionBoxHaveChecked[node.id] =
              that.ModeChangePickMode === 0;
          }
        }
      });
      this.ComputeselectionBoxHaveChecked();
    },
    ComputeselectionBoxHaveChecked() {
      let selectionBoxHaveChecked = [];
      for (const key in this.selectionBoxHaveChecked) {
        if (Object.hasOwnProperty.call(this.selectionBoxHaveChecked, key)) {
          if (this.selectionBoxHaveChecked[key]) {
            selectionBoxHaveChecked.push(key);
          }
        }
      }
      this.selectionBoxHaveCheckedCompute = selectionBoxHaveChecked;
    },
    BinChildPageBack() {},

    ShowCrnDetails(id) {
      this.CrnNo = id;
    },
    ShowBinDetails(event, id) {
      debugger;
      this.modelPos = {
        top: event.offsetY,
        left: event.offsetX,
      };
      let binNo = this.binSetList[id];
      this.GetBinInfo("WL", binNo);
      this.BINWLModal = true;
      this.$refs.BINWLModal.updatePosition(this.modelPos);
    },
    GetBinInfo(type, no) {
      this.BinInfoDetails = null;
      this.binloading = true;
      // this.$http.get(this.$mot + '/binMot/binTrayInfo', { params: { binNo: no } }).then(res => {
      //   this.BinInfoDetails = res.body
      //   this.BinInfoDetails['binNo'] = no
      //   this.binloading = false
      // })
      mainAPI.getBinTrayInfo({ binNo: no }).then((res) => {
        if (res.code === 200 || res.code === 0) {
          this.BinInfoDetails = res.data;
          this.BinInfoDetails["binNo"] = no;
          this.binloading = false;
        }
      });
    },
    registerSvgPanZoom(svgpanzoom) {
      this.svgpanzoom = svgpanzoom;
    },
    center() {
      if (!this.svgpanzoom) return;
      this.svgpanzoom.resize();
    },
    BasicStateStroke(state) {
      switch (state) {
        case "0":
          return "#D1D1D1";
        default:
          return "#000000";
      }
    },
    BasicStateColor(nodeState) {
      const state = nodeState[0];
      const usestate = nodeState[1];
      const specialstate = nodeState[3];
      if (usestate === "0") {
        return "#000000";
      }
      if (specialstate === "1") {
        return "#FF0000";
      } else if (specialstate === "2") {
        return "#F7931E";
      }
      switch (state) {
        case "0":
          return "#D1D1D1";
        case "1":
          return "#FF00FF";
        case "2":
          return "#39B54A";
        case "3":
          return "#97FFFF";
        case "4":
          return "#FF9933";
        // case '6':return '#FF00FF'
        // case '7':return '#97FFFF'
        default:
          return "#fff";
      }
    },
    ProductStateColor(node) {
      const usestate = node[7];
      const specialstate = node[1];
      const crf = node[2];
      const process = node[3];

      if (usestate === "0") {
        return "#000000";
      }

      if (specialstate === "1") {
        return "#FF0000";
      } else if (specialstate === "2") {
        return "#F7931E";
      }
      if (process) {
        return this.processLegendDic[`${crf}:${process}`];
      }
      if (usestate === "0") {
        return "#000000";
      } else if (specialstate === "4") {
        return "#F7931E";
      } else if (specialstate === "5") {
        return "#FF0000";
      } else {
        return "#D1D1D1";
      }
    },
    ZZStateStroke(state, ele) {
      // console.log(ele, state)
      switch (state) {
        case "1":
          return "#D1D1D1";
        case "2":
          return "#0033FF";
        case "3":
          return "#FF00FF";
        case "4":
          return "#C69C6D";
        case "5":
          return "#009245";
        case "6":
          return "#FF0000";
        default:
          return "#D1D1D1";
      }
    },
    HCStateColor(statein, stateout, usestate, specialstate) {
      if (usestate === "4") {
        return "#000000";
      }
      if (specialstate === "1") {
        return "#FF0000";
      } else if (specialstate === "2") {
        return "#F7931E";
      } else if (specialstate === "4") {
        return "#F7931E";
      } else if (specialstate === "5") {
        return "#FF0000";
      }
      switch (statein) {
        case "1":
          return "#FFEB3B";
        case "2":
          return "#CCCCFF";
        case "3":
          return "#97FFFF";
        case "4":
          return "#99FFCC";
        case "5":
          return "#B2DFDB";
      }
      switch (stateout) {
        case "1":
          return "#F7931E";
        case "2":
          return "#BC83FF";
        case "3":
          return "#29ABE2";
        case "4":
          return "#009900";
        default:
          return "#D1D1D1";
      }
    },
    CRNstateColor(state) {
      switch (state) {
        case "1":
          return "#00FF00";
        case "2":
          return "#29ABE2";
        case "4":
          return "#ED1C24";
        case "5":
          return "#C6C6C6";
        case "3":
          return "#FEE232";
        default:
          return "#fff";
      }
    },
    routToLoadDtl(TrayBarcode, trayCode) {
      this.trayBarcode = TrayBarcode;
      this.trayCode = trayCode;
      this.$nextTick(() => {
        this.trayInfodialog = true;
      });
      // 跳转时页面
      // this.$router.push({
      //   name: 'BizLoadDtl',
      //   params: {
      //     trayBarcode: TrayBarcode
      //   }
      // })
    },
  },
};
</script>

<style scoped>
.st0 {
  fill: #b7bcc4;
}
.st1 {
  fill: #c7d5ea;
}
.st2 {
  fill: #ffffff;
}

.CRNst0 {
  stroke: #000000;
  stroke-width: 0.7293;
  stroke-miterlimit: 10;
}
.CRNst1 {
  fill: #ffffff;
  stroke: #7c7c7c;
  stroke-width: 0.7293;
  stroke-miterlimit: 10;
}
.CRNst2 {
  fill: #f9ffe3;
  stroke: #7c7c7c;
  stroke-width: 0.7293;
  stroke-miterlimit: 10;
}
.CRNst3 {
  fill: #fff7f5;
  stroke: #727272;
  stroke-width: 0.7293;
  stroke-miterlimit: 10;
}
.CRNst4 {
  fill: #4caf50;
  stroke: #000000;
  stroke-width: 1;
  stroke-miterlimit: 10;
}
.CRNs {
  cursor: pointer;
}
.nodesG {
  -webkit-user-select: none;
  user-select: none;
  -moz-select: none;
  -ms-select: none;
  -o-select: none;
}
.nodesG.isSelect .reactClass {
  /* filter: url(#f1); */
  fill: #fffcd1;
  stroke: #e8dc00;
}
.HoverBin .reactClassHoverBinNo {
  fill: #ff9800;
  stroke: #ff9800;
}
.reactClassHoverBinNo {
  fill: #2196f3;
  stroke: #2196f3;
}
.reactClassLe {
  stroke-width: 2;
}
.reactClassBranch {
  visibility: hidden;
}
.nodesG.isSelect .reactClassBranch {
  visibility: visible;
  /* filter: url(#f1); */
  fill: #fffcd1;
  stroke: #e8dc00;
}
.reactClassFor {
  text-align: center;
  visibility: hidden;
}
.nodesG .nodeImg {
  -webkit-user-select: none;
  user-select: none;
  -moz-select: none;
  -ms-select: none;
  -o-select: none;
}
.nodesG .nodeName {
  -webkit-user-select: none;
  user-select: none;
}
.nodesG .reactClassBIN {
  stroke-width: 1.5;
  cursor: pointer;
}
.nodesG .Titleclass {
  stroke-width: 2;
  stroke: #a9ccff;
  fill: #fff;
  cursor: default;
}
.nodesG:hover {
  filter: url(#f1);
}
.InfoCard {
  margin-bottom: 10px;
}
.CrnRowCol {
  height: 64px;
  width: 58px;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  position: relative;
  text-align: center;
}
.CrnRowCol .rowcol {
  font-size: 28px;
  font-weight: bold;
}
.CrnRowCol .tagss {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  border-top: 1px solid #d1d1d1;
}
.CrnDetails ul {
  width: 500px;
}
.CrnDetails li {
  width: 200px; /*如果显示三列 则width改为70px*/
  float: left;
  display: block;
}

.tabCrad {
  width: 100%;
  display: flex;
}
.tabItem {
  width: 50%;
  text-align: center;
  background: #fff;
  padding: 6px 0;
  cursor: pointer;
}
.TabChecked {
  background: #9baec5;
  color: #fff;
}

.ModeChangePick {
  width: 100%;
  display: flex;
  margin: 15px 0;
  justify-content: center;
}
.ModeChangePickItem {
  width: 80px;
  text-align: center;
  background: #fff;
  padding: 16px 0;
  cursor: pointer;
  margin: 0 10px;
  border: 3px solid transparent;
}
.ModeChangePickChecked {
  border: 3px solid #9baec5;
}
.bin-list-item {
  border: 1px solid #cacaca;
  margin: 5px 0;
  cursor: pointer;
  padding: 0 14px;
  background: #fff;
  line-height: 28px;
  display: flex;
  justify-content: space-between;
}
.bin-list-item:hover {
  background: #00bcd4;
  color: #fff;
}
.TrayList {
  background: #f0f9ff;
  border: 2px dashed #2196f3;
  padding: 3px 14px;
  margin-top: 10px;
}
.mTips {
  position: fixed;
  padding: 8px 12px;
  color: #fff;
  border-radius: 5px;
  font-family: "微软雅黑";
  z-index: 999;
  font-size: 14px;
  pointer-events: none;
  z-index: 1070;
  line-height: 1.42857143;
}

.mTips-default {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
}
</style>
<style>
#SvgArea .vxe-modal--body {
  background: #f2f2f2 !important;
}
.CheckedBinlist .vxe-modal--close-btn {
  display: none;
}
</style>
