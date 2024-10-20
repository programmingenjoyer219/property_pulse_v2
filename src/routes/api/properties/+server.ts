import { supabase } from "$lib/supabaseClient.js";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

// DELETE : /api/properties
export const DELETE: RequestHandler = async ({ request, locals }) => {
	try {
		const session = await locals.auth();
		if (!session) {
			return json(
				{ success: false, error: "Session does not exist" },
				{ status: 403 }
			);
		}
		const data = await request.json();
		await deletePropertyById(data.property_id);
		console.log(data);
		return json({ success: true, error: null }, { status: 200 });
	} catch (error) {
		console.error(error);
		return json(
			{ success: false, error: "Oops... something went wrong, try later." },
			{ status: 500 }
		);
	}
};

async function deletePropertyById(property_id: number) {
	if (!property_id) {
		console.error(
			"/api/properties :: performValidation() :: Failed to perform validation"
		);
		throw new Error(
			`invalid value passed or value not provided.\nproperty_id: ${property_id}`
		);
	}

	const { error } = await supabase
		.from("properties")
		.delete()
		.eq("id", property_id);

	if (error) {
		console.error(
			"/api/properties :: deletePropertyById() :: Failed to delete property"
		);
		throw new Error("" + error);
	}
}
