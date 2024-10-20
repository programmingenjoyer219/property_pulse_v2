<script>
	const propertyTypes = [
		"Apartment",
		"Condo",
		"House",
		"Cottage or Cabin",
		"Room",
		"Studio",
		"Other",
	];

	function handleSubmit() {}
</script>

<form
	on:submit|preventDefault={handleSubmit}
	class="grid grid-cols-1 grid-rows-3 gap-4 sm:flex sm:items-stretch"
>
	<input
		class="p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-100 sm:w-2/6 flex-1"
		type="text"
		name="searchQuery"
		placeholder="Enter location (City, State, Zip, etc...)"
	/>

	<select
		name="type"
		class="p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-300 flex-1"
	>
		{#each propertyTypes as propertyType}
			<option
				class="hover:bg-blue-800 focus:bg-blue-800 active:bg-blue-800"
				value={propertyType}>{propertyType}</option
			>
		{/each}
	</select>

	<button
		type="submit"
		class="button-primary border-2 border-blue-400 hover:border-blue-100 space-x-2"
	>
		<i class="ri-search-line"></i>
		<span>Search</span>
	</button>
</form>
