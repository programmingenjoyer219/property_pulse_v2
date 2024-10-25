<script lang="ts">
	import AddPropertyForm from "$features/properties/forms/add/AddPropertyForm.svelte";
	import CustomHeader from "$components/CustomHeader.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<CustomHeader>
	<div class="flex items-center gap-2 text-4xl sm:text-5xl md:text-6xl">
		<h1 class="font-extrabold">Add Property</h1>
		<i class="ri-community-fill"></i>
	</div>
</CustomHeader>

<section class="px-4 py-[2rem] bg-gray-50">
	<div
		class="container mx-auto max-w-3xl p-4 sm:px-6 bg-white rounded-md shadow-md space-y-8"
	>
		<AddPropertyForm owner_email={data?.session?.user?.email} />
	</div>
</section>
