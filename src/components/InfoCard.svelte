<script lang="ts">
	export let title: string;
	export let content: string;
	export let imageLink: string;
</script>

<div class="rounded-md p-6 shadow-lg bg-white">
	<img src={imageLink} alt="" class="h-[200px] min-[460px]:mb-8 mx-auto" />
	<h2 class="text-2xl font-bold text-gray-700 mb-2 sm:text-3xl">
		{title}
	</h2>
	<p class="mb-8 sm:text-lg">
		{content}
	</p>
	<slot></slot>
</div>
