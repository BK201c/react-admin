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
    :hasToolBar="['filter']"
    @handleSelectionChange="handleSelectionChange"
    :total="total"
    :page.sync="queryParams.page"
    :limit.sync="queryParams.limit"
    @pagination="fetchData" 
    :in18="true"
    :operator="tableOperator"
    @operator-click="operatorClick"
    :operatorWidth="500"
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
import mainApi from "@/api/modules/DeviceManagement/motReadBarcodeApi";
export default {
mixins: [settingMix],
name  : "motReadBarcode",
  data(){
     return {
      mainApi,
      filterFormValue,
      filterFormList,
      //表格列名
      tableColumn,
      //表格数据
      tableData:[],
      tableTools: [
        {
          text: "vtableTools.add",
          icon: "el-icon-plus",
          type: "primary",
          authCode: "create",
          click: () => {
            return this.addInfo();
          },
        },
        {
          text: "vtableTools.delete",
          type: "primary",
          icon: "el-icon-delete",
          disabel: true,
          authCode: "delete",
          click: () => {
            return this.setUsedFlag("delete");
          },
        },
      ],
      //编辑表格
      tableOperator: [
        {
          text: "common.update",
          authCode:"edit",
          value: 1,
        },
        {
          text: "common.codeSimu",
          authCode:"codeSimu",
          value: 2,
        },
        {
          text: "common.codeTest",
          authCode:"codeTest",
          value: 3,
        },
        {
          text: "common.clearBarcode",
          authCode:"clearBarcode",
          value: 4,
        },
        {
          text: "common.sendNgLoc",
          authCode:"sendNgLoc",
          value: 5,
        },
      ],
  }     
  },
  components: {
    Detail,
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
          this.codeSimu(row);
          break;
        case 3:
          this.codeTest(row);
          break;
        case 4:
          this.clearBarcode(row);
          break;
        case 5:
          this.sendNgLoc(row);
          break;
          
        default:
          break;
      }
    },
    //读码模拟
    codeSimu(row){
      this.$confirm('模拟读码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已确认'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    //读码测试
    codeTest(row){
      this.mainApi.readBarcode(row).then((response) => {
        // if (response.code === 200 || response.code === 0) {
        //     this.$message.success(response.message);
        // } else {
        //   this.$message.error(response.message);
        // }
        this.$message.success(this.$t('app.Field.读码结果：') + response.data);
        this.fetchData();
      })
    },
    //清除读码
    clearBarcode(row){
      this.mainApi.clearBarcode(row).then((response) => {
        this.$message.success(this.$t('app.Field.读码结果：') + response.data);
        this.fetchData();
      })
    },
    //排异常口
    sendNgLoc(row){
      this.mainApi.sendNgLoc(row).then((response) => {
        this.$message.success(this.$t('app.Field.读码结果：') + response.data);
      })
    },
  },
};
</script>
<style scoped>
  
</style>