import {
	editPropertyFormSchema,
	type EditPropertyFormData,
} from "$features/properties/schema";

export function validateEditPropertyFormData(
	editPropertyFormData: EditPropertyFormData
) {
	const result = editPropertyFormSchema.safeParse(editPropertyFormData);
	if (!result.success) {
		const formatted = result.error.format();
		return { formErrors: formatted, isValidated: false };
	}
	return { formErrors: null, isValidated: true };
}

export function extractEditPropertyFormData(
	formData: FormData
): EditPropertyFormData {
	return {
		id: Number(formData.get("id")),
		name: String(formData.get("name")),
		type: String(formData.get("type")),
		description: String(formData.get("description")),
		street: String(formData.get("street")),
		city: String(formData.get("city")),
		state: String(formData.get("state")),
		zipcode: String(formData.get("zipcode")),
		beds: Number(formData.get("beds")),
		baths: Number(formData.get("baths")),
		square_feet: Number(formData.get("square_feet")),
		amenities: String(formData.getAll("amenities")[0]).split(",") as string[],
		nightly_rate:
			formData.get("nightly_rate") === ""
				? null
				: Number(formData.get("nightly_rate")),
		weekly_rate:
			formData.get("weekly_rate") === ""
				? null
				: Number(formData.get("weekly_rate")),
		monthly_rate:
			formData.get("monthly_rate") === ""
				? null
				: Number(formData.get("monthly_rate")),
	};
}
