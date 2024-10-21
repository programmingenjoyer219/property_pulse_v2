<script lang="ts">
	import UserListingsCard from "$features/properties/components/UserListingsCard.svelte";
	import CustomHeader from "$components/CustomHeader.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	$: ({ session, properties, error } = data);
	$: name = session?.user?.name ?? "John Doe";
	$: email = session?.user?.email ?? "JDoe@gmail.com";
	$: picture =
		session?.user?.image ??
		`https://ui-avatars.com/api/?name=${name}&color=fff&background=ec5252`;
</script>

<CustomHeader>
	<div class="flex items-center gap-2 text-4xl sm:text-5xl md:text-6xl">
		<h1 class="font-extrabold">Your Profile</h1>
		<i class="ri-user-fill"></i>
	</div>
</CustomHeader>

<section class="px-2 py-[2rem] sm:px-4 bg-gray-50">
	<div class="container mx-auto py-4 px-2 sm:px-6 flex flex-col">
		<!-- user info -->
		<div class="flex flex-col gap-2 mb-6">
			<img src={picture} alt="" class="size-10 rounded-full" />
			<div class="flex items-center gap-2 flex-wrap">
				<span class="font-medium text-gray-800">Name: </span><span>{name}</span>
			</div>
			<div class="flex items-center gap-2 flex-wrap">
				<span class="font-medium text-gray-800">Email: </span><span
					>{email}</span
				>
			</div>
		</div>
		<!-- user listings -->
		<h2 class="text-2xl font-semibold text-gray-600 mb-3">Your listings</h2>
		{#if error}
			<p class="text-red-500 font-medium text-xl">{error}</p>
		{:else if properties?.length === 0}
			<div class="text-center text-gray-400/75 space-y-4">
				<img
					src="/assets/no_properties.svg"
					alt=""
					class="w-[70vw] max-w-lg mx-auto"
				/>
				<p class="text-2xl font-semibold">No properties listed</p>
			</div>
		{:else}
			<div class="user-listings-grid">
				{#each properties as property}
					<UserListingsCard {property} />
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.user-listings-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		column-gap: 1rem;
	}
</style>
