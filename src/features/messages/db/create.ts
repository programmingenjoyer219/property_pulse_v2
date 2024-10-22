import { supabase } from "$lib/supabaseClient.js";
import type { MessageFormData } from "../schema/index";

export async function dbAddMessageFormData(messageFormData: MessageFormData) {
	const { error } = await supabase.from("messages").insert([messageFormData]);
	if (error) {
		console.error("failed to add message to database.");
		throw new Error("" + error);
	}
}
