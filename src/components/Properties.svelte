<script lang="ts">
	import PropertyCard from "$components/PropertyCard.svelte";

	export let properties: Property[] = [];
</script>

<section id="properties" class="section bg-gray-50">
	<div class="container mx-auto space-y-8">
		<div class="properties-grid">
			{#each properties as property (property.id)}
				<PropertyCard {property} />
			{/each}
		</div>

		<!-- <div class="flex items-center justify-center">
			<a href="/properties" class="button-primary"> Show More </a>
		</div> -->
	</div>
</section>

<style>
	.properties-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(264px, 1fr));
		column-gap: 1rem;
	}
</style>
