import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { dbGetPropertyById } from "$features/properties/db/read";

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
