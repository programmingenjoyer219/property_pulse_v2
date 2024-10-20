<script lang="ts">
	export let title: string;
	export let content: string;
	export let imageLink: string;
</script>

<div
	class="info-card rounded-2xl p-6 border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
>
	<img src={imageLink} alt="" class="h-[200px] min-[460px]:mb-8 mx-auto" />
	<h2 class="text-2xl font-bold text-gray-700 mb-2 sm:text-3xl">
		{title}
	</h2>
	<p class="mb-8 sm:text-lg">
		{content}
	</p>
	<slot></slot>
</div>

<style>
	.info-card {
		display: grid;
		grid-template-rows: subgrid;
		grid-row: span 4;
	}
	@media (max-width: 680px) {
		.info-card {
			display: flex;
			flex-direction: column;
			justify-content: stretch;
		}
	}
</style>
