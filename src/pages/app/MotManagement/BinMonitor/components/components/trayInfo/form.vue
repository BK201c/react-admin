<!--  -->
<template>
  <div>
    <div class="header-wrapper">
      {{ $t('app.Field.托盘信息') }}
      <!-- 装载状态 -->
      <span
        v-if="handleIsShow(loadData.trayLoadedType)"
        class="item-title-icon-wrapper"
        style="margin: 0 0 0 40px"
      ><img
         :src="require('@/assets/images/' +TrayLoadedTypeTransIcon(loadData.trayLoadedType) +'.png')"
       >
        <h6>
          {{ loadData.trayLoadedTypeName }}
        </h6></span>
      <!-- 满盘标识 -->
      <span
        v-if="handleIsShow(loadData.fullFlag)"
        class="item-title-icon-wrapper"
        style="margin: 0 20px "
      ><img
         :src="require('@/assets/images/' +FullFlagNameTransIcon(loadData.fullFlag) +'.png')"
       >
        <h6>
          {{ loadData.fullFlagName }}
        </h6></span>
    </div>
    <div style="margin-bottom: 10px">
      <vxe-form
        ref="xForm"
        class="xForm"
        title-width="70"
        :data="loadData"
        title-align="left"
        :loading="loading"
      >
        <vxe-form-item :title="$t('app.Field.托盘号') + ':'" field="" span="4">
          <el-tooltip placement="top" :content="loadData.trayBarcode">
            <div>{{ loadData.trayBarcode }}</div>
          </el-tooltip>
        </vxe-form-item>
        <vxe-form-item :title="$t('app.Field.区域') + ':'" field="" span="4">
          <el-tooltip placement="top" :content="loadData.areaName">
            <div>{{ loadData.areaName }}</div>
          </el-tooltip>
        </vxe-form-item>
        <vxe-form-item :title="$t('app.Field.库区') + ':'" field="" span="4">
          <el-tooltip placement="top" :content="loadData.regionName">
            <div>{{ loadData.regionName }}</div>
          </el-tooltip>
        </vxe-form-item>
        <vxe-form-item :title="$t('app.Field.巷道') + ':'" field="" span="4">
          <el-tooltip placement="top" :content="loadData.roadwayName">
            <div>{{ loadData.roadwayName }}</div>
          </el-tooltip>
        </vxe-form-item>
        <vxe-form-item :title="$t('app.Field.库位') + ':'" field="" span="4">
          <el-tooltip placement="top" :content="loadData.binNo">
            <div>{{ loadData.binNo }}</div>
          </el-tooltip>
        </vxe-form-item>
        <!-- <vxe-form-item
          :title="$t('app.Field.当前站台') + ':'"
          field=""
          span="4"
        >
          <el-tooltip placement="top" :content="loadData.currentLocName">
            <div>{{ loadData.currentLocName }}</div>
          </el-tooltip>
        </vxe-form-item>
        <vxe-form-item
          :title="$t('app.Field.托盘类型') + ':'"
          field=""
          span="4"
        >
          <el-tooltip placement="top" :content="loadData.trayTypeName">
            <div>{{ loadData.trayTypeName }}</div>
          </el-tooltip>
        </vxe-form-item> -->
        <!-- <vxe-form-item
          :title="$t('app.Field.装载状态') + ':'"
          field=""
          span="4"
        >
          <el-tooltip placement="top" :content="loadData.trayLoadedTypeName">
            <div>{{ loadData.trayLoadedTypeName }}</div>
          </el-tooltip>
        </vxe-form-item>
        <vxe-form-item
          :title="$t('app.Field.满盘标识') + ':'"
          field=""
          span="4"
        >
          <el-tooltip placement="top" :content="loadData.fullFlagName">
            <div>{{ loadData.fullFlagName }}</div>
          </el-tooltip>
        </vxe-form-item> -->
        <vxe-form-item :title="$t('app.Field.状态') + ':'" field="" span="4">
          <el-tooltip placement="top" :content="loadData.trayStatusName">
            <div>{{ loadData.trayStatusName }}</div>
          </el-tooltip>
        </vxe-form-item>
        <vxe-form-item
          :title="$t('app.Field.锁定状态') + ':'"
          field=""
          span="4"
        >
          <el-tooltip placement="top" :content="loadData.trayLockFlagName">
            <div>{{ loadData.trayLockFlagName }}</div>
          </el-tooltip>
        </vxe-form-item>
        <!-- <vxe-form-item
          :title="$t('app.Field.料架状态') + ':'"
          field=""
          span="4"
        >
          <el-tooltip placement="top" :content="loadData.rackStatusStr">
            <div>{{ loadData.rackStatusStr }}</div>
          </el-tooltip>
        </vxe-form-item>
        <vxe-form-item :title="$t('app.Field.计划号') + ':'" field="" span="24">
          <el-tooltip placement="top" :content="loadData.productionPlanNo">
            <div>{{ loadData.productionPlanNo }}</div>
          </el-tooltip>
        </vxe-form-item> -->
      </vxe-form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    data: { type: Object, default: () => [] },
    loading: {
      type: Boolean,
      default: () => false
    }},
  data () {
    return {
      loadData: {}
    }
  },
  computed: {},
  watch: {
    data: {
      immediate: false,
      deep: true,
      handler (val) {
        this.loadData = val
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    handleIsShow (val) {
      if (val === 0) return true
      return !!val
    },
    TrayLoadedTypeTransIcon (val) {
      if (val === 0) {
        // 空盘
        return 'trayLoadedEmpty'
      } else if (val === 1) {
        // 实盘
        return 'trayLoadedFull'
      } else if (val === 2) {
        // 工装
        return 'trayLoadedGZ'
      } else if (val === 3) {
        // 无托盘
        return 'trayLoadedNo'
      } else if (val === 4) {
        // 挡板
        return 'trayLoadedDB'
      } else {
        return ''
      }
    },
    FullFlagNameTransIcon (val) {
      if (val === 0) {
        // 未满盘
        return 'fullFlagNo'
      } else if (val === 1) {
        // 已满盘
        return 'fullFlag'
      } else {
        return ''
      }
    }

  }
}
</script>
<style lang="scss" scoped>
@import '~./style.scss';
.xForm {
  padding: 0 10px;

  .vxe-form--item,
  .vxe-form--item-title {
    padding: 3px 0;
    padding-right: 0 !important;
  }

  .vxe-form--item-content {
    overflow: hidden;
    .el-tooltip {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.item-title-icon-wrapper {
  line-height: 100%;
  display: inline-block;
  h6 {
    display: inline-block;
    //  line-height: 100%;
    margin: 8px 0 0 3px;
    font-weight: normal;
    font-size: 13px;
  }
  img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }

  .tabIcon{
    width: 20px;
    height: auto;
  }
}
</style>
