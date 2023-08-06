import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";

const client = new STSClient({
	region: import.meta.env.VITE_REGION,
	credentials: {
		accessKeyId: import.meta.env.VITE_ACCESS_ID,
		secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
	},
});

export const getIAMCreds = async () => {
	const roleToAssume = {
		RoleArn: import.meta.env.VITE_ROLE_ARM,
		RoleSessionName: import.meta.env.VITE_ROLE_SESSION_NAME,
		DurationSeconds: import.meta.env.VITE_SESSION_DURATION,
	};
	const command = new AssumeRoleCommand(roleToAssume);

	try {
		const data = await client.send(command);
		return data?.Credentials;
	} catch (error) {
		console.log("=====", error);
	} finally {
		/* empty */
	}
};
