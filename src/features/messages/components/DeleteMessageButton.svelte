<script lang="ts">
	import { invalidate } from "$app/navigation";
	import { dbDeleteMessage } from "../db/delete";
	import toast from "svelte-french-toast";

	export let messageId: number;

	let loading = false;

	async function handleClick() {
		console.log("clicked");
		loading = true;
		try {
			await dbDeleteMessage(messageId);
			toast.success("Message deleted successfully");
		} catch (error) {
			toast.error("Failed to delete message");
		}
		invalidate("app:messages");
		loading = false;
	}
</script>

<button
	disabled={loading}
	on:click={handleClick}
	class="disabled:cursor-not-allowed disabled:bg-opacity-75 rounded-md px-2 py-1 bg-red-500 hover:bg-red-700 transition-colors duration-200 text-gray-50"
>
	<i class="ri-delete-bin-6-fill"></i>
</button>
