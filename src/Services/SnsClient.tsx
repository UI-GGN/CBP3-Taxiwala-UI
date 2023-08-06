import { SNSClient } from "@aws-sdk/client-sns";
import {
	PublishCommand,
	SubscribeCommand,
	ListSubscriptionsByTopicCommand,
} from "@aws-sdk/client-sns";
import { getIAMCreds } from "./StsClient";
import { ICabRequest } from "../Interfaces";
import { convertTimeFormat } from "../utils/CabRequestHelper";

export const notifyVendor = async (
	phoneNumber: string,
	employeeDetailsForVendor: ICabRequest
) => {
	try {
		const creds = await getIAMCreds();
		const snsClient = new SNSClient({
			region: import.meta.env.VITE_REGION,
			credentials: {
				secretAccessKey: creds?.SecretAccessKey || "",
				accessKeyId: creds?.AccessKeyId || "",
				sessionToken: creds?.SessionToken || "",
			},
		});
		const { Subscriptions } = await snsClient.send(
			new ListSubscriptionsByTopicCommand({
				TopicArn: import.meta.env.VITE_TOPIC_ARN,
			})
		);
		const subscription = Subscriptions?.find(
			(Subscription) => Subscription?.Endpoint === phoneNumber
		);
		if (!subscription) {
			await snsClient.send(
				new SubscribeCommand({
					Protocol: "SMS",
					TopicArn: import.meta.env.VITE_TOPIC_ARN,
					Endpoint: phoneNumber,
				})
			);
		}
		await snsClient.send(
			new PublishCommand({
				Message: ` Hi, ${
					employeeDetailsForVendor.employeeName
				} needs a cab from ${employeeDetailsForVendor.pickupLocation} to ${
					employeeDetailsForVendor.dropLocation
				} on ${new Date(
					employeeDetailsForVendor.pickupTime
				).toDateString()} at ${convertTimeFormat(
					employeeDetailsForVendor.pickupTime
				)}.                   
                Employee contact info: ${employeeDetailsForVendor.phoneNumber}`,
				PhoneNumber: phoneNumber,
			})
		);
	} catch (err) {
		console.log("Oops", err);
	}
};
