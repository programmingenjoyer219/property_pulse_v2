import { redirect } from "@sveltejs/kit";
import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { dbGetPropertyById } from "$features/properties/db/read";
import {
	extractEditPropertyFormData,
	validateEditPropertyFormData,
} from "$features/properties/forms/edit/validation";
import { dbEditProperty } from "$features/properties/db/update";

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const editPropertyFormData = extractEditPropertyFormData(formData);
		const { isValidated, formErrors } =
			validateEditPropertyFormData(editPropertyFormData);
		if (isValidated) {
			console.log("updating property...");
			try {
				await dbEditProperty(editPropertyFormData);
			} catch (err) {
				console.error(err);
				return fail(400, {
					formErrors: {
						dbError: "Oops... something went wrong. Try again later",
					},
				});
			}
			return redirect(307, `/properties/${editPropertyFormData.id}`);
		} else {
			return fail(400, { formErrors });
		}
	},
};

export const load: PageServerLoad = async ({ params, parent }) => {
	const { session } = await parent();
	if (!session) throw redirect(307, "/");
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
