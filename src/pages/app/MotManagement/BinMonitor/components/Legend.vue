<template>
  <section class="" style="margin: 0 10px 7px;">
    <template v-if="mode==='物流模式'">
      <div style="display: grid;">
        <div class="LegendDiv">
          库位状态
        </div>
        <ul class="LegendList">
          <li v-for="item in legend_WL_Bin"
              :key="item.id"
              class="binstatus">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
              <rect x="0"
                    y="0"
                    rx="2"
                    ry="2"
                    :fill="item.color"
                    :stroke="BasicStateStrokeZT(item.id)"
                    width="20"
                    height="20"
                    stroke-width="2px"
                    class="reactClassLe" />
            </svg>
            <span class="LegTitleName">{{ item.label+'('+(legendQty[item.id]? legendQty[item.id]:'0')+')' }}</span>
          </li>
        </ul>
      </div>

    </template>
    <template v-else-if="mode==='化成分容模式'">
      <div style="display: grid;">
        <div class="LegendDiv">
          入库状态
        </div>
        <ul class="LegendList">
          <li v-for="item in legend_HC_ECSin"
              :key="item.id"
              class="binstatus">
            <svg version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 width="22"
                 height="22">
              <rect x="0"
                    y="0"
                    rx="2"
                    ry="2"
                    :fill="item.color"
                    :width="20"
                    :height="20"
                    class="reactClassLe" />
            </svg>
            <span class="LegTitleName">{{ item.label+'('+(legendQty.In[item.id]? legendQty.In[item.id]:'0')+')' }}</span>
          </li>
        </ul>
      </div>
      <div style="display: grid;">
        <div class="LegendDiv">
          出库状态
        </div>
        <ul class="LegendList">
          <li v-for="item in legend_HC_ECSout"
              :key="item.id"
              class="binstatus">
            <svg version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 width="22"
                 height="22">
              <rect x="0"
                    y="0"
                    rx="2"
                    ry="2"
                    :fill="item.color"
                    :width="20"
                    :height="20"
                    class="reactClassLe" />
            </svg>
            <span class="LegTitleName">{{ item.label+'('+(legendQty.Out[item.id]? legendQty.Out[item.id]:'0')+')' }}</span>
          </li>
        </ul>
      </div>
    </template>
    <template v-else-if="mode==='生产模式'">
      <div style="display: grid;">
        <div class="LegendDiv">
          静置状态
        </div>
        <ul class="LegendList">
          <li v-for="item in legend_SC_Bin"
              :key="item.id"
              class="binstatus">
            <svg version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 width="22"
                 height="22">
              <rect x="0"
                    y="0"
                    rx="2"
                    ry="2"
                    fill="none"
                    :stroke="item.color"
                    :width="20"
                    :height="20"
                    stroke-width="3px"
                    class="reactClassLe" />
              <svg v-if="item.id==6"
                   x="3"
                   y="3"
                   viewBox="0 0 1024 1024"
                   version="1.1"
                   xmlns="http://www.w3.org/2000/svg"
                   width="10"
                   height="10">
                <path d="M939.3 775.2L589.7 169.8c-42.7-74-112.6-74-155.4 0L84.8 775.2C42 849.3 77 909.7 162.4 909.7h699.2c85.4 0 120.4-60.4 77.7-134.5z m-384 0.8c-9.3 9.1-20 14.6-31.9 16.7-3.8 0.2-7.5 0.3-11.4 0.3s-7.6-0.1-11.4-0.3c-12-2.1-22.6-7.7-31.9-16.7-12.1-11.9-18.1-26.1-18.1-43 0-16.7 6-31.2 18.1-43.3 12.1-12.1 26.6-18.2 43.3-18.2 16.7 0 31.2 6.1 43.3 18.2 12.1 12.1 18.1 26.6 18.1 43.3 0.1 16.8-5.9 31.2-18.1 43z m-13.9-141.3h-57.7c-7-85.4-33-202.8-33-218.8 0-18.3 5.7-33.7 17.2-46.1 11.6-12.5 26.2-18.8 44.2-18.8 17.9 0 32.6 6.2 44.2 18.5 11.5 12.4 17.2 27.8 17.2 46.4 0 16-24 133.4-32.1 218.8z"
                      fill="#d81e06" />
              </svg>
            </svg>
            <span class="LegTitleName">{{ item.label+'('+(legendQty[item.id]? legendQty[item.id]:'0')+')' }}</span>
          </li>
        </ul>
      </div>
      <div style="display: grid;">
        <div class="LegendDiv">
          工艺信息
        </div>
        <ul v-if="scmode.Craft_Legend" class="LegendList">
          <li v-for="(value,key,index) in scmode.Craft_Legend"
              :key="index"
              class="binstatus">
            <span class="LegTitleName"><a style="font-size: 20px;">{{ key }}:</a> {{ value.craftName }}</span>
            <span>({{ value.count }})</span>
          </li>
        </ul>
      </div>
      <div style="display: grid;">
        <div class="LegendDiv">
          工序信息
        </div>
        <ul v-if="scmode.Process_Legend" class="LegendList">
          <li v-for="(value,key,index) in scmode.Process_Legend"
              :key="index"
              class="binstatus"
          >
            <svg version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 width="22"
                 height="22">
              <rect x="0"
                    y="0"
                    rx="2"
                    ry="2"
                    :fill="scmode.Process_Legend_Dic[key]"
                    :width="20"
                    :height="20"
                    class="reactClassLe" />
            </svg>

            <span class="LegTitleName">{{ key }}</span>
            <span>({{ value[2] }})</span>
          </li>
        </ul>
      </div>
    </template>
    <div style="display: grid;">
      <div class="LegendDiv">
        使用状态
      </div>
      <ul class="LegendList">
        <li v-for="item in legend_WL_Use"
            :key="item.id"
            class="usestatus">
          <svg version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               width="22"
               height="22">
            <rect x="0"
                  y="0"
                  rx="2"
                  ry="2"
                  :fill="item.color"
                  :width="20"
                  :height="20"
                  class="reactClassLe" />
            <svg v-if="item.id===0"
                 x="3"
                 y="3"
                 viewBox="0 0 1024 1024"
                 version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 width="14"
                 height="14">

              <path d="M149.937502 873.952787a511.981715 511.981715 0 1 1 724.088426 0 511.981715 511.981715 0 0 1-724.088426 0z m103.420307-620.594978a365.701225 365.701225 0 0 0-46.517196 460.271561l506.788757-506.788757a365.701225 365.701225 0 0 0-460.271561 46.517196z m563.691868 56.97625l-506.715618 506.715618a365.701225 365.701225 0 0 0 506.715618-506.715618z"
                    fill="#fff" />
            </svg>
            <polygon v-else-if="item.id===1"
                     points="10 0,20 0,20 10"
                     fill="#ED1E79"
                     stroke="#000000"
                     stroke-width="0" />
            <polygon v-else-if="item.id===2"
                     points="10 0,20 0,20 10"
                     fill="#0000FF"
                     stroke="#000000"
                     stroke-width="0" />
          </svg>
          <span class="LegTitleName">{{ item.label }}</span>
        </li>
      </ul>
    </div>
    <div v-if="legend_WL_Type.length>0" style="display: grid;">
      <div class="LegendDiv">
        库位类型
      </div>
      <ul class="LegendList">
        <li v-for="item in legend_WL_Type"
            :key="item.id"
            class="typestatus">
          <svg version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               width="22"
               height="22">
            <rect x="0"
                  y="0"
                  rx="2"
                  ry="2"
                  :fill="item.color"
                  :width="20"
                  :height="20"
                  class="reactClassLe" />
            <text v-if="item.id==1"
                  font-weight="bold"
                  x="4"
                  y="14"
                  stroke="#000"
                  xml:space="preserve"
                  text-anchor="start"
                  font-family="Junction, sans-serif"
                  font-size="9"
                  stroke-width="0"
                  fill="#000000">IN</text>
            <text v-if="item.id==2"
                  font-weight="bold"
                  x="0"
                  y="14"
                  stroke="#000"
                  xml:space="preserve"
                  text-anchor="start"
                  font-family="Junction, sans-serif"
                  font-size="9"
                  stroke-width="0"
                  fill="#000000">OUT</text>
            <svg v-if="item.id==3"
                 x="2"
                 y="2"
                 viewBox="0 0 1024 1024"
                 version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 width="17"
                 height="17">
              <path d="M877.312 286.72a32.416 32.416 0 0 0-45.344 0.48l-95.264 95.2c-21.696 21.376-56.544 21.248-85.824-8.064-29.312-29.312-29.376-64.64-8.256-85.76l95.072-95.04c12.928-12.896 12.16-33.568 0.448-45.28a29.632 29.632 0 0 0-11.328-7.072 254.688 254.688 0 0 0-327.264 312.416 1.152 1.152 0 0 1-0.448 1.28l-206.08 156.16a390.72 390.72 0 0 0-15.872 12.544c-62.176 62.176-69.76 155.328 0 225.12 69.792 69.792 162.688 61.888 224.832-0.256l1.792-2.08c18.88-23.168 167.552-219.744 167.552-219.744a1.088 1.088 0 0 1 1.184-0.384 254.656 254.656 0 0 0 311.776-328.256 29.024 29.024 0 0 0-6.976-11.232z m-43.008 88.64a191.68 191.68 0 0 1-55.68 141.216 190.464 190.464 0 0 1-187.904 48.32l-43.744-12.192-191.936 252.16c-27.424 36.8-85.344 48.512-133.952-0.096-46.944-46.944-37.504-102.528-4-131.232l256.32-195.488-12.448-42.464a190.4 190.4 0 0 1 48.128-188.384 189.28 189.28 0 0 1 140.352-55.904L597.44 243.296a115.296 115.296 0 0 0-33.408 89.408c2.144 31.808 16.544 61.824 41.6 86.88 52.224 52.192 127.872 55.808 176.352 8.064l52.352-52.288zM288 784a48 48 0 1 0 0-96 48 48 0 0 0 0 96z" />
            </svg>
            <svg v-if="item.id===8"
                 x="2"
                 y="2"
                 viewBox="0 0 1024 1024"
                 version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 width="16"
                 height="16">
              <path fill="#fff"
                    d="M800.421 436.525h-63.661v-148.673c0-124.507-100.762-225.757-224.732-225.757-123.98 0-224.857 101.25-224.857 225.766v148.662h-63.593c-30.667 0-55.532 24.952-55.532 55.752v407.048c0 30.848 24.865 55.82 55.532 55.82h576.9c30.667 0 55.465-24.97 55.465-55.82v-407.048c0-30.802-24.855-55.752-55.532-55.752zM543.203 706.409v88.88c-0.016 4.026-3.264 7.287-7.282 7.325h-47.733c-4.039-0.022-7.307-3.287-7.334-7.322v-88.882c-22.423-11.518-37.953-34.602-37.953-61.659 0-38.288 30.945-69.425 69.070-69.425 38.183 0 69.138 31.136 69.138 69.415 0.057 27.067-15.473 50.152-37.905 61.659zM650.514 436.525h-276.989v-144.986c0-76.691 62.196-139.146 138.552-139.146 76.366 0 138.447 62.454 138.447 139.146v144.986z" />
            </svg>

            <svg v-if="item.id===9"
                 x="1"
                 y="1"
                 viewBox="0 0 1024 1024"
                 version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 width="18"
                 height="18">
              <path d="M511.8194 43.705115c0 0-631.015168 705.783422-54.541093 927.198589 220.692769 84.881834 343.13933-116.306173 382.510053-272.705467C895.77425 474.615873 504.956614 346.390123 511.8194 43.705115zM684.833862 825.701587c-19.504762 78.019048-80.908642 178.793651-191.074427 136.172134-288.237037-110.526984 27.451146-463.418695 27.451146-463.418695C517.23739 649.797531 713.007407 714.091005 684.833862 825.701587z"
                    fill="yellow" />
            </svg>
            <svg v-if="item.id===10"
                 x="1"
                 y="1"
                 viewBox="0 0 1024 1024"
                 version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 width="18"
                 height="18">
              <path d="M317.103 429.404c11.571-11.54 30.262-11.654 41.966-0.256l237.208 231.007c11.946 11.637 12.058 30.801 0.247 42.582l-95.872 95.626c-77.416 77.416-192.408 92.605-270.707 38.009L120.038 946.246c-11.676 11.672-30.606 11.672-42.281 0-11.49-11.487-11.673-29.998-0.547-41.708l0.547-0.562 109.67-109.64c-55.967-78.326-41.111-194.39 36.848-272.35z m21.35 63.133l-71.916 71.723-1.883 1.912c-61.82 63.543-67.918 156.28-16.193 208.005 52.247 52.247 146.34 45.498 209.949-18.11l74.42-74.23-194.377-189.3z m613.79-422.783c11.49 11.487 11.673 29.998 0.547 41.708l-0.547 0.562-109.11 109.084c57.203 78.339 42.65 195.365-35.795 273.81L714.51 587.5c-11.57 11.54-30.261 11.655-41.966 0.256L626.8 543.208l-18.078 18.075c-11.676 11.673-30.606 11.673-42.281 0-11.49-11.487-11.673-29.998-0.548-41.708l0.548-0.561 17.524-17.521-61.698-60.085-20.092 20.087c-11.675 11.672-30.605 11.672-42.28 0-11.49-11.487-11.673-29.998-0.548-41.708l0.547-0.562 19.538-19.532-44.096-42.943c-11.826-11.52-12.054-30.42-0.598-42.227l0.351-0.355 95.872-95.626c76.927-76.927 190.955-92.411 269.218-39.036L909.962 69.754c11.676-11.672 30.606-11.672 42.281 0z m-169.09 172.973c-52.248-52.247-146.34-45.498-209.95 18.111l-74.42 74.231 194.377 189.3 71.937-71.748 1.862-1.889c61.82-63.543 67.918-156.28 16.193-208.005z"
                    fill="#ffffff" />
            </svg>
          </svg>
          <span class="LegTitleName">{{ item.label }}</span>
        </li>
      </ul>
    </div>
    <!-- <div style="display: grid;">
      <div class="LegendDiv">
        堆垛机状态
      </div>
      <ul class="LegendList">
        <li v-for="item in legend_WL_Crn"
            :key="item.id"
            class="crnstatus">
          <svg version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               width="22"
               height="22">
            <rect x="0"
                  y="0"
                  rx="2"
                  ry="2"
                  :fill="item.color"
                  :width="20"
                  :height="20"
                  class="reactClassLe" />
          </svg>
          <span class="LegTitleName">{{ item.label }}</span>
        </li>
      </ul>
    </div> -->
  </section>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default () {
        return '物流模式'
      }
    },
    scmode: {
      type: Object,
      default () {
        return {}
      }
    },
    legendQty: {
      type: Object,
      default () {
        return {
        }
      }
    }
  },
  data () {
    return {
      legend_WL_Bin: [
        { color: '#D1D1D1', label: '空闲', id: 0, qty: 0 },
        { color: '#FF00FF', label: '入库占用', id: 1, qty: 0 },
        { color: '#39B54A', label: '实托在库', id: 2, qty: 0 },
        { color: '#97FFFF', label: '出库占用', id: 3, qty: 0 },
        { color: '#FF9933', label: '异常库位', id: 4, qty: 0 }
        // { color: '#FF00FF', label: '入库占用', id: 6, qty: 0 },
        // { color: '#97FFFF', label: '出库占用', id: 7, qty: 0 }
      ],
      legend_WL_Use: [
        { color: '#000000', label: '禁用', id: 0, qty: 0 }
        // { color: '#D1D1D1', label: '仅可入', id: 1, qty: 0 },
        // { color: '#D1D1D1', label: '仅可出', id: 2, qty: 0 }
      ],
      legend_WL_Type: [
        // { color: '#D1D1D1', label: '入口', id: 1, qty: 0 },
        // { color: '#D1D1D1', label: '出口', id: 2, qty: 0 },
        // { color: '#D1D1D1', label: '工装', id: 3, qty: 0 }
        // { color: '#F7931E', label: '电源柜不可用', id: 8, qty: 0 },
        // { color: '#FF0000', label: '火警', id: 9, qty: 0 },
        // { color: '#D1D1D1', label: '心跳断开', id: 10, qty: 0 }
      ],
      legend_WL_Crn: [
        { color: '#00FF00', label: '自动运行', id: 1, qty: 0 },
        { color: '#29ABE2', label: '自动空闲', id: 2, qty: 0 },
        { color: '#FEE232', label: '手动', id: 3, qty: 0 },
        { color: '#ED1C24', label: '故障', id: 4, qty: 0 },
        { color: '#C6C6C6', label: '离线', id: 5, qty: 0 }
      ],
      legend_HC_ECSin: [
        { color: '#FFEB3B', label: '预约占用', id: 1, qty: 0 },
        { color: '#CCCCFF', label: '预约入库', id: 2, qty: 0 },
        { color: '#97FFFF', label: '确认预约入库', id: 3, qty: 0 },
        { color: '#99FFCC', label: '入库完成', id: 4, qty: 0 },
        { color: '#B2DFDB', label: '空托入库完成', id: 5, qty: 0 }
      ],
      legend_HC_ECSout: [
        { color: '#F7931E', label: '预约出库', id: 1, qty: 0 },
        { color: '#BC83FF', label: '预约成功', id: 2, qty: 0 },
        { color: '#29ABE2', label: '通知取托盘', id: 3, qty: 0 },
        { color: '#009900', label: '取货完成', id: 4, qty: 0 }
      ],
      legend_SC_Bin: [
        { color: '#D1D1D1', label: '静置中', id: 1, qty: 0 },
        { color: '#0033FF', label: '60min出库', id: 2, qty: 0 },
        { color: '#FF00FF', label: '20min出库', id: 3, qty: 0 },
        { color: '#C69C6D', label: '15min出库', id: 4, qty: 0 },
        { color: '#009245', label: '5min出库', id: 5, qty: 0 },
        { color: '#FF0000', label: '超时', id: 6, qty: 0 }
      ],
      legend_SC_CRF: [],
      legend_SC_Process: []
    }
  },
  methods: {
    BasicStateStrokeZT (state) {
      switch (state) {
        case 0:
          return '#D1D1D1'
        default:
          return '#000000'
      }
    }
  }
}
</script>

<style scoped>
  .LegendDiv{
    text-align: left;
    font-size: 15px;
    margin: 10px 0 0 10px;
    font-weight: bold;
  }
  ul.LegendList {
    width: 290px;
    margin: 0;
  }
  ul.LegendList li.usestatus {
    display: flex;
    align-items: center;
    width: 80px;
    float: left;
  }
  ul.LegendList li.binstatus {
    display: flex;
    align-items: center;
    width: 240px;
    float: left;
  }
  ul.LegendList li.typestatus {
    display: flex;
    align-items: center;
    width: 120px;
    float: left;
  }
  ul.LegendList li.crnstatus {
    display: flex;
    align-items: center;
    width: 80px;
    float: left;
  }
  .LegTitleName{
    margin-left: 10px;
    font-size: 12px;
  }
</style>
