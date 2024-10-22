import { messageFormSchema, type MessageFormData } from "../schema/index";

export function validateMessageFormData(messageFormData: MessageFormData) {
	const result = messageFormSchema.safeParse(messageFormData);
	if (!result.success) {
		const formatted = result.error.format();
		return { formErrors: formatted, isValidated: false };
	}
	return { formErrors: null, isValidated: true };
}

export function extractMessageFormData(formData: FormData): MessageFormData {
	return {
		property_id: Number(formData.get("property_id")),
		sender_name: String(formData.get("sender_name")),
		sender_email: String(formData.get("sender_email")),
		receiver_email: String(formData.get("receiver_email")),
		sender_phone_number: String(formData.get("sender_phone_number")),
		content: String(formData.get("content")),
	};
}
