<script lang="ts">
	import type { PageData } from "./$types";
	import Hero from "$components/Hero.svelte";
	import InfoCard from "$components/InfoCard.svelte";
	import Properties from "$components/Properties.svelte";
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
		<div class="grid grid-rows-2 gap-6 md:gap-10 md:grid-rows-1 md:grid-cols-2">
			<!-- for renters -->
			<InfoCard
				imageLink="/assets/for_renters.svg"
				title={"For Renters"}
				content={"Find your dream rental property. Bookmark properties and contact owners."}
			>
				<a href="#properties" class="button-primary">Browse Properties</a>
			</InfoCard>
			<!-- for property owners -->
			<InfoCard
				imageLink="/assets/for_owners.svg"
				title={"For Property Owners"}
				content={"List your properties and reach potential tenants. Rent as an airbnb or a long term rental."}
			>
				{#if loggedIn}
					<a href="/add" class="button-primary">Add Property</a>
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
