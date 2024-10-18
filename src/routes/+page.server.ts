import type { PageServerLoad } from "./$types";
import { supabase } from "$lib/supabaseClient";

export const load: PageServerLoad = async () => {
	let properties: Property[] = [];
	let err = null;
	try {
		properties = await getProperties();
	} catch (error) {
		console.error(error);
		err = "Failed to fetch properties";
	}
	return { properties, error: err };
};

async function getProperties(): Promise<Property[]> {
	let { data: recentProperties, error } = await supabase
		.from("properties")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) {
		console.error("/ :: getProperties() :: Failed to fetch properties");
		throw new Error("" + error);
	}
	return recentProperties as Property[];
}
