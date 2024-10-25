import deepClone from "$lib/deepClone";
import { supabase } from "$lib/supabaseClient";
import type { EditPropertyFormData } from "../schema";

export async function dbEditProperty(propertyData: EditPropertyFormData) {
	const updatedPropertyData = deepClone(propertyData);
	delete updatedPropertyData.id;
	const { error } = await supabase
		.from("properties")
		.update(updatedPropertyData)
		.eq("id", propertyData.id);
	if (error) {
		console.error("failed to edit property data");
		throw new Error("" + error);
	}
}
