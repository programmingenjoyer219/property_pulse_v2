<script lang="ts">
	import { onMount } from "svelte";
	import { getCoordinatesFromLocation } from "../utils";

	export let street = "";
	export let city = "";
	export let state = "";
	export let zipcode = "";

	let lat = 0;
	let lng = 0;

	onMount(async () => {
		const coordinates = await getCoordinatesFromLocation(
			street,
			city,
			state,
			zipcode
		);
		lat = coordinates.lat;
		lng = coordinates.lng;
	});
</script>

<iframe
	title="map"
	class="h-[40vh] w-full"
	frameborder="0"
	scrolling="no"
	src="https://www.openstreetmap.org/export/embed.html?bbox=
	{lng - 0.005},{lat - 0.005},{lng + 0.005},{lat + 0.005}&layer=mapnik"
>
</iframe>
