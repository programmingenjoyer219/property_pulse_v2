<script lang="ts">
	import "../app.css";
	import "remixicon/fonts/remixicon.css";
	import Navbar from "$components/Navbar.svelte";
	import Footer from "$components/Footer.svelte";
	import type { LayoutData } from "./$types";
	import { configureCloudinary } from "svelte-cloudinary";
	import {
		PUBLIC_CLOUDINARY_CLOUD_NAME,
		PUBLIC_CLOUDINARY_API_KEY,
	} from "$env/static/public";
	import { Toaster } from "svelte-french-toast";

	configureCloudinary({
		cloudName: PUBLIC_CLOUDINARY_CLOUD_NAME,
		apiKey: PUBLIC_CLOUDINARY_API_KEY,
	});

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
	<Toaster />
	<Navbar session={data.session} />
	<slot />
	<Footer />
</main>
