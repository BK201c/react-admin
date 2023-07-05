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
    @handleSelectionChange="handleSelectionChange"
    :total="total"
    :hasToolBar="['filter']"
    :page.sync="queryParams.page"
    :limit.sync="queryParams.limit"
    @pagination="fetchData"
    :operator="tableOperator"
    @operator-click="operatorClick"
    :operatorWidth="200"
    :in18="true"
    @cell-click="cellDtl"
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
  <DbSetting
    :visible.sync="DbSettingVisible"
    :source="selectedRow"
    :sourceType="detailType"
    @submit="fetchData()"
  ></DbSetting>
  <Dtl
    :visible.sync="partDtlVisible"
    :sourceId="selectedId"
  ></Dtl>
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
import mainApi from "@/api/modules/DeviceManagement/devDevicePartsApi";
import DbSetting from "./components/DbSetting.vue";
import Dtl from "./components/Dtl.vue"
export default {
mixins: [settingMix],
name  : "DevDeviceParts",
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
          text: "common.dbSetting",
          authCode:"dbSetting",
          value: 2,
        },
      ],
      partDtlVisible:false,
      selectedId:"",
      DbSettingVisible:false,
  }     
  },
  components: {
    Detail,
    Dtl,
    DbSetting,
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
            this.dbSetting(row);
            break;
          default:
            break;
        }
      },
      //点击设备部件编码显示明细
      cellDtl(row, column, cell){
        if(column.prop === "partNo"){
          this.partDtlVisible=true;
          this.selectedId=cell;
        }
      },

      //偏移量配置
      dbSetting(row){
        this.selectedRow = _.cloneDeep(row);
        this.detailType = "dbSetting";
        this.DbSettingVisible = true;
      },

  },
};
</script>
<style scoped>
  
</style>