import { api } from "./ApiService/ApiConfig";

export const CabRequestService = {
  get: async function (params: { id: string }) {
    const response = await api.request({
      url: `/cab-request/employee/${params.id}`,
      method: "GET"
    });
    return response.data;
  },
  create: async function (body: any) {
    return await api.request({
      url: "/cab-request",
      method: "POST",
      data: body
    });
  } 
};
