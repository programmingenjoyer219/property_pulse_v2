import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import { dbGetMessages } from "$features/messages/db/read.js";

export const load: PageServerLoad = async ({ parent, depends }) => {
	depends("app:messages");
	const { session } = await parent();
	if (!session) throw redirect(307, "/");
	try {
		const messages = await dbGetMessages(session?.user?.email as string);
		return { messages, error: null };
	} catch (error) {
		return { messages: [], error };
	}
};
