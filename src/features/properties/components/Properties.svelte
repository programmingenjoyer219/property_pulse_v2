<script lang="ts">
	import PropertyCard from "$features/properties/components/PropertyCard.svelte";
	import {
		propertiesToDisplay,
		showMoreProperties,
		canShowMoreProperties,
	} from "$lib/stores/properties";

	$: properties = $propertiesToDisplay as Property[];
</script>

<section id="properties" class="section bg-gray-50">
	<div class="container mx-auto space-y-8">
		<div class="properties-grid">
			{#each properties as property, index (index)}
				<PropertyCard {property} />
			{/each}
		</div>

		{#if $canShowMoreProperties}
			<div class="flex items-center justify-center">
				<button on:click={showMoreProperties} class="button-primary">
					Show More
				</button>
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
