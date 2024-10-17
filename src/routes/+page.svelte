<script>
	import Hero from "$components/Hero.svelte";
	import InfoCard from "$components/InfoCard.svelte";

	let loggedIn = false;
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

<section class="section bg-blue-50">
	<div class="container-mod">
		<div class="grid grid-rows-2 gap-6 md:gap-10 md:grid-rows-1 md:grid-cols-2">
			<!-- for renters -->
			<InfoCard
				imageLink="/assets/for_renters.svg"
				title={"For Renters"}
				content={"Find your dream rental property. Bookmark properties and contact owners."}
			>
				<a href="/properties" class="button-primary">Browse Properties</a>
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
					<a href="/add" class="button-primary space-x-1">
						<i class="ri-google-fill"></i>
						<span>Login To Add Properties</span>
					</a>
				{/if}
			</InfoCard>
		</div>
	</div>
</section>
