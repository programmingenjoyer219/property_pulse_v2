import { supabase } from "$lib/supabaseClient";

export async function dbDeleteProperty(
	property_id: number
): Promise<{ success: boolean; error: null | string }> {
	console.log(`property to be deleted: ${property_id}`);

	const { error } = await supabase
		.from("properties")
		.delete()
		.eq("id", property_id);

	if (error) {
		console.error("failed to delete property");
		console.error(error);
		return { success: false, error: "failed to delete property" };
	}

	return { success: true, error: null };
}
