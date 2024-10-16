<script lang="ts">
	export let title: string;
	export let content: string;
</script>

<div class="rounded-md p-6 shadow-md bg-gray-100">
	<h2 class="text-2xl font-bold text-gray-800 mb-4 sm:text-3xl">
		{title}
	</h2>
	<p class="mb-6 sm:text-lg">
		{content}
	</p>
	<slot></slot>
</div>
