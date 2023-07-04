import { api } from "./ApiService/ApiConfig";

export const CabRequestService = {
  get: async function (id: string) {
    return await api.request({
      url: `/cab-request/employee/${id}`,
      method: "GET"
    });
  },
  getAll: async function () {
    return await api.request({
      url: "/cab-request",
      method: "GET"
    });
  },
  create: async function () {
    return await api.request({
      url: "/cab-request",
      method: "POST"
    });
  } 
};