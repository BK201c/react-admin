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
    
    //查询--重置
    reset() {
      this.resetForm(this.filterFormValue);
      this.fetchData();
    },

    resetForm(obj) {
      Object.keys(obj).forEach((e) => (obj[e] = ""));
    },
  },
};
</script>

<style lang="scss" scoped></style>
