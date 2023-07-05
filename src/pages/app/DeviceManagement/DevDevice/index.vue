<template>
  <div class="app-container">
    <v-form
    :formValue="filterFormValue"
    :formList="filterFormList"
    formType="filter"
    @search="fetchData"
    @reset="reset"
    :in18="true"
    @item-change="fetchData"
    @item-keyboard-enter="fetchData"
  ></v-form>
  <v-table
    :tableColumn="tableColumn"
    :tableData="tableData"
    :listLoading="listLoading"
    :hasCheckbox="true"
    :hasToolBar="['filter']"
    @handleSelectionChange="handleSelectionChange"
    :total="total"
    :page.sync="queryParams.page"
    :limit.sync="queryParams.limit"
    @pagination="fetchData"
    :operator="tableOperator"
    @operator-click="operatorClick"
    :operatorWidth="200"
    :in18="true"
  >
  <template v-slot:toolbar>
      <v-table-tools
        :operator="tableTools"
        :disabledList="disabledListBtns"
        :in18="true"
      ></v-table-tools>
    </template>
  </v-table> 
  <Detail
    :visible.sync="detailVisible"
    :source="selectedRow"
    :sourceType="detailType"
    @submit="fetchData()"
  ></Detail>
  <PlcConfig
    :visible.sync="plcCfgVisible"
    :source="selectedRow"
    @submit="fetchData()"
  >  
  </PlcConfig>
  <v-confirm
    :visible.sync="confirmVisible"
    :type="confirmType"
    :tableColumn="tableColumn"
    :tableData="selectData"
    @submit="confirmSubmit"
  ></v-confirm>
  </div>
</template>
<script>
import {
tableColumn,
filterFormValue,
filterFormList,
} from "./config";
import settingMix from "../mixin/settingMix.vue";
import Detail from "./components/Detail.vue";
import PlcConfig from "./components/PlcConfig.vue";
import mainApi from '@/api/modules/DeviceManagement/devDeviceApi';
export default {
mixins: [settingMix],
name  : "DevDevice",
  data(){
     return {
      mainApi,
      filterFormValue,
      filterFormList,
      //表格列名
      tableColumn,
      //表格数据
      tableData:[],
      //编辑表格
      tableOperator: [
        {
          text: "common.update",
          authCode:"edit",
          value: 1,
        },
        {
          text: "common.plcSetting",
          authCode:"plcSetting",
          value: 2,
        },
      ],
      plcCfgVisible:false,
  }     
  },
  components: {
    Detail,
    PlcConfig,
  },
  computed: {},
  created() {
  },
  mounted() {},
  watch: {},
  methods:{
    //表格操作事件
    operatorClick({ row, value }) {
      switch (value) {
        case 1:
          this.editInfo(row);
          break;
        case 2:
          this.plcSetting(row);
          break;
        default:
          break;
      }
    },
    plcSetting(row){
      this.selectedRow = _.cloneDeep(row);
      this.plcCfgVisible = true;
    }
  },
};
</script>
<style scoped>
  
</style>