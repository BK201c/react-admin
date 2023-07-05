<!--  -->
<template>
  <div class="app-container">
    <div class="trayInfo-wrapper">
      <div>
        <vxe-form ref="xForm" title-width="70" title-align="right">
          <vxe-form-item title="载体条码"
            >{{ $t("载体条码") }}
            <vxe-input
              v-model.trim="trayBarcode"
              style="width: 250px"
              clearable
              :placeholder="$t('请输入载体条码')"
              @keyup.enter.native="queryData"
            />
          </vxe-form-item>
          <vxe-form-item span="4" align="left">
            <vxe-button type="button" status="danger" @click="queryData">{{
              $t("查询")
            }}</vxe-button>
          </vxe-form-item>
        </vxe-form>
      </div>

      <!-- <formInfo :data="data" :loading="loading" /> -->

      <grid ref="grid" :data="data" :loading="loading" />
    </div>
  </div>
</template>

<script>
import vex from "@/lib/vxetbale";
import $ from "jquery";
// import formInfo from './components/trayInfo/form.vue'
import grid from "./components/trayInfo/grid.vue";
import stockAPI from "@/api/modules/stockManagement/StockAPI";
export default {
  name: "TrayInfo",
  // components: { formInfo, grid },
  components: { grid },
  // eslint-disable-next-line vue/require-prop-types
  props: {
    code: {
      type: String,
      default: () => "",
    },
    trayCode: {
      type: String,
      default: () => "",
    },
    activeTab: {
      type: String,
      default: () => "online",
    },
    tableHeight: {
      type: Number,
      default: () => 500,
    },
  },
  data() {
    return {
      loading: false,
      trayBarcode: "", // 托盘码
      tCode: "", // 组盘码
      data: {},
      currentTab: "",
    };
  },
  computed: {},
  watch: {
    activeTab: {
      immediate: true,
      handler(val) {
        this.currentTab = val;
      },
    },
    tableHeight(val) {
      this.$refs.grid.height = val - 400;
    },
  },
  created() {
    this.trayBarcode = this.code;
    this.tCode = this.trayCode;
    this.queryData();
  },

  mounted() {},
  methods: {
    queryData() {
      debugger;
      if (!this.trayBarcode) {
        this.$message.warning(this.$t("载体条码不能为空"));
        return;
      }
      this.loading = true;
      const params = {
        palletBarcode: this.trayBarcode,
        stockCode: this.tCode,
        skipCount: 0,
        maxResultCount: 50,
      };
      stockAPI.stockQuery(params).then((res) => {
        this.loading = false;
        this.data = res.data.items;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.trayInfo-wrapper {
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
}
</style>
