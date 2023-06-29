import schemaRender from "@/utils/schemaRender";

const schema = {
  type: "page",
  title: "Dashboard",
  body: [
    {
      type: "crud",
      id: "u:9857116c70ad",
      draggable: true,
      api: {
        method: "get",
        url: "/api/WCSMS/basArea/getList",
        adaptor:
          'return {\r\n  "status": response.data.status,\r\n  "msg": response.data.msg,\r\n  "data": {\r\n    "items": response.data.data.items,\r\n    "total": response.data.data.totalCount\r\n  }\r\n}',
        messages: {},
        replaceData: false,
        headers: {
          "Accept-Language": "zh-Hans",
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkMxN0U0NjEyRDA2ODEwQ0U0MTJBRTU0MzMyNTREMjE3IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2ODc3NDcxMDksImV4cCI6MTcxOTI4MzEwOSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoyMDAwMyIsImF1ZCI6WyIwMDEtQkFTRSIsIjAwMS1JVEYiLCIwMDEtV0NTIiwiMDAxLVdNUyIsIjU5NC1JVEYiLCI1OTQtV0NTIiwiNTk0LVdNUyIsIjU5NFdtc1NlcnZpY2UiLCJCYXNlU2VydmljZSIsIkRpc0l0ZlNlcnZpY2UiLCJEaXNwYXRjaEludGVyZmFjZSIsIkRpc3BhdGNoU2VydmljZSIsIkxlc1NlcnZpY2UiLCJMT0NBTC1XQ1MiLCJMT0NBTC1XTVMiLCJQdWJsaWNHYXRld2F5IiwiUXVhcnR6U2VydmljZSIsIldjc0Jhc2VTZXJ2aWNlIiwiV0NTRFMiLCJXQ1NJUyIsIldDU01TIiwiV21zSXRmU2VydmljZSIsIldtc1NlcnZpY2UiXSwiY2xpZW50X2lkIjoicHVibGljLXdlYnNpdGUtY2xpZW50Iiwic3ViIjoiOGNlNTMxMGQtNzFlZS0wOTI1LTgyYWMtM2EwOWNkOWJkZWEyIiwiYXV0aF90aW1lIjoxNjg3NzQ3MTA5LCJpZHAiOiJsb2NhbCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6Iui2hee6p-euoeeQhuWRmCIsInBob25lX251bWJlciI6IjEyMzQ1IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJlbWFpbCI6InN1cGVyYWRtaW5AeHh4LmNuIiwiZW1haWxfdmVyaWZpZWQiOiJGYWxzZSIsIm5hbWUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNjg3NzQ3MTA5LCJzY29wZSI6WyIwMDEtQkFTRSIsIjAwMS1JVEYiLCIwMDEtV0NTIiwiMDAxLVdNUyIsIjU5NC1JVEYiLCI1OTQtV0NTIiwiNTk0LVdNUyIsIjU5NFdtc1NlcnZpY2UiLCJCYXNlU2VydmljZSIsIkRpc0l0ZlNlcnZpY2UiLCJEaXNwYXRjaEludGVyZmFjZSIsIkRpc3BhdGNoU2VydmljZSIsIkxlc1NlcnZpY2UiLCJMT0NBTC1XQ1MiLCJMT0NBTC1XTVMiLCJQdWJsaWNHYXRld2F5IiwiUXVhcnR6U2VydmljZSIsIldjc0Jhc2VTZXJ2aWNlIiwiV0NTRFMiLCJXQ1NJUyIsIldDU01TIiwiV21zSXRmU2VydmljZSIsIldtc1NlcnZpY2UiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.wrffqeaTbZuw2J3tyXDebLIBQFb5kcGOlBADLITrKPUWh43DR68so4XLA7gndQ5MSvqUpcLkHRhJjGdEev2x-74-MR3oi_Ig2lUUFE8C4mlgl886O-WEvKX3silsfAeP89IjsA8FrF8KTaPWoGIzdojljnjqr9V1Zi9e4eMBb8PSefIEMsGmOg-vaCT7i8U-Hc8cqa1-hc1mPfVwsdA2nSI7uImFaL1k-rLZ9DZiS0CSiX2qQYhZ8engEIpyH1dBSRUkqaiFTjdYRYUhPGOLykYtblKQqB3AMiYYKYMnC1NxhziT3QAHpDIeQAyWPEvV2w-ZS6MgZtwf69cWNurARQ",
        },
        data: {
          "&": "$$",
          areaNo: "${areaNo}",
          areaName: "${areaName}",
          skipCount: "${(page - 1) * perPage}",
          maxResultCount: "${perPage}",
        },
        requestAdaptor: "",
        dataType: "form-data",
      },
      columns: [
        {
          name: "areaNo",
          label: "区域编码",
          type: "text",
          id: "u:e21c56b2b60f",
          searchable: {
            type: "input-text",
            name: "areaName",
            label: "区域编码",
            id: "u:f2cb8c98f1c1",
          },
        },
        {
          name: "areaName",
          label: "区域名称",
          type: "text",
          id: "u:47de43278931",
          searchable: {
            type: "input-text",
            name: "areaName",
            label: "区域名称",
            id: "u:ede7610c79d2",
          },
        },
        {
          type: "text",
          label: "库位拆分类型",
          name: "binSplitFlagDesc",
          id: "u:771eafb75f40",
          searchable: {
            type: "select",
            id: "u:175ed52c13c1",
          },
        },
        {
          type: "mapping",
          label: "启用标识",
          name: "usedFlag",
          map: {
            "0": "<span class='label label-danger'>禁用</span>",
            "1": "<span class='label label-success'>启用</span>",
            "*": "${usedFlag}",
          },
          id: "u:7e5b91157121",
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
                    api: "xxx/update",
                    body: [
                      {
                        name: "inNo",
                        label: "入库单号",
                        id: "u:e21c56b2b60f",
                        searchable: {
                          type: "input-text",
                          name: "inNo",
                          label: "入库单号",
                          id: "u:f2cb8c98f1c1",
                        },
                        type: "input-text",
                      },
                      {
                        name: "cvTypeName",
                        label: "客供类型",
                        id: "u:47de43278931",
                        type: "input-text",
                      },
                      {
                        name: "cvCode",
                        label: "供方编码",
                        sortable: false,
                        toggled: true,
                        id: "u:94a85ddd1a3d",
                        placeholder: "-",
                        type: "input-text",
                      },
                      {
                        name: "cvName",
                        label: "供方名称",
                        id: "u:f58159f5330a",
                        type: "input-text",
                      },
                      {
                        name: "docTypeName",
                        label: "单据类型",
                        id: "u:ac205322f9d9",
                        searchable: {
                          type: "select",
                          name: "docTypeCode",
                          label: "单据类型",
                          id: "u:03d6802f3cbf",
                          source: {
                            method: "get",
                            url: "/apiTest/api/WmsService/options/getDocTypeOption",
                            requestAdaptor:
                              'api.headers = {\r\n    "Proprietorcode": "594000000000000",\r\n    "Whouseno": "594",\r\n    "Accept-Language": "zh-Hans"\r\n};\r\nreturn api',
                            adaptor:
                              'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items\r\n  }\r\n}',
                            messages: {},
                            headers: {
                              Authorization:
                                "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkMxN0U0NjEyRDA2ODEwQ0U0MTJBRTU0MzMyNTREMjE3IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2ODc2NzI3NDcsImV4cCI6MTcxOTIwODc0NywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoyMDAwMyIsImF1ZCI6WyIwMDEtQkFTRSIsIjAwMS1JVEYiLCIwMDEtV0NTIiwiMDAxLVdNUyIsIjU5NC1JVEYiLCI1OTQtV0NTIiwiNTk0LVdNUyIsIjU5NFdtc1NlcnZpY2UiLCJCYXNlU2VydmljZSIsIkRpc0l0ZlNlcnZpY2UiLCJEaXNwYXRjaEludGVyZmFjZSIsIkRpc3BhdGNoU2VydmljZSIsIkxlc1NlcnZpY2UiLCJMT0NBTC1XQ1MiLCJMT0NBTC1XTVMiLCJQdWJsaWNHYXRld2F5IiwiUXVhcnR6U2VydmljZSIsIldjc0Jhc2VTZXJ2aWNlIiwiV0NTRFMiLCJXQ1NJUyIsIldDU01TIiwiV21zSXRmU2VydmljZSJdLCJjbGllbnRfaWQiOiJwdWJsaWMtd2Vic2l0ZS1jbGllbnQiLCJzdWIiOiI4Y2U1MzEwZC03MWVlLTA5MjUtODJhYy0zYTA5Y2Q5YmRlYTIiLCJhdXRoX3RpbWUiOjE2ODc2NzI3NDcsImlkcCI6ImxvY2FsIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoi6LaF57qn566h55CG5ZGYIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJlbWFpbCI6InN1cGVyYWRtaW5AeHh4LmNuIiwiZW1haWxfdmVyaWZpZWQiOiJGYWxzZSIsIm5hbWUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNjg3NjcyNzQ3LCJzY29wZSI6WyIwMDEtQkFTRSIsIjAwMS1JVEYiLCIwMDEtV0NTIiwiMDAxLVdNUyIsIjU5NC1JVEYiLCI1OTQtV0NTIiwiNTk0LVdNUyIsIjU5NFdtc1NlcnZpY2UiLCJCYXNlU2VydmljZSIsIkRpc0l0ZlNlcnZpY2UiLCJEaXNwYXRjaEludGVyZmFjZSIsIkRpc3BhdGNoU2VydmljZSIsIkxlc1NlcnZpY2UiLCJMT0NBTC1XQ1MiLCJMT0NBTC1XTVMiLCJQdWJsaWNHYXRld2F5IiwiUXVhcnR6U2VydmljZSIsIldjc0Jhc2VTZXJ2aWNlIiwiV0NTRFMiLCJXQ1NJUyIsIldDU01TIiwiV21zSXRmU2VydmljZSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwd2QiXX0.SD_Ynj3hFT-9GP_KfXhdgV3b_xhgqwFltGo40PBVdaArYbw7hvmVbknV836pultNpY7NS1JOhWnqrEcipqGpauuClbtgPw8QL5LmHpTQ7E6lnKZ_WObqketM34EinzvkZ3JWPv-C2jAcOxwwj7APfU8U5abmxGjvfjr7lP1o7m-Oo4OPjpgquuuFXlDChqifjRM32rfYzZ_0Kb-",
                            },
                            data: {
                              code: "IN",
                            },
                          },
                          multiple: false,
                          searchable: false,
                        },
                        type: "input-text",
                      },
                      {
                        name: "sourceByDesc",
                        label: "数据来源",
                        id: "u:617c1e137e7c",
                        type: "input-text",
                      },
                    ],
                    id: "u:2b74440b04ac",
                  },
                ],
                type: "dialog",
                id: "u:9d88492a21d5",
              },
              id: "u:f32d10115c53",
            },
          ],
          id: "u:ec4f82d2fa4b",
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
          id: "u:b30e772aa612",
        },
      ],
      features: ["filter", "update", "create", "bulkDelete"],
      filterColumnCount: 3,
      autoGenerateFilter: {
        columnsNum: 4,
        showBtnToolbar: true,
      },
      footable: {
        expand: "first",
        accordion: true,
      },
      perPageAvailable: [10, 20, 50],
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
            body: [
              {
                type: "form",
                api: {
                  method: "post",
                  url: "/apiTest/api/WCSMS/basArea/getList",
                  requestAdaptor: "",
                  adaptor:
                    'return {\r\n  "status": 0,\r\n  "msg": "",\r\n  "data": {\r\n    "items": response.data.data.items,\r\n    "total": response.data.data.total\r\n  }\r\n}',
                  messages: {},
                  replaceData: false,
                  headers: {
                    "Accept-Language": "zh-Hans",
                    Authorization:
                      "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkMxN0U0NjEyRDA2ODEwQ0U0MTJBRTU0MzMyNTREMjE3IiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2ODc3NDcxMDksImV4cCI6MTcxOTI4MzEwOSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoyMDAwMyIsImF1ZCI6WyIwMDEtQkFTRSIsIjAwMS1JVEYiLCIwMDEtV0NTIiwiMDAxLVdNUyIsIjU5NC1JVEYiLCI1OTQtV0NTIiwiNTk0LVdNUyIsIjU5NFdtc1NlcnZpY2UiLCJCYXNlU2VydmljZSIsIkRpc0l0ZlNlcnZpY2UiLCJEaXNwYXRjaEludGVyZmFjZSIsIkRpc3BhdGNoU2VydmljZSIsIkxlc1NlcnZpY2UiLCJMT0NBTC1XQ1MiLCJMT0NBTC1XTVMiLCJQdWJsaWNHYXRld2F5IiwiUXVhcnR6U2VydmljZSIsIldjc0Jhc2VTZXJ2aWNlIiwiV0NTRFMiLCJXQ1NJUyIsIldDU01TIiwiV21zSXRmU2VydmljZSIsIldtc1NlcnZpY2UiXSwiY2xpZW50X2lkIjoicHVibGljLXdlYnNpdGUtY2xpZW50Iiwic3ViIjoiOGNlNTMxMGQtNzFlZS0wOTI1LTgyYWMtM2EwOWNkOWJkZWEyIiwiYXV0aF90aW1lIjoxNjg3NzQ3MTA5LCJpZHAiOiJsb2NhbCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6Iui2hee6p-euoeeQhuWRmCIsInBob25lX251bWJlciI6IjEyMzQ1IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJlbWFpbCI6InN1cGVyYWRtaW5AeHh4LmNuIiwiZW1haWxfdmVyaWZpZWQiOiJGYWxzZSIsIm5hbWUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNjg3NzQ3MTA5LCJzY29wZSI6WyIwMDEtQkFTRSIsIjAwMS1JVEYiLCIwMDEtV0NTIiwiMDAxLVdNUyIsIjU5NC1JVEYiLCI1OTQtV0NTIiwiNTk0LVdNUyIsIjU5NFdtc1NlcnZpY2UiLCJCYXNlU2VydmljZSIsIkRpc0l0ZlNlcnZpY2UiLCJEaXNwYXRjaEludGVyZmFjZSIsIkRpc3BhdGNoU2VydmljZSIsIkxlc1NlcnZpY2UiLCJMT0NBTC1XQ1MiLCJMT0NBTC1XTVMiLCJQdWJsaWNHYXRld2F5IiwiUXVhcnR6U2VydmljZSIsIldjc0Jhc2VTZXJ2aWNlIiwiV0NTRFMiLCJXQ1NJUyIsIldDU01TIiwiV21zSXRmU2VydmljZSIsIldtc1NlcnZpY2UiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.wrffqeaTbZuw2J3tyXDebLIBQFb5kcGOlBADLITrKPUWh43DR68so4XLA7gndQ5MSvqUpcLkHRhJjGdEev2x-74-MR3oi_Ig2lUUFE8C4mlgl886O-WEvKX3silsfAeP89IjsA8FrF8KTaPWoGIzdojljnjqr9V1Zi9e4eMBb8PSefIEMsGmOg-vaCT7i8U-Hc8cqa1-hc1mPfVwsdA2nSI7uImFaL1k-rLZ9DZiS0CSiX2qQYhZ8engEIpyH1dBSRUkqaiFTjdYRYUhPGOLykYtblKQqB3AMiYYKYMnC1NxhziT3QAHpDIeQAyWPEvV2w-ZS6MgZtwf69cWNurARQ",
                  },
                  data: {
                    "&": "$$",
                    skipCount: 0,
                    maxResultCount: 20,
                    areaNo: "${areaNo}",
                    areaName: "${areaName}",
                  },
                },
                body: [
                  {
                    type: "input-text",
                    name: "areaNo",
                    label: "区域编码",
                    id: "u:d4d449c2cfc9",
                  },
                  {
                    type: "input-text",
                    name: "areaName",
                    label: "区域名称",
                    id: "u:3272c2124452",
                  },
                  {
                    type: "input-text",
                    name: "binSplitFlagDesc",
                    label: "库位拆分类型",
                    id: "u:cdf4a22db4d7",
                  },
                  {
                    type: "select",
                    name: "usedFlag",
                    label: "启用标识",
                    id: "u:6e94e3862d93",
                  },
                ],
                id: "u:bc1f74092f5c",
              },
            ],
            type: "dialog",
            id: "u:261a84acfe2a",
          },
          id: "u:4d783b94372c",
        },
        "bulkActions",
      ],
      keepItemSelectionOnPageChange: false,
      perPage: 2,
      alwaysShowPagination: true,
      maxKeepItemSelectionLength: 100,
      pageField: "page",
      syncResponse2Query: false,
      perPageField: "perPage",
      syncLocation: false,
      footerToolbar: [
        {
          type: "statistics",
        },
        {
          type: "pagination",
          align: "right",
        },
      ],
    },
  ],
};

export default schemaRender(schema);
