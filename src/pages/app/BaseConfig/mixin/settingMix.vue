<script>
import _ from "lodash";
export default {
  //启用、禁用、删除（confirm）
  data() {
    return {
      //勾选的数据ID
      ids: [],
      queryParams: {
        page: 1,
        limit: 20,
      },
      tableData: [],
      total: 10,
      listLoading: false,
      selectedRow: null,
      detailVisible: false,
      detailType: "add",
      confirmVisible: false,
      confirmType: "delete",
      selectData: [],
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
      ],
      disabledListBtns: [
        "vtableTools.enable",
        "vtableTools.disable",
        "vtableTools.delete",
      ],
    };
  },
  created() {
    this.fetchData();
  },
  components: {},
  methods: {
    /**
     * 查询
     */
    fetchData() {
      this.listLoading = true;
      const query = {
        skipCount: (this.queryParams.page - 1) * this.queryParams.limit,
        maxResultCount: this.queryParams.limit,
        sorting: "",
      };
      const params = Object.assign({}, query, this.filterFormValue);

      console.log("当前查询参数", params);

      this.mainApi.getList(params).then((response) => {
        console.log(response);
        this.tableData = response.data.items;
        this.total = response.data.totalCount;
        this.listLoading = false;
      });
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
        ];
      }
    },

    //查询--重置
    reset() {
      this.resetForm(this.filterFormValue);
      this.fetchData();
    },

    //启用禁用标志
    setUsedFlag(value) {
      this.confirmType = value;
      this.confirmVisible = true;
    },

    //新增
    addInfo() {
      this.detailType = "add";
      this.detailVisible = true;
    },

    //表格编辑
    editInfo(row) {
      this.selectedRow = _.cloneDeep(row);
      this.detailType = "edit";
      this.detailVisible = true;
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

        default:
          break;
      }
      this.confirmVisible = false;
    },

    delInfo() {
      if (this.ids.length == 0) {
        this.$message({
          message: "common.PleaseSelectRecordToDelete",
          type: "info",
        });
      } else {
        this.mainApi.delete(this.ids).then((response) => {
          if (response.code === 200 || response.code === 0) {
            this.$message.success(response.message);
            this.fetchData();
          } else {
            this.$message.error(response.message);
          }
        });
      }
    },
    enableInfo() {
      if (this.ids.length == 0) {
        this.$message({
          message: "common.PleaseSelectRecordToEnabled",
          type: "info",
        });
      } else {
        const enableParams = {
          Ids: this.ids,
          UsedFlag: 1,
        };
        this.mainApi.setUsedFlag(enableParams).then((res) => {
          if (res.code === 200 || res.code === 0) {
            this.$message.success(this.$t("common.EnabledSuccessfully"));
            this.fetchData();
          } else {
            this.$message.error(res.message);
          }
        });
      }
    },

    disableInfo() {
      if (this.ids.length == 0) {
        this.$message({
          message: "common.PleaseSelectRecordToDisable",
          type: "info",
        });
      } else {
        const disableParams = {
          Ids: this.ids,
          UsedFlag: 0,
        };
        this.mainApi.setUsedFlag(disableParams).then((res) => {
          if (res.code === 200 || res.code === 0) {
            this.$message.success(this.$t("common.DisabledSuccessfully"));
            this.fetchData();
          } else {
            this.$message.error(res.message);
          }
        });
      }
    },

    resetForm(obj) {
      Object.keys(obj).forEach((e) => (obj[e] = ""));
    },
  },
};
</script>

<style lang="scss" scoped></style>
