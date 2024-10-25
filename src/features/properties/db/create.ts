import { supabase } from "$lib/supabaseClient";
import type { AddPropertyFormData } from "../schema";

export async function dbAddProperty(propertyData: AddPropertyFormData) {
	const { data, error } = await supabase
		.from("properties")
		.insert([propertyData])
		.select("id");
	if (error) {
		console.error("failed to add property to database");
		throw new Error("" + error);
	}
	return data[0];
}
