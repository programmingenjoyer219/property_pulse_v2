import { z } from "zod";

export interface MessageFormData {
	property_id: number;
	sender_name: string;
	sender_email: string;
	receiver_email: string;
	sender_phone_number: string;
	content: string;
}

export const messageFormSchema = z.object({
	property_id: z
		.number({
			required_error: "Property ID is required",
		})
		.positive("Oops... something went wrong. Try again later."),

	sender_name: z
		.string({
			required_error: "Sender name is required",
		})
		.min(1, "Oops... something went wrong. Try again later."),

	sender_email: z
		.string({
			required_error: "Sender email is required",
		})
		.email("Oops... something went wrong. Try again later."),

	receiver_email: z
		.string({
			required_error: "Receiver email is required",
		})
		.email("Oops... something went wrong. Try again later."),

	sender_phone_number: z
		.string({
			required_error: "Phone number is required",
		})
		.regex(/^\+\d{1,3} \d{3} \d{3} \d{4}$/, "Invalid phone number format"),

	content: z
		.string({
			required_error: "Message content is required",
		})
		.min(1, "Message content cannot be empty"),
});
