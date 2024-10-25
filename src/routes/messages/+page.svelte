<script lang="ts">
	import CustomHeader from "$components/CustomHeader.svelte";
	import MessageTable from "$features/messages/components/MessageTable.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<CustomHeader>
	<div class="flex items-center gap-2 text-4xl sm:text-5xl md:text-6xl">
		<h1 class="font-extrabold">Messages</h1>
		<i class="ri-message-2-fill"></i>
	</div>
</CustomHeader>

<section class="px-4 py-[2rem] bg-gray-50">
	{#if data?.error}
		<div class="text-center text-gray-400/75 flex flex-col gap-4">
			<img src="/assets/500_alt.svg" alt="" class="w-[70vw] max-w-xl mx-auto" />
			<p class="text-red-400 font-medium text-2xl">
				{data?.error || "Oops... something went wrong"}
			</p>
			<a href="/" class="button-primary w-fit mx-auto">Go back to home page</a>
		</div>
	{:else if data?.messages.length === 0}
		<div class="text-center text-gray-400/75 space-y-4">
			<img
				src="/assets/no_messages.svg"
				alt=""
				class="w-[70vw] max-w-xl mx-auto"
			/>
			<p class="text-lg sm:text-2xl font-semibold">No messages</p>
		</div>
	{:else}
		<div
			class="min-h-[85vh] mx-auto py-4 px-2 sm:px-6 rounded-md bg-white shadow-md flex flex-col gap-4"
		>
			<MessageTable messages={data?.messages} />
		</div>
	{/if}
</section>
