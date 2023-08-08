import { loginapi } from "./ApiService/ApiConfig";

export const LoginService = {
  login: async function (body: any) {
    const response = await loginapi.request({
      url: "/users/",
      method: "POST",
      data: body
    });
    return response.data;
  },
  getUser: async function (emailid: any) {
    const response = await loginapi.request({
      url: `/users/${emailid}/employeeId`,
      method: "GET",
    });
    return response.data;
  },
};
