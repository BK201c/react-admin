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
    :hasCheckbox="false"
    :hasOperator="false"
    :hasToolBar="['download','filter']"
    :total="total"
    :page.sync="queryParams.page"
    :limit.sync="queryParams.limit"
    @pagination="fetchData"
    :in18="true"
  >
  </v-table> 
  </div>
</template>
<script>
import {
tableColumn,
filterFormValue,
filterFormList,
} from "./configCopy";
import settingMix from "../mixin/settingMix.vue";
import mainApi from "@/api/modules/hisTaskManagement/wcsAgvCmdHisApi";
export default {
mixins: [settingMix],
name  : "HisWcsCovCmd",
  data(){
     return {
      mainApi,
      filterFormValue,
      filterFormList,
      //表格列名
      tableColumn,
      //表格数据
      tableData:[],
  }     
  },
  components: {
  },
  computed: {},
  created() {
  },
  mounted() {},
  watch: {},
  methods:{
  },
};
</script>
<style scoped>
  
</style>