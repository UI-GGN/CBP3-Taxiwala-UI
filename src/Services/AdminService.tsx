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
	getAllVendors: async function () {
		const response = await api.request({
			url: "/vendor",
			method: "GET",
		});
		return response.data;
	},
	getAllVehicles: async function () {
		const response = await api.request({
			url: "/vehicle",
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
	updateRequestStatus: async function (body: any, params: { id: number }) {
		return await api.request({
			url: `/cab-request/${params.id}`,
			method: "PUT",
			data: body,
		});
	},
	createVendor: async function (body: any) {
		return await api.request({
			url: "/vendor",
			method: "POST",
			data: body,
		});
	},
};
