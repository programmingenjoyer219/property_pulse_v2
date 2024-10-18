<script lang="ts">
	import PropertyCard from "$components/PropertyCard.svelte";
	import {
		propertiesStore,
		propertiesToDisplay,
		showMoreProperties,
	} from "$lib/stores/properties";

	$: properties = $propertiesToDisplay as Property[];
	$: displayShowMoreButton =
		$propertiesToDisplay.length < $propertiesStore.length;
</script>

<section id="properties" class="section bg-gray-50">
	<div class="container mx-auto space-y-8">
		<div class="properties-grid">
			{#each properties as property, index (index)}
				<PropertyCard {property} />
			{/each}
		</div>

		{#if displayShowMoreButton}
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
