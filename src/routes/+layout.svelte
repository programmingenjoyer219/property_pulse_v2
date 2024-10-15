<script lang="ts">
	import "../app.css";
	import "remixicon/fonts/remixicon.css";
	import Navbar from "$components/Navbar.svelte";

	let loggedIn = true;
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
	<Navbar {loggedIn} />
	<slot />
	<!-- <Footer /> -->
</main>
