<script lang="ts">
	import type { PageData } from "./$types";
	import Hero from "$components/Hero.svelte";
	import InfoCard from "$features/properties/components/InfoCard.svelte";
	import Properties from "$features/properties/components/Properties.svelte";
	import { propertiesStore } from "$lib/stores/properties";
	import { SignIn } from "@auth/sveltekit/components";

	export let data: PageData;

	$: loggedIn = !!data.session;

	$propertiesStore = [
		...data.properties,
		...data.properties,
		...data.properties,
		...data.properties,
		...data.properties,
		...data.properties,
		...data.properties,
		...data.properties,
		...data.properties,
		...data.properties,
		...data.properties,
		...data.properties,
	];
</script>

<svelte:head>
	<title>PropertyPulse - Discover Your Perfect Rental</title>
	<meta
		name="keywords"
		content="rental properties, find apartments, house rentals, PropertyPulse"
	/>
	<meta
		name="description"
		content="Easily find and apply for your perfect rental property with PropertyPulse."
	/>
</svelte:head>

<Hero />

<section class="px-4 pt-[4rem] bg-gray-50">
	<div class="container-mod">
		<div class="info-card-grid">
			<!-- for renters -->
			<InfoCard
				imageLink="/assets/for_renters.svg"
				title={"For Renters"}
				content={"Find your dream rental property. Bookmark properties and contact owners."}
			>
				<a href="#properties" class="button-primary w-fit">Browse Properties</a>
			</InfoCard>
			<!-- for owners -->
			<InfoCard
				imageLink="/assets/for_owners.svg"
				title={"For Owners"}
				content={"List your properties and reach potential tenants. Rent as an airbnb or a long term rental."}
			>
				{#if loggedIn}
					<a href="/add" class="button-primary w-fit">Add Property</a>
				{:else}
					<SignIn>
						<svelte:fragment slot="submitButton">
							<i class="ri-google-fill text-xl"></i>
							<span>Login To Add Properties</span>
						</svelte:fragment>
					</SignIn>
				{/if}
			</InfoCard>
		</div>
	</div>
</section>

<Properties />

<style>
	.info-card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		column-gap: 1.5rem;
	}
	@media (max-width: 680px) {
		.info-card-grid {
			grid-template-columns: 1fr;
			grid-template-rows: auto auto;
			row-gap: 1.5rem;
		}
	}
</style>
