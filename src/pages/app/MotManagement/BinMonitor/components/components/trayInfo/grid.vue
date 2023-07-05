<!--  -->
<template>
  <div>
    <div class="header-wrapper">  {{ $t('明细列表') }}</div>
    <div class="">
      <vxe-grid
        id="loadDtl"
        ref="LeadTable"
        border
        size="mini"
        align="center"
        column-key
        export-config
        auto-resize
        show-overflow="tooltip"
        show-header-overflow
        resizable
        highlight-hover-row
        :height="height"
        class="sortable-column-demo"
        :sort-config="{ trigger: 'cell', remote: true }"
        :columns="tableColumn"
        :data="tableData"
        :loading="loading"
      />
    </div></div>
</template>

<script>
import vex from '@/lib/vxetbale.js'
export default {
  components: {},
  props: {
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      height: 200,
      tableColumn: [
        {
          field: 'palletBarcode',
          title: this.$t('载体条码'),
          width: 180
        },
        {
          field: 'containerBarcode',
          title: this.$t('容器号'),
          width: 180
        },
        {
          field: 'materialCode',
          title: this.$t('物料编码'),
          width: 160
        },
        {
          field: 'materialName',
          title: this.$t('物料名称'),
          width: 180
        },
        {
          field: 'materialTypeName',
          title: this.$t('物料类型'),
          width: 120
        },
        {
          field: 'batchNo',
          title: this.$t('批次号'),
          width: 100
        },
        {
          field: 'qty',
          title: this.$t('库存数量'),
          width: 100
        },
        {
          field: 'unitName',
          title: this.$t('单位'),
          width: 100
        },
        {
          field: 'spec',
          title: this.$t('规格'),
          width: 100
        },
        {
          field: 'regionName',
          title: this.$t('库区'),
          width: 100
        },
        {
          field: 'binNo',
          title: this.$t('库位号'),
          width: 180
        },
       
        {
          field: 'stockStatusDesc',
          title: this.$t('库存状态'),
          width: 100
        },
        {
          field: 'inspectionResultDesc',
          title: this.$t('质量标记'),
          width: 100
        },
        {
          field: 'inwhTime',
          title: this.$t('入库时间'),
          width: 140
        }
        // {
        //   field: 'allotFlagName',
        //   title: this.$t('app.Field.分配标识'),
        //   width: 100
        // },
        // {
        //   field: 'lockFlagName',
        //   title: this.$t('app.Field.锁定状态'),
        //   width: 100
        // },
        // {
        //   field: 'skuCode',
        //   title: this.$t('app.Field.SKU'),
        //   width: 100
        // },
        // {
        //   field: 'barcode',
        //   title: this.$t('app.Field.唯一码'),
        //   width: 100
        // },
        // {
        //   field: 'originalBarcode',
        //   title: this.$t('app.Field.原唯一码'),
        //   width: 100
        // },
        // {
        //   field: 'projectStatus',
        //   title: this.$t('app.Field.项目状态'),
        //   width: 100
        // },

        // {
        //   field: 'materialName',
        //   title: this.$t('app.Field.物料名称'),
        //   width: 160
        // },
        // {
        //   field: 'materialTypeName',
        //   title: this.$t('app.Field.物料类型名称'),
        //   width: 160
        // },
        // {
        //   field: 'unitName',
        //   title: this.$t('app.Field.单位'),
        //   width: 100
        // },
        // {
        //   field: 'productionPlanNo',
        //   title: this.$t('app.Field.计划号'),
        //   width: 160
        // },
        // {
        //   field: 'partNo',
        //   title: this.$t('app.Field.部件号'),
        //   width: 100
        // },
        // {
        //   field: 'graphNo',
        //   title: this.$t('app.Field.图号'),
        //   width: 100
        // },
        // {
        //   field: 'generalName',
        //   title: this.$t('app.Field.通用名称'),
        //   width: 100
        // },
        // {
        //   field: 'materialVersion',
        //   title: this.$t('app.Field.版本'),
        //   width: 100
        // },
        // {
        //   field: 'qty',
        //   title: this.$t('app.Field.数量'),
        //   width: 100
        // },
        // {
        //   field: 'emergencyFlag',
        //   title: this.$t('app.Field.急件标识'),
        //   width: 100
        // },
        // {
        //   field: 'assembleWorkshop',
        //   title: this.$t('app.Field.装配车间'),
        //   width: 100
        // },
        // {
        //   field: 'assembleArea',
        //   title: this.$t('app.Field.装配区域'),
        //   width: 100
        // },
        // {
        //   field: 'assemblePerson',
        //   title: this.$t('app.Field.装配负责人'),
        //   width: 100
        // },
        // {
        //   field: 'deliverNo',
        //   title: this.$t('app.Field.送货单号'),
        //   width: 100
        // },
        // {
        //   field: 'traceBarcode',
        //   title: this.$t('app.Field.追溯条码'),
        //   width: 100
        // },
        // {
        //   field: 'devName',
        //   title: this.$t('app.Field.设备名称'),
        //   width: 100
        // },
        // {
        //   field: 'erpNo',
        //   title: this.$t('app.Field.ERP号'),
        //   width: 100
        // },
        // {
        //   field: 'putMaterialType',
        //   title: this.$t('app.Field.投料类型'),
        //   width: 100
        // },
        // {
        //   field: 'scheduleType',
        //   title: this.$t('app.Field.排产类型'),
        //   width: 100
        // },
        // {
        //   field: 'weight',
        //   title: this.$t('app.Field.重量'),
        //   width: 100
        // },
        // {
        //   field: 'size',
        //   title: this.$t('app.Field.尺寸'),
        //   width: 100
        // },
        // {
        //   field: 'spec',
        //   title: this.$t('app.Field.规格'),
        //   width: 100
        // }
      ],
      tableData: [

      ]

    }
  },
  computed: {},
  watch: {
    data: {
      deep: true,
      immediate: false,
      handler (val) {
        this.tableData = val
      }
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style lang='scss' scoped>
@import "~./style.scss";
</style>
