import { dbGetProperties } from "$features/properties/db/read";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	let properties: Property[] = [];
	let err = null;
	try {
		properties = await dbGetProperties();
	} catch (error) {
		console.error(error);
		err = "Failed to fetch properties";
	}
	return { properties, error: err };
};
