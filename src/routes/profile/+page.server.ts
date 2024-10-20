import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import { dbGetPropertiesByEmail } from "$features/properties/db/read.js";

export const load: PageServerLoad = async ({ parent, depends }) => {
	depends("app:profile");
	const { session } = await parent();
	if (!session) throw redirect(307, "/");
	try {
		const properties = await dbGetPropertiesByEmail(session?.user?.email);
		return { properties, error: null };
	} catch (error) {
		console.error(error);
		return { properties: [], error: "Failed to fetch properties." };
	}
};
