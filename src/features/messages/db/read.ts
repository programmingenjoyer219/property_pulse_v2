import { supabase } from "$lib/supabaseClient.js";

export async function dbGetMessages(
	receiver_email: string
): Promise<Message[]> {
	let { data: messages, error } = await supabase
		.from("messages")
		.select(
			`
      id,
      marked_as_read,
      content,
      sender_name,
      sender_email,
      sender_phone_number,
      created_at,
      properties (
        name
      )
    `
		)
		.eq("receiver_email", receiver_email);

	if (error) {
		console.error("failed to fetch messages");
		throw new Error("" + error);
	}

	return messages as unknown as Message[];
}

export async function dbGetMessageStatus(message_id: number) {
	let { data: message, error } = await supabase
		.from("messages")
		.select(`marked_as_read`)
		.eq("id", message_id);
	if (error) {
		console.error("failed to fetch message by id");
		throw new Error("" + error);
	}
	return message?.[0];
}
