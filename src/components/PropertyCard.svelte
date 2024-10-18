<script lang="ts">
	export let property: Property;
	$: ({
		id,
		name,
		type,
		street,
		city,
		state,
		zipcode,
		beds,
		baths,
		square_feet,
		nightly_rate,
		weekly_rate,
		monthly_rate,
		images,
	} = property);

	function displayRate() {
		if (nightly_rate) {
			return "$" + nightly_rate + "/nt";
		} else if (weekly_rate) {
			return "$" + weekly_rate + "/wk";
		} else {
			return "$" + monthly_rate + "/mt";
		}
	}
</script>

<a href="/properties/{id}" class="card-subgrid min-w-[280px] p-2">
	<!-- image -->
	<div
		class="relative h-[240px] rounded-2xl"
		style="background: url({images[0]}) center center / cover no-repeat;"
	>
		<!-- rate -->
		<span
			class="absolute top-4 left-4 bg-white font-bold text-blue-600 p-2 rounded-md sm:text-lg"
			>{displayRate()}</span
		>
	</div>
	<!-- name -->
	<p class="font-medium mt-2">{name}</p>
	<!-- type -->
	<p class="mb-2">{type}</p>
	<!-- location -->
	<div class="space-x-1">
		<i class="ri-map-pin-2-fill text-lg text-red-500"></i>
		<span class="">{city} {state}</span>
	</div>
</a>

<style>
	.card-subgrid {
		display: grid;
		grid-template-rows: subgrid;
		grid-row: span 5;
	}
</style>
