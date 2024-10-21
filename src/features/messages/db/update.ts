import { supabase } from "$lib/supabaseClient.js";
import { dbGetMessageStatus } from "./read";

export async function dbMarkMessageAsRead(message_id: number) {
	const message = await dbGetMessageStatus(message_id);
	const { error } = await supabase
		.from("messages")
		.update({ marked_as_read: !message?.marked_as_read })
		.eq("id", message_id);
	if (error) {
		console.error("failed to update message status");
		throw new Error("" + error);
	}
}
