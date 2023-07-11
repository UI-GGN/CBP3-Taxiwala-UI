import { api } from "./ApiService/ApiConfig";

export const AdminService = {
	getAllRequests: async function () {
		const response = await api.request({
			url: "/cab-request",
			method: "GET",
		});
		return response.data;
	},
	getAllRoutes: async function () {
		const response = await api.request({
			url: "/cab-request",
			method: "GET",
		});
		return response.data;
	},
	create: async function () {
		return await api.request({
			url: "/cab-request",
			method: "POST",
		});
	},
};
