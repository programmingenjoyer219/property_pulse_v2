<script lang="ts">
	import { onMount } from "svelte";

	export let street = "";
	export let city = "";
	export let state = "";
	export let zipcode = "";
	let lat = 0;
	let lng = 0;

	onMount(async () => {
		const coordinates = await fetchCoordinates();
		lat = coordinates.lat;
		lng = coordinates.lng;
	});

	async function fetchCoordinates(): Promise<{
		lat: number;
		lng: number;
		status: number;
	}> {
		const response = await fetch("/api/map", {
			method: "POST",
			body: JSON.stringify({ street, city, state, zipcode }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await response.json();
		return result;
	}
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
