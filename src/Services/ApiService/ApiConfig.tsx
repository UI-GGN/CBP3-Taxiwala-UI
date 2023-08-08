import axios from "axios";

export const api = axios.create({
	baseURL: "https://cab-schedule-serverless.vercel.app/api/v1",
});

api.interceptors.response.use(undefined, (error) => {
	return Promise.reject(error);
});

export const loginapi = axios.create({
	baseURL: "https://cbp-taxiwala-backend-x1cd.vercel.app/api/v1",
});

loginapi.interceptors.response.use(undefined, (error) => {
	return Promise.reject(error);
});
