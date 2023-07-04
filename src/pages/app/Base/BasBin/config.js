export default {
  type: "page",
  title: "库位管理",
  body: [
    {
      type: "crud",
      draggable: true,
      api: {
        method: "get",
        url: "/api/WCSMS/basBin/getList",
        requestAdaptor: "",
        adaptor:
          'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items,\r\n    "total": response.data.data.totalCount\r\n  }\r\n}',
        messages: {},
        replaceData: false,
        headers: {
          "Accept-Language": "zh-Hans",
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkMxN0U0NjEyRDA2ODEwQ0U0MTJBRTU0MzMyNTREMjE3IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2ODc3NDcxMDksImV4cCI6MTcxOTI4MzEwOSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoyMDAwMyIsImF1ZCI6WyIwMDEtQkFTRSIsIjAwMS1JVEYiLCIwMDEtV0NTIiwiMDAxLVdNUyIsIjU5NC1JVEYiLCI1OTQtV0NTIiwiNTk0LVdNUyIsIjU5NFdtc1NlcnZpY2UiLCJCYXNlU2VydmljZSIsIkRpc0l0ZlNlcnZpY2UiLCJEaXNwYXRjaEludGVyZmFjZSIsIkRpc3BhdGNoU2VydmljZSIsIkxlc1NlcnZpY2UiLCJMT0NBTC1XQ1MiLCJMT0NBTC1XTVMiLCJQdWJsaWNHYXRld2F5IiwiUXVhcnR6U2VydmljZSIsIldjc0Jhc2VTZXJ2aWNlIiwiV0NTRFMiLCJXQ1NJUyIsIldDU01TIiwiV21zSXRmU2VydmljZSIsIldtc1NlcnZpY2UiXSwiY2xpZW50X2lkIjoicHVibGljLXdlYnNpdGUtY2xpZW50Iiwic3ViIjoiOGNlNTMxMGQtNzFlZS0wOTI1LTgyYWMtM2EwOWNkOWJkZWEyIiwiYXV0aF90aW1lIjoxNjg3NzQ3MTA5LCJpZHAiOiJsb2NhbCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6Iui2hee6p-euoeeQhuWRmCIsInBob25lX251bWJlciI6IjEyMzQ1IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJlbWFpbCI6InN1cGVyYWRtaW5AeHh4LmNuIiwiZW1haWxfdmVyaWZpZWQiOiJGYWxzZSIsIm5hbWUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNjg3NzQ3MTA5LCJzY29wZSI6WyIwMDEtQkFTRSIsIjAwMS1JVEYiLCIwMDEtV0NTIiwiMDAxLVdNUyIsIjU5NC1JVEYiLCI1OTQtV0NTIiwiNTk0LVdNUyIsIjU5NFdtc1NlcnZpY2UiLCJCYXNlU2VydmljZSIsIkRpc0l0ZlNlcnZpY2UiLCJEaXNwYXRjaEludGVyZmFjZSIsIkRpc3BhdGNoU2VydmljZSIsIkxlc1NlcnZpY2UiLCJMT0NBTC1XQ1MiLCJMT0NBTC1XTVMiLCJQdWJsaWNHYXRld2F5IiwiUXVhcnR6U2VydmljZSIsIldjc0Jhc2VTZXJ2aWNlIiwiV0NTRFMiLCJXQ1NJUyIsIldDU01TIiwiV21zSXRmU2VydmljZSIsIldtc1NlcnZpY2UiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.wrffqeaTbZuw2J3tyXDebLIBQFb5kcGOlBADLITrKPUWh43DR68so4XLA7gndQ5MSvqUpcLkHRhJjGdEev2x-74-MR3oi_Ig2lUUFE8C4mlgl886O-WEvKX3silsfAeP89IjsA8FrF8KTaPWoGIzdojljnjqr9V1Zi9e4eMBb8PSefIEMsGmOg-vaCT7i8U-Hc8cqa1-hc1mPfVwsdA2nSI7uImFaL1k-rLZ9DZiS0CSiX2qQYhZ8engEIpyH1dBSRUkqaiFTjdYRYUhPGOLykYtblKQqB3AMiYYKYMnC1NxhziT3QAHpDIeQAyWPEvV2w-ZS6MgZtwf69cWNurARQ",
        },
        data: {
          "&": "$$",
          skipCount: "${(page - 1) * perPage}",
          maxResultCount: "${perPage}",
          binStatus: "${binStatusDesc}",
          binErrFlag: "${binErrFlagDesc}",
          areaNo: "${areaName}",
          roadwayNo: "${roadwayName}",
        },
      },
      columns: [
        {
          type: "text",
          name: "binNo",
          label: "库位编码",
          searchable: {
            type: "input-text",
            name: "binNo",
            label: "库位编码",
          },
        },
        {
          type: "text",
          name: "binDesc",
          label: "库位描述",
        },
        {
          type: "text",
          name: "extBinNo",
          label: "外部库位编码",
          searchable: {
            type: "input-text",
            name: "extBinNo",
            label: "外部库位编码",
          },
        },
        {
          type: "text",
          name: "binPlcNo",
          label: "PLC下发编码",
        },
        {
          type: "text",
          name: "binTypeDesc",
          label: "库位类型",
        },
        {
          type: "text",
          name: "binStatusDesc",
          label: "库位状态",
          searchable: {
            type: "select",
            source: {
              method: "get",
              url: "/api/WCSMS/options/getBinStatusOption",
              adaptor:
                'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
              headers: {
                "Accept-Language": "zh-Hans",
              },
            },
          },
        },
        {
          type: "text",
          name: "fireFlagDesc",
          label: "火警标志",
        },
        {
          type: "text",
          name: "capacitySize",
          label: "容量",
        },
        {
          type: "text",
          name: "extensionGroup",
          label: "伸位组",
        },
        {
          type: "text",
          name: "extensionIdxDesc",
          label: "伸位组序号",
        },
        {
          type: "text",
          name: "binGroupNo",
          label: "工位组",
        },
        {
          type: "text",
          name: "binGroupIdx",
          label: "工位组序号",
        },
        {
          type: "text",
          name: "binRow",
          label: "排",
          searchable: {
            type: "input-text",
            name: "binRow",
            label: "排",
          },
        },
        {
          type: "text",
          name: "binCol",
          label: "列",
          searchable: {
            type: "input-text",
            name: "binCol",
            label: "列",
          },
        },
        {
          type: "text",
          name: "binLayer",
          label: "层",
          searchable: {
            type: "input-text",
            name: "binLayer",
            label: "层",
          },
        },
        {
          type: "text",
          name: "binLength",
          label: "长度（mm）",
        },
        {
          type: "text",
          name: "binWidth",
          label: "宽度（mm）",
        },
        {
          type: "text",
          name: "binHeight",
          label: "高度（mm）",
        },
        {
          type: "text",
          name: "bearWeight",
          label: "最大承重",
        },
        {
          type: "text",
          name: "binPriority",
          label: "库位优先级",
        },
        {
          type: "text",
          name: "areaName",
          label: "所在区域名",
          searchable: {
            type: "select",
            source: {
              method: "get",
              url: "/api/WCSMS/options/getAreaOption",
              adaptor:
                'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
              headers: {
                "Accept-Language": "zh-Hans",
              },
            },
          },
        },
        {
          type: "text",
          name: "roadwayName",
          label: "所在巷道名",
          searchable: {
            type: "select",
            source: {
              method: "get",
              url: "/api/WCSMS/options/getRoadwayOption",
              adaptor:
                'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
              headers: {
                "Accept-Language": "zh-Hans",
              },
            },
          },
        },
        {
          type: "text",
          name: "rackName",
          label: "所在货架名",
        },
        {
          type: "text",
          name: "trayDirectDesc",
          label: "托盘方向",
        },
        {
          type: "text",
          name: "binErrFlagDesc",
          label: "库位异常类型",
          searchable: {
            type: "select",
            source: {
              method: "get",
              url: "/api/WCSMS/options/getBinErrOption",
              adaptor:
                'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
              headers: {
                "Accept-Language": "zh-Hans",
              },
            },
          },
        },
        {
          type: "text",
          name: "binErrMsg",
          label: "库位异常说明",
        },
        {
          type: "text",
          name: "palletBarcode",
          label: "托盘号",
          searchable: {
            type: "input-text",
            name: "palletBarcode",
            label: "托盘号",
          },
        },
        {
          type: "text",
          name: "inTime",
          label: "入库时间",
        },
        {
          name: "usedFlag",
          label: "启用标志",
          type: "mapping",
          map: {
            0: "<span class='label label-danger'>禁用</span>",
            1: "<span class='label label-success'>启用</span>",
            "*": "${usedFlag}",
          },
          searchable: {
            type: "select",
            name: "usedFlag",
            label: "启用标志",
            options: [
              {
                label: "禁用",
                value: "0",
              },
              {
                label: "启用",
                value: "1",
              },
            ],
          },
        },
        {
          name: "createBy",
          label: "创建人",
          type: "text",
        },
        {
          name: "createTime",
          label: "创建时间",
          type: "text",
        },
        {
          name: "updateBy",
          label: "更新人",
          type: "text",
        },
        {
          name: "updateTime",
          label: "更新时间",
          type: "text",
        },
        {
          type: "operation",
          label: "操作",
          buttons: [
            {
              label: "编辑",
              type: "button",
              actionType: "dialog",
              level: "link",
              dialog: {
                title: "编辑",
                body: [
                  {
                    type: "form",
                    api: {
                      method: "post",
                      url: "/apiTest/api/WCSMS/basArea/getList",
                      adaptor:
                        'return {\r\n  "status": response.data.status,\r\n  "msg": response.data.msg,\r\n  "data": response.data.data,\r\n}',
                      messages: {},
                      replaceData: false,
                      data: {
                        "&": "$$",
                        skipCount: 0,
                        maxResultCount: 20,
                        areaNo: "${areaNo}",
                        areaName: "${areaName}",
                      },
                      requestAdaptor: "",
                      dataType: "json",
                    },
                    body: [
                      {
                        type: "input-text",
                        name: "binNo",
                        label: "库位编码",
                        required: true,
                      },
                      {
                        type: "input-text",
                        name: "binDesc",
                        label: "库位描述",
                        required: true,
                      },
                      {
                        type: "input-text",
                        name: "extBinNo",
                        label: "外部库位编码",
                      },
                      {
                        type: "input-text",
                        name: "binPlcNo",
                        label: "PLC下发编码",
                      },
                      {
                        type: "select",
                        source: {
                          method: "get",
                          url: "/api/WCSMS/options/getBinTypeOption",
                          adaptor:
                            'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                          headers: {
                            "Accept-Language": "zh-Hans",
                          },
                        },
                        name: "binTypeDesc",
                        label: "库位类型",
                        required: true,
                      },
                      {
                        type: "select",
                        source: {
                          method: "get",
                          url: "/api/WCSMS/options/getBinStatusOption",
                          adaptor:
                            'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                          headers: {
                            "Accept-Language": "zh-Hans",
                          },
                        },
                        name: "binStatusDesc",
                        label: "库位状态",
                        required: true,
                      },
                      {
                        type: "select",
                        source: {
                          method: "get",
                          url: "/api/WCSMS/options/getFireFlagOption",
                          adaptor:
                            'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                          headers: {
                            "Accept-Language": "zh-Hans",
                          },
                        },
                        name: "fireFlagDesc",
                        label: "火警标志",
                        required: true,
                      },
                      {
                        type: "input-text",
                        name: "capacitySize",
                        label: "容量",
                        required: true,
                      },
                      {
                        type: "input-text",
                        name: "extensionGroup",
                        label: "伸位组",
                        required: true,
                      },
                      {
                        type: "select",
                        source: {
                          method: "get",
                          url: "/api/WCSMS/options/getBinExtensionIdxOption",
                          adaptor:
                            'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                          headers: {
                            "Accept-Language": "zh-Hans",
                          },
                        },
                        name: "extensionIdxDesc",
                        label: "伸位组序号",
                        required: true,
                      },
                      {
                        type: "input-text",
                        name: "binGroupNo",
                        label: "工位组",
                        required: true,
                      },
                      {
                        type: "input-text",
                        name: "binGroupIdx",
                        label: "工位组序号",
                        required: true,
                      },
                      {
                        type: "input-text",
                        name: "binRow",
                        label: "排",
                        required: true,
                      },
                      {
                        type: "input-text",
                        name: "binCol",
                        label: "列",
                        required: true,
                      },
                      {
                        type: "input-text",
                        name: "binLayer",
                        label: "层",
                        required: true,
                      },
                      {
                        type: "input-text",
                        name: "binLength",
                        label: "长度（mm）",
                        required: true,
                      },
                      {
                        type: "input-text",
                        name: "binWidth",
                        label: "宽度（mm）",
                        required: true,
                      },
                      {
                        type: "input-text",
                        name: "binHeight",
                        label: "高度（mm）",
                        required: true,
                      },
                      {
                        type: "input-text",
                        name: "bearWeight",
                        label: "最大承重",
                        required: true,
                      },
                      {
                        type: "input-text",
                        name: "binPriority",
                        label: "库位优先级",
                        required: true,
                      },
                      {
                        type: "select",
                        source: {
                          method: "get",
                          url: "/api/WCSMS/options/getAreaOption",
                          adaptor:
                            'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                          headers: {
                            "Accept-Language": "zh-Hans",
                          },
                        },
                        name: "areaName",
                        label: "所在区域名",
                        required: true,
                      },
                      {
                        type: "select",
                        source: {
                          method: "get",
                          url: "/api/WCSMS/options/getRoadwayOption",
                          adaptor:
                            'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                          headers: {
                            "Accept-Language": "zh-Hans",
                          },
                        },
                        name: "roadwayName",
                        label: "所在巷道名",
                        required: true,
                      },
                      {
                        type: "select",
                        source: {
                          method: "get",
                          url: "/api/WCSMS/options/getRackOption",
                          adaptor:
                            'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                          headers: {
                            "Accept-Language": "zh-Hans",
                          },
                        },
                        name: "rackName",
                        label: "所在货架名",
                        required: true,
                      },
                      {
                        type: "select",
                        source: {
                          method: "get",
                          url: "/api/WCSMS/options/getTrayDirectOption",
                          adaptor:
                            'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                          headers: {
                            "Accept-Language": "zh-Hans",
                          },
                        },
                        name: "trayDirectDesc",
                        label: "托盘方向",
                        required: true,
                      },
                      {
                        type: "select",
                        source: {
                          method: "get",
                          url: "/api/WCSMS/options/getBinErrOption",
                          adaptor:
                            'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                          headers: {
                            "Accept-Language": "zh-Hans",
                          },
                        },
                        name: "binErrFlagDesc",
                        label: "库位异常类型",
                        required: true,
                      },
                      {
                        type: "input-text",
                        name: "binErrMsg",
                        label: "库位异常说明",
                      },
                      {
                        type: "input-text",
                        name: "palletBarcode",
                        label: "托盘号",
                      },
                      {
                        type: "input-text",
                        name: "inTime",
                        label: "入库时间",
                        required: true,
                      },
                      {
                        type: "select",
                        name: "usedFlag",
                        label: "启用标志",
                        options: [
                          {
                            label: "禁用",
                            value: "0",
                          },
                          {
                            label: "启用",
                            value: "1",
                          },
                        ],
                        required: true,
                      },
                    ],
                  },
                ],
                type: "dialog",
              },
            },
          ],
        },
      ],
      bulkActions: [
        {
          type: "button",
          level: "danger",
          label: "批量删除",
          actionType: "ajax",
          confirmText: "确定要删除？",
          api: "/xxx/batch-delete",
        },
      ],
      features: ["filter", "update", "create", "bulkDelete"],
      filterColumnCount: 3,
      autoGenerateFilter: {
        columnsNum: 2,
        showBtnToolbar: false,
      },
      footable: {
        expand: "first",
        accordion: true,
      },
      perPageAvailable: [10],
      messages: {
        fetchSuccess: "查询成功",
        fetchFailed: "",
      },
      hidden: false,
      headerToolbar: [
        {
          label: "新增",
          type: "button",
          actionType: "dialog",
          level: "primary",
          dialog: {
            title: "新增",
            body: {
              type: "form",
              api: {
                method: "post",
                url: "/apiTest/api/WCSMS/basArea/getList",
                adaptor:
                  'return {\r\n  "status": response.data.status,\r\n  "msg": response.data.msg,\r\n  "data": response.data.data,\r\n}',
                messages: {},
                replaceData: false,
                data: {
                  "&": "$$",
                  skipCount: 0,
                  maxResultCount: 20,
                  areaNo: "${areaNo}",
                  areaName: "${areaName}",
                },
                requestAdaptor: "",
                dataType: "json",
              },
              body: [
                {
                  type: "input-text",
                  name: "binNo",
                  label: "库位编码",
                  required: true,
                },
                {
                  type: "input-text",
                  name: "binDesc",
                  label: "库位描述",
                  required: true,
                },
                {
                  type: "input-text",
                  name: "extBinNo",
                  label: "外部库位编码",
                },
                {
                  type: "input-text",
                  name: "binPlcNo",
                  label: "PLC下发编码",
                },
                {
                  type: "select",
                  source: {
                    method: "get",
                    url: "/api/WCSMS/options/getBinTypeOption",
                    adaptor:
                      'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                    headers: {
                      "Accept-Language": "zh-Hans",
                    },
                  },
                  name: "binTypeDesc",
                  label: "库位类型",
                  required: true,
                },
                {
                  type: "select",
                  source: {
                    method: "get",
                    url: "/api/WCSMS/options/getBinStatusOption",
                    adaptor:
                      'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                    headers: {
                      "Accept-Language": "zh-Hans",
                    },
                  },
                  name: "binStatusDesc",
                  label: "库位状态",
                  required: true,
                },
                {
                  type: "select",
                  source: {
                    method: "get",
                    url: "/api/WCSMS/options/getFireFlagOption",
                    adaptor:
                      'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                    headers: {
                      "Accept-Language": "zh-Hans",
                    },
                  },
                  name: "fireFlagDesc",
                  label: "火警标志",
                  required: true,
                },
                {
                  type: "input-text",
                  name: "capacitySize",
                  label: "容量",
                  required: true,
                },
                {
                  type: "input-text",
                  name: "extensionGroup",
                  label: "伸位组",
                  required: true,
                },
                {
                  type: "select",
                  source: {
                    method: "get",
                    url: "/api/WCSMS/options/getBinExtensionIdxOption",
                    adaptor:
                      'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                    headers: {
                      "Accept-Language": "zh-Hans",
                    },
                  },
                  name: "extensionIdxDesc",
                  label: "伸位组序号",
                  required: true,
                },
                {
                  type: "input-text",
                  name: "binGroupNo",
                  label: "工位组",
                  required: true,
                },
                {
                  type: "input-text",
                  name: "binGroupIdx",
                  label: "工位组序号",
                  required: true,
                },
                {
                  type: "input-text",
                  name: "binRow",
                  label: "排",
                  required: true,
                },
                {
                  type: "input-text",
                  name: "binCol",
                  label: "列",
                  required: true,
                },
                {
                  type: "input-text",
                  name: "binLayer",
                  label: "层",
                  required: true,
                },
                {
                  type: "input-text",
                  name: "binLength",
                  label: "长度（mm）",
                  required: true,
                },
                {
                  type: "input-text",
                  name: "binWidth",
                  label: "宽度（mm）",
                  required: true,
                },
                {
                  type: "input-text",
                  name: "binHeight",
                  label: "高度（mm）",
                  required: true,
                },
                {
                  type: "input-text",
                  name: "bearWeight",
                  label: "最大承重",
                  required: true,
                },
                {
                  type: "input-text",
                  name: "binPriority",
                  label: "库位优先级",
                  required: true,
                },
                {
                  type: "select",
                  source: {
                    method: "get",
                    url: "/api/WCSMS/options/getAreaOption",
                    adaptor:
                      'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                    headers: {
                      "Accept-Language": "zh-Hans",
                    },
                  },
                  name: "areaName",
                  label: "所在区域名",
                  required: true,
                },
                {
                  type: "select",
                  source: {
                    method: "get",
                    url: "/api/WCSMS/options/getRoadwayOption",
                    adaptor:
                      'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                    headers: {
                      "Accept-Language": "zh-Hans",
                    },
                  },
                  name: "roadwayName",
                  label: "所在巷道名",
                  required: true,
                },
                {
                  type: "select",
                  source: {
                    method: "get",
                    url: "/api/WCSMS/options/getRackOption",
                    adaptor:
                      'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                    headers: {
                      "Accept-Language": "zh-Hans",
                    },
                  },
                  name: "rackName",
                  label: "所在货架名",
                  required: true,
                },
                {
                  type: "select",
                  source: {
                    method: "get",
                    url: "/api/WCSMS/options/getTrayDirectOption",
                    adaptor:
                      'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                    headers: {
                      "Accept-Language": "zh-Hans",
                    },
                  },
                  name: "trayDirectDesc",
                  label: "托盘方向",
                  required: true,
                },
                {
                  type: "select",
                  source: {
                    method: "get",
                    url: "/api/WCSMS/options/getBinErrOption",
                    adaptor:
                      'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                    headers: {
                      "Accept-Language": "zh-Hans",
                    },
                  },
                  name: "binErrFlagDesc",
                  label: "库位异常类型",
                  required: true,
                },
                {
                  type: "input-text",
                  name: "binErrMsg",
                  label: "库位异常说明",
                },
                {
                  type: "input-text",
                  name: "palletBarcode",
                  label: "托盘号",
                },
                {
                  type: "input-text",
                  name: "inTime",
                  label: "入库时间",
                  required: true,
                },
                {
                  type: "select",
                  name: "usedFlag",
                  label: "启用标志",
                  options: [
                    {
                      label: "禁用",
                      value: "0",
                    },
                    {
                      label: "启用",
                      value: "1",
                    },
                  ],
                  required: true,
                },
              ],
            },
          },
        },
        "bulkActions",
      ],
    },
  ],
  asideResizor: false,
  pullRefresh: {
    disabled: true,
  },
  regions: ["body", "header"],
  aside: [],
};
