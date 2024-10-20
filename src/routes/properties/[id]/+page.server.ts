import { supabase } from "$lib/supabaseClient.js";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	try {
		const { id: property_id } = params;
		const property = await getPropertyById(property_id);
		return { property };
	} catch (err) {
		console.error(err);
		return error(404, { message: "Property not found" });
	}
};

async function getPropertyById(id: string): Promise<Property> {
	let { data: property, error } = await supabase
		.from("properties")
		.select("*")
		.eq("id", id);

	if (error) {
		console.error(
			"/properties/[id] :: getPropertyById() :: Failed to fetch property by id"
		);
		throw new Error("" + error);
	}

	if (property?.length === 0) {
		console.error(
			"/properties/[id] :: getPropertyById() :: Failed to fetch property by id"
		);
		throw new Error("Property not found");
	}

	return property ? property[0] : null;
}
