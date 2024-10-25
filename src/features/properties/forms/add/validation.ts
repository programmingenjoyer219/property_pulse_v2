import {
	addPropertyFormSchema,
	type AddPropertyFormData,
} from "$features/properties/schema";

export function validateAddPropertyFormData(
	addPropertyFormData: AddPropertyFormData
) {
	const result = addPropertyFormSchema.safeParse(addPropertyFormData);
	if (!result.success) {
		const formatted = result.error.format();
		return { formErrors: formatted, isValidated: false };
	}
	return { formErrors: null, isValidated: true };
}
