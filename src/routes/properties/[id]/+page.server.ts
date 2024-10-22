import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { dbGetPropertyById } from "$features/properties/db/read";
import {
	extractMessageFormData,
	validateMessageFormData,
} from "$features/messages/forms/validation";
import { dbAddMessageFormData } from "$features/messages/db/create";

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const messageFormData = extractMessageFormData(formData);
		const { isValidated, formErrors } =
			validateMessageFormData(messageFormData);
		if (isValidated) {
			console.log("adding message to db...");
			try {
				await dbAddMessageFormData(messageFormData);
			} catch (err) {
				console.error(err);
				return fail(400, {
					formErrors: {
						dbError: "Oops... something went wrong. Try again later",
					},
				});
			}
			return { success: "message sent successfully!" };
		} else {
			return fail(400, { formErrors });
		}
	},
};

export const load: PageServerLoad = async ({ params }) => {
	try {
		const { id: property_id } = params;
		const property = await dbGetPropertyById(property_id);
		return property
			? { property }
			: error(404, { message: "Property not found" });
	} catch (err) {
		console.error(err);
		return error(404, { message: "Property not found" });
	}
};
