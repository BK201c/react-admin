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
    :hasOperator="false"
    :hasToolBar="['download','filter']"
    @handleSelectionChange="handleSelectionChange"
    :total="total"
    :page.sync="queryParams.page"
    :limit.sync="queryParams.limit"
    @pagination="fetchData"
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
import mainApi from "@/api/modules/taskManagement/wcsAgvCmdApi";
export default {
mixins: [settingMix],
name  : "wcsRgvCmd",
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
          text: "vtableTools.reload",
          icon: "el-icon-plus",
          type: "primary",
          authCode: "reload",
          click: () => {
            return this.setUsedFlag("reload");
          },
        },
        {
          text: "vtableTools.cmdForceFinish",
          icon: "el-icon-plus",
          type: "primary",
          authCode: "cmdForceFinish",
          click: () => {
            return this.setUsedFlag("cmdForceFinish");
          },
        },
        {
          text: "vtableTools.cmdNormalFinish",
          icon: "el-icon-plus",
          type: "primary",
          authCode: "cmdNormalFinish",
          click: () => {
            return this.setUsedFlag("cmdNormalFinish");
          },
        },
      ],
      disabledListBtns: [
        "vtableTools.delete",
        "vtableTools.reload",
        "vtableTools.cmdForceFinish",
        "vtableTools.cmdNormalFinish",
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
        "vtableTools.delete",
        "vtableTools.reload",
        "vtableTools.cmdForceFinish",
        "vtableTools.cmdNormalFinish",
        ];
      }
    },
    confirmSubmit() {
      switch (this.confirmType) {
        case "delete":
          this.delInfo();
          break;
        case "reload":
          this.reload();
          break;
        case "cmdForceFinish":
          this.cmdForceFinish();
          break;
        case "cmdNormalFinish":
          this.cmdNormalFinish();
          break;
        default:
          break;
      }
      this.confirmVisible = false;
    },
    //指令重发
    reload(){  
      this.mainApi.cmdReload(this.ids).then((response) => {
        if (response.code === 200 || response.code === 0) {
            this.$message.success(response.message);
        } else {
          this.$message.error(response.message);
        }
      });
      this.fetchData();
    },
    //强制完成
    cmdForceFinish(){  
      this.mainApi.cmdForceFinish(this.ids).then((response) => {
        if (response.code === 200 || response.code === 0) {
            this.$message.success(response.message);
        } else {
          this.$message.error(response.message);
        }
      });
      this.fetchData();
    },
    //正常完成
    cmdNormalFinish(){  
      this.mainApi.cmdNormalFinish(this.ids).then((response) => {
        if (response.code === 200 || response.code === 0) {
            this.$message.success(response.message);
        } else {
          this.$message.error(response.message);
        }
      });
      this.fetchData();
    },
  },
};
</script>
<style scoped>
  
</style>