<script lang="ts">
	import { PUBLIC_CLOUDINARY_CLOUD_NAME } from "$env/static/public";
	import { invalidate, goto } from "$app/navigation";
	import { dbDeleteProperty } from "../db/delete";
	import toast from "svelte-french-toast";

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

	let result: { success: boolean; error: null | string } = {
		success: true,
		error: null,
	};
	let loading = false;

	async function deleteProperty() {
		loading = true;
		if (!confirm(`Are you sure you want to delete the property : ${name}`)) {
			loading = false;
			return;
		}
		result = await dbDeleteProperty(id);
		if (result.success) {
			invalidate("app:profile");
			toast.success("Property deleted successfully");
		} else {
			toast.error("Failed to delete property");
		}
		loading = false;
	}
</script>

<div
	class="listing-card-subgrid p-3 mb-4 rounded-2xl border-2 border-gray-200 bg-white hover:shadow-lg transition-colors transition-shadow duration-200"
>
	<div
		class="h-[10rem] mb-4 rounded-xl mx-auto w-full"
		style="background: url(https://res.cloudinary.com/{PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_1280,h_800,g_center/c_limit,w_1280/f_webp,fl_awebp/q_auto/v1729834637/{images[0]}) center center / cover no-repeat;"
	></div>
	<p class="text-xl font-medium mb-2">{name}</p>
	<p class="mb-4">{street}, {city}, {state} - {zipcode}</p>

	{#if !result.success}
		<p class="error">{result.error}</p>
	{/if}

	<div class="flex flex-wrap gap-2">
		<button
			title="view property"
			on:click={() => goto(`/properties/${id}`)}
			disabled={loading}
			class="button-secondary hover:bg-green-100 hover:border-green-500 hover:text-green-500 text-gray-500/75"
		>
			<i class="ri-eye-fill text-lg"></i>
		</button>

		<button
			title="edit property"
			on:click={() => goto(`/properties/edit/${id}`)}
			disabled={loading}
			class="button-secondary hover:bg-blue-100 hover:border-blue-500 hover:text-blue-500 text-gray-500/75"
		>
			<i class="ri-edit-fill text-lg"></i>
		</button>

		<button
			title="delete property"
			on:click={deleteProperty}
			disabled={loading}
			class="button-secondary hover:bg-red-100 hover:border-red-500 hover:text-red-500 text-gray-500/75"
		>
			{#if loading}
				<i class="ri-delete-bin-6-fill text-lg animate-pulse text-red-500"></i>
			{:else}
				<i class="ri-delete-bin-6-fill text-lg"></i>
			{/if}
		</button>
	</div>
</div>

<style>
	.listing-card-subgrid {
		display: grid;
		grid-template-rows: subgrid;
		grid-row: span 5;
	}
</style>
