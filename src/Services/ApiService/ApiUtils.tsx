import { useEffect } from "react";
import { useState } from "react";

const apiStatus = {
	loading: "loading",
	complete: "complete",
	error: "error",
};

export const GetApiEffect = (service: any) => {
	const [status, setStatus] = useState(apiStatus.loading);
	const [data, setData] = useState(null);

	useEffect(() => {
		const callService = async () => {
			const response = await service();
			console.log(response);
			setData(response);
		};

		try {
			callService();
			setStatus(apiStatus.complete);
		} catch (error) {
			setStatus(apiStatus.error);
		}
	}, []);

	return [status === apiStatus.loading, status === apiStatus.error, data];
};
