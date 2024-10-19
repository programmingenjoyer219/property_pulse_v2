<script lang="ts">
	import "../app.css";
	import "remixicon/fonts/remixicon.css";
	import Navbar from "$components/Navbar.svelte";
	import Footer from "$components/Footer.svelte";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;
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

<main class="min-h-dvh">
	<Navbar session={data.session} />
	<slot />
	<Footer />
</main>
