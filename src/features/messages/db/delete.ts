import { supabase } from "$lib/supabaseClient.js";

export async function dbDeleteMessage(message_id: number) {
	const { error } = await supabase
		.from("messages")
		.delete()
		.eq("id", message_id);

	if (error) {
		console.error("failed to delete message");
		throw new Error("" + error);
	}
}
