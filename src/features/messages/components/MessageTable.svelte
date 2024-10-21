<script lang="ts">
	import MessageRow from "./MessageRow.svelte";

	export let messages: Message[];
</script>

<ul class="flex flex-col gap-2">
	{#each messages as message}
		<li>
			<MessageRow {message} />
		</li>
	{/each}
</ul>
