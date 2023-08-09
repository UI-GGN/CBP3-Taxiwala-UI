import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";

const client = new STSClient({
	region: process.env.VITE_REGION,
	credentials: {
		accessKeyId: process.env.VITE_ACCESS_ID,
		secretAccessKey: process.env.VITE_SECRET_ACCESS_KEY,
	},
});

export const getIAMCreds = async () => {
	const roleToAssume = {
		RoleArn: process.env.VITE_ROLE_ARM,
		RoleSessionName: process.env.VITE_ROLE_SESSION_NAME,
		DurationSeconds: process.env.VITE_SESSION_DURATION,
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
