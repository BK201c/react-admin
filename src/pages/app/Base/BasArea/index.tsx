import schemaRender from "@/utils/schemaRender";

const schema = {
  type: "page",
  title: "区域管理",
  body: [
    {
      type: "crud",
      draggable: true,
      api: {
        method: "get",
        url: "/api/WCSMS/basArea/getList",
        requestAdaptor: "",
        adaptor:
          'return {\r\n  "status": response.data.status,\r\n  "msg": response.data.msg,\r\n  "data": {\r\n    "items": response.data.data.items,\r\n    "total": response.data.data.totalCount\r\n  }\r\n}',
        messages: {},
        replaceData: false,
        data: {
          "&": "$$",
          skipCount: "${(page - 1) * perPage}",
          maxResultCount: "${perPage}",
          sdType: "${sdTypeDesc}",
          binSplitFlag: "${binSplitFlagDesc}",
        },
      },
      columns: [
        {
          name: "areaNo",
          label: "区域编码",
          type: "text",
          searchable: {
            type: "input-text",
            name: "areaNo",
            label: "区域编码",
          },
        },
        {
          name: "areaName",
          label: "区域名称",
          type: "text",
          searchable: {
            type: "input-text",
            name: "areaName",
            label: "区域名称",
          },
        },
        {
          name: "binSplitFlagDesc",
          label: "库位拆分类型",
          type: "text",
          searchable: {
            type: "select",
            source: {
              method: "get",
              url: "/api/WCSMS/options/getBinSplitFlagOption",
              adaptor:
                'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
              headers: {
                "Accept-Language": "zh-Hans",
              },
            },
          },
        },
        {
          name: "sdTypeDesc",
          label: "伸工位类型",
          type: "text",
          searchable: {
            type: "select",
            source: {
              method: "get",
              url: "/api/WCSMS/options/getSdTypeOption",
              adaptor:
                'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
              headers: {
                "Accept-Language": "zh-Hans",
              },
            },
          },
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
                      method: "put",
                      url: "/api/WCSMS/basArea/update",
                      adaptor:
                        'return {\r\n  "status": response.data.status,\r\n  "msg": response.data.msg,\r\n  "data": response.data.data,\r\n}',
                      messages: {},
                      replaceData: false,
                      data: {
                        "&": "$$",
                        id: "${id}",
                        binSplitFlag: "${binSplitFlag}",
                        sdType: "${sdTypeDesc}",
                      },
                      requestAdaptor: "",
                      dataType: "json",
                    },
                    body: [
                      {
                        type: "input-text",
                        name: "areaNo",
                        label: "区域编码",
                        required: true,
                      },
                      {
                        type: "input-text",
                        name: "areaName",
                        label: "区域名称",
                        required: true,
                      },
                      {
                        name: "binSplitFlagDesc",
                        label: "库位拆分类型",
                        type: "select",
                        source: {
                          method: "get",
                          url: "/api/WCSMS/options/getBinSplitFlagOption",
                          adaptor:
                            'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                          headers: {
                            "Accept-Language": "zh-Hans",
                          },
                        },
                        required: true,
                      },
                      {
                        type: "select",
                        name: "sdTypeDesc",
                        label: "伸工位类型",
                        source: {
                          method: "get",
                          url: "/api/WCSMS/options/getSdTypeOption",
                          adaptor:
                            'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                          headers: {
                            "Accept-Language": "zh-Hans",
                          },
                        },
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
                method: "put",
                url: "/api/WCSMS/basArea/create",
                adaptor:
                  'return {\r\n  "status": response.data.status,\r\n  "msg": response.data.msg,\r\n  "data": response.data.data,\r\n}',
                messages: {},
                replaceData: false,
                data: {
                  "&": "$$",
                  skipCount: 0,
                  maxResultCount: 20,
                  binSplitFlag: "${binSplitFlagDesc}",
                  sdType: "${sdTypeDesc}",
                },
                requestAdaptor: "",
                dataType: "json",
              },
              body: [
                {
                  type: "input-text",
                  name: "areaNo",
                  label: "区域编码",
                  required: true,
                },
                {
                  type: "input-text",
                  name: "areaName",
                  label: "区域名称",
                  required: true,
                },
                {
                  name: "binSplitFlagDesc",
                  label: "库位拆分类型",
                  type: "select",
                  source: {
                    method: "get",
                    url: "/api/WCSMS/options/getBinSplitFlagOption",
                    adaptor:
                      'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                    headers: {
                      "Accept-Language": "zh-Hans",
                    },
                  },
                  required: true,
                },
                {
                  type: "select",
                  name: "sdTypeDesc ",
                  label: "伸工位类型",
                  source: {
                    method: "get",
                    url: "/api/WCSMS/options/getSdTypeOption",
                    adaptor:
                      'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                    headers: {
                      "Accept-Language": "zh-Hans",
                    },
                  },
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
export default schemaRender(schema);
