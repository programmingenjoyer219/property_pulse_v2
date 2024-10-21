<script lang="ts">
	import { invalidate } from "$app/navigation";
	import { dbMarkMessageAsRead } from "../db/update";

	export let messageId: number;
	export let markedAsRead: boolean = false;

	let loading = false;

	async function handleClick() {
		console.log("clicked");
		loading = true;
		await dbMarkMessageAsRead(messageId);
		invalidate("app:messages");
		loading = false;
	}
</script>

<button
	on:click={handleClick}
	class="disabled:cursor-not-allowed disabled:bg-opacity-75 transition-colors duration-200 {markedAsRead
		? 'rounded-md px-2 py-1 bg-gray-400/75 space-x-1 text-gray-50 hover:bg-gray-400'
		: 'rounded-md px-2 py-1 bg-blue-500 hover:bg-blue-700 space-x-1 text-gray-50'}"
>
	{#if loading}
		<i class="ri-loader-4-line animate-spin"></i>
	{:else}
		<i class="ri-check-double-line"></i>
	{/if}
</button>
