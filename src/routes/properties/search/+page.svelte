<script lang="ts">
	import Hero from "$components/Hero.svelte";
	import PropertyCard from "$features/properties/components/PropertyCard.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<Hero />

<section id="properties" class="section bg-gray-50">
	<div class="container mx-auto space-y-8">
		{#if data.properties.length > 0}
			<div class="properties-grid">
				{#each data.properties as property, index (index)}
					<PropertyCard {property} />
				{/each}
			</div>
		{:else}
			<div class="text-center text-gray-400/75 space-y-4">
				<img
					src="/assets/no_search_results.svg"
					alt=""
					class="w-[70vw] max-w-xl mx-auto"
				/>
				<p class="text-2xl font-semibold">
					Couldn't find properties. Try searching something else.
				</p>
			</div>
		{/if}
	</div>
</section>

<style>
	.properties-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(264px, 1fr));
		column-gap: 1rem;
	}
</style>
