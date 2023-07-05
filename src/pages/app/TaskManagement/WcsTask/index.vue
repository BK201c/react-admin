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
    :hasToolBar="['download','filter']"
    @handleSelectionChange="handleSelectionChange"
    :total="total"
    :page.sync="queryParams.page"
    :limit.sync="queryParams.limit"
    @pagination="fetchData"
    :operator="tableOperator"
    @operator-click="operatorClick"
    :operatorWidth="100"
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
  <Dispatch2
    :visible.sync="dispatchVisible"
  >
  </Dispatch2>
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
import mainApi from "@/api/modules/taskManagement/wcsTaskApi";
import Dispatch2 from "./components/Dispatch2.vue";
export default {
mixins: [settingMix],
name  : "wcsTask",
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
          text: "vtableTools.addTask",
          icon: "el-icon-plus",
          type: "primary",
          authCode: "create",
          click: () => {
            return this.addInfo();
          },
        },
        {
          text: "vtableTools.enable",
          icon: "el-icon-circle-check",
          type: "primary",
          disabel: true,
          authCode: "enableAndDisable",
          click: () => {
            return this.setUsedFlag("enable");
          },
        },
        {
          text: "vtableTools.disable",
          type: "primary",
          icon: "el-icon-circle-close",
          disabel: true,
          authCode: "enableAndDisable",
          click: () => {
            return this.setUsedFlag("disable");
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
        {
          text: "vtableTools.taskPause",
          icon: "el-icon-plus",
          type: "primary",
          authCode: "taskPause",
          click: () => {
            return this.setUsedFlag("taskPause");
          },
        },
        {
          text: "vtableTools.taskRecover",
          icon: "el-icon-plus",
          type: "primary",
          authCode: "taskRecover",
          click: () => {
            return this.setUsedFlag("taskRecover");
          },
        },
        {
          text: "vtableTools.taskForceFinish",
          icon: "el-icon-plus",
          type: "primary",
          authCode: "taskForceFinish",
          click: () => {
            return this.setUsedFlag("taskForceFinish");
          },
        },
        {
          text: "vtableTools.requestDispatch",
          icon: "el-icon-plus",
          type: "primary",
          authCode: "requestDispatch",
          click: () => {
            return this.setUsedFlag("requestDispatch");
          },
        },
        {
          text: "vtableTools.returnWms",
          icon: "el-icon-plus",
          type: "primary",
          authCode: "returnWms",
          click: () => {
            return this.setUsedFlag("returnWms");
          },
        },
        {
          text: "vtableTools.requestDispatchByParam",
          icon: "el-icon-plus",
          type: "primary",
          authCode: "requestDispatchByParam",
          click: () => {
            return this.requestDispatchByParam();
          },
        },
      ],
      disabledListBtns: [
        "vtableTools.enable",
        "vtableTools.disable",
        "vtableTools.delete",
        "vtableTools.taskPause",
        "vtableTools.taskRecover",
        "vtableTools.taskForceFinish",
        "vtableTools.requestDispatch",
        "vtableTools.returnWms",
      ],
      //编辑表格
      tableOperator: [
        {
          text: "common.update",
          authCode:"edit",
          value: 1,
        },
      ],
      dispatchVisible:false,
  }     
  },
  components: {
    Detail,
    Dispatch2
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
        default:
          break;
      }
    },
     /**
     * 监听用户勾选复选框
     * @param val
     */
    handleSelectionChange(val) {
      console.log("监听选择框", val);
      this.ids = [];

      this.selectData = val;
      val.forEach((item) => {
        this.ids.push(item.id);
      });

      if (val.length > 0) {
        this.disabledListBtns = [];
      } else {
        this.disabledListBtns = [
          "vtableTools.enable",
          "vtableTools.disable",
          "vtableTools.delete",
          "vtableTools.taskPause",
          "vtableTools.taskRecover",
          "vtableTools.taskForceFinish",
          "vtableTools.requestDispatch",
          "vtableTools.returnWms",
        ];
      }
    },
    confirmSubmit() {
      switch (this.confirmType) {
        case "enable":
          this.enableInfo();
          break;
        case "disable":
          this.disableInfo();
          break;
        case "delete":
          this.delInfo();
          break;
        case "taskPause":
          this.taskPause();
          break;
        case "taskRecover":
          this.taskRecover();
          break;
        case "taskForceFinish":
          this.taskForceFinish();
          break;
        case "requestDispatch":
          this.requestDispatch();
          break;
        case "returnWms":
          this.taskRuturnWms();
          break;
        case "requestDispatchByParam":
          this.requestDispatchByParam();
          break;
        default:
          break;
      }
      this.confirmVisible = false;
    },
    //任务暂停
    taskPause(){
      this.mainApi.taskPause(this.ids).then((response) => {
        if (response.code === 200 || response.code === 0) {
            this.$message.success(response.message);
        } else {
          this.$message.error(response.message);
        }
      });
      this.fetchData();
    },
    //任务恢复
    taskRecover(){  
      this.mainApi.taskRecover(this.ids).then((response) => {
        if (response.code === 200 || response.code === 0) {
            this.$message.success(response.message);
        } else {
          this.$message.error(response.message);
        }
      });
      this.fetchData();
    },
    //强制完成
    taskForceFinish(){  
      this.mainApi.taskForceFinish(this.ids).then((response) => {
        if (response.code === 200 || response.code === 0) {
            this.$message.success(response.message);
        } else {
          this.$message.error(response.message);
        }
      });
      this.fetchData();
    },
    //请求调度
    requestDispatch(){  
      this.mainApi.requestDispatchByHand(this.ids).then((response) => {
        if (response.code === 200 || response.code === 0) {
            this.$message.success(response.message);
        } else {
          this.$message.error(response.message);
        }
      });
      this.fetchData();
    },
    //手动回传
    taskRuturnWms(){  
      this.mainApi.taskRuturnWms(this.ids).then((response) => {
        if (response.code === 200 || response.code === 0) {
            this.$message.success(response.message);
        } else {
          this.$message.error(response.message);
        }
      });
      this.fetchData();
    },
    //参数请求调度
    requestDispatchByParam(){  
      this.dispatchVisible=true;
    },

  },
};
</script>
<style scoped>
  
</style>