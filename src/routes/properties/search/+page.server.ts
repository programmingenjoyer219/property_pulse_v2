import { dbSearchProperties } from "$features/properties/db/read";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
	const propertyType = String(url.searchParams.get("type"));
	const searchQuery = String(url.searchParams.get("query"));
	try {
		const properties = await dbSearchProperties(
			searchQuery.trim().toLowerCase(),
			propertyType.trim()
		);
		return { properties };
	} catch (err) {
		throw error(500, { message: "Oops... something went wrong" });
	}
};
