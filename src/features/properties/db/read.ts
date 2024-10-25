import { supabase } from "$lib/supabaseClient";

export async function dbGetProperties(): Promise<Property[]> {
	let { data: recentProperties, error } = await supabase
		.from("properties")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) {
		console.error("failed to fetch properties");
		throw new Error("" + error);
	}
	return recentProperties as Property[];
}

export async function dbGetPropertyById(id: string): Promise<Property | null> {
	let { data: properties, error } = await supabase
		.from("properties")
		.select("*")
		.eq("id", id);

	if (error) {
		console.error("failed to fetch property by id");
		throw new Error("" + error);
	}

	if (properties?.length === 0) {
		console.error("failed to fetch property by id");
		throw new Error("Property not found");
	}
	return properties ? properties[0] : null;
}

export async function dbGetPropertiesByEmail(
	owner_email: string | null | undefined
): Promise<Property[]> {
	let { data: properties, error } = await supabase
		.from("properties")
		.select("*")
		.eq("owner_email", owner_email);
	if (error) {
		console.error("failed to fetch properties");
		throw new Error("" + error);
	}
	return properties as Property[];
}

export async function dbSearchProperties(
	searchQuery: string,
	propertyType: string
): Promise<Property[]> {
	let query = `name.ilike.%${searchQuery}%,street.ilike.%${searchQuery}%,city.ilike.%${searchQuery}%,state.ilike.%${searchQuery}%,zipcode.ilike.%${searchQuery}%`;
	const { data: properties, error } = await supabase
		.from("properties")
		.select("*")
		.eq("type", propertyType)
		.or(query);
	if (error) {
		console.error("failed to get search results");
		throw new Error("" + error);
	}
	return properties;
}
