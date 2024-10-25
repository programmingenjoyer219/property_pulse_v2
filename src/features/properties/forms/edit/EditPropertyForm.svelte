<script lang="ts">
	import { enhance } from "$app/forms";
	import toast from "svelte-french-toast";

	export let property: Property;
	export let formErrors: any;

	let loading = false;

	const availableAmenities = [
		"Wifi",
		"Free Parking",
		"24/7 Security",
		"Dishwasher",
		"Balcony / Patio",
		"Full Kitchen",
		"Swimming Pool",
		"Wheelchair Accessible",
		"Gym / Fitness Center",
		"Smart TV",
		"Washer & Dryer",
		"Hot Tub",
		"Elevator Access",
		"Air Conditioning",
		"Coffee Maker",
	];
	const propertyTypes = [
		"Apartment",
		"Condo",
		"House",
		"Cottage or Cabin",
		"Room",
		"Studio",
		"Other",
	];
</script>

<form
	method="post"
	use:enhance={() => {
		loading = true;
		return async ({ update }) => {
			await update();
			toast.success("Property info updated successfully");
		};
	}}
	class="space-y-6 max-[425px]:text-sm"
>
	<!-- property_id -->
	<input type="text" name="id" id="id" value={property.id} hidden />

	<!-- type -->
	<div class="flex flex-col gap-2">
		<label for="type" class="text-gray-700 font-bold"> Property Type </label>
		<select
			id="type"
			name="type"
			class="custom-input w-full"
			value={property.type}
		>
			{#each propertyTypes as propertyType}
				<option value={propertyType}>{propertyType}</option>
			{/each}
		</select>
	</div>

	<!-- name -->
	<div class="flex flex-col gap-2">
		<label for="name" class="text-gray-700 font-bold">
			Listing Name <span class="required">*</span>
		</label>
		{#if formErrors?.name}
			<p class="error">{formErrors?.name?._errors[0]}</p>
		{/if}
		<input
			type="text"
			id="name"
			name="name"
			class="custom-input"
			placeholder="eg. Beautiful Apartment In Miami"
			value={property.name}
		/>
	</div>

	<!-- description -->
	<div class="flex flex-col gap-2">
		<label for="description" class="text-gray-700 font-bold">
			Description <span class="required">*</span>
		</label>
		{#if formErrors?.description}
			<p class="error">{formErrors?.description?._errors[0]}</p>
		{/if}
		<textarea
			id="description"
			name="description"
			class="custom-input"
			rows="4"
			placeholder="Add an optional description of your property"
			value={property.description}
		></textarea>
	</div>

	<!-- location -->
	<div class="flex flex-col gap-2">
		<label for="location" class="text-gray-700 font-bold">
			Location <span class="required">*</span>
		</label>
		{#if formErrors?.street}
			<p class="error">{formErrors?.street?._errors[0]}</p>
		{/if}
		<input
			type="text"
			id="street"
			name="street"
			class="custom-input w-full"
			placeholder="Street"
			value={property.street}
		/>
		{#if formErrors?.city}
			<p class="error">{formErrors?.city?._errors[0]}</p>
		{/if}
		<input
			type="text"
			id="city"
			name="city"
			class="custom-input w-full"
			placeholder="City"
			value={property.city}
		/>
		{#if formErrors?.state}
			<p class="error">{formErrors?.state?._errors[0]}</p>
		{/if}
		<input
			type="text"
			id="state"
			name="state"
			class="custom-input w-full"
			placeholder="State"
			value={property.state}
		/>
		{#if formErrors?.zipcode}
			<p class="error">{formErrors?.zipcode?._errors[0]}</p>
		{/if}
		<input
			type="text"
			id="zipcode"
			name="zipcode"
			class="custom-input w-full"
			placeholder="Zipcode"
			value={property.zipcode}
		/>
	</div>

	<!-- beds, baths and square_feet -->
	<div class="flex flex-col gap-2">
		<div class="flex flex-col gap-1">
			<label for="beds" class="text-gray-700 font-bold"
				>Beds <span class="required">*</span></label
			>
			{#if formErrors?.beds}
				<p class="error">{formErrors?.beds?._errors[0]}</p>
			{/if}
			<input
				type="number"
				id="beds"
				name="beds"
				min="1"
				step="1"
				class="custom-input"
				value={property.beds}
			/>
		</div>
		<div class="flex flex-col gap-1">
			<label for="baths" class="text-gray-700 font-bold"
				>Baths <span class="required">*</span></label
			>
			{#if formErrors?.baths}
				<p class="error">{formErrors?.baths?._errors[0]}</p>
			{/if}
			<input
				type="number"
				id="baths"
				name="baths"
				min="1"
				step="1"
				class="custom-input"
				value={property.baths}
			/>
		</div>
		<div class="flex flex-col gap-1">
			<label for="square_feet" class="text-gray-700 font-bold"
				>Square Feet <span class="required">*</span></label
			>
			{#if formErrors?.square_feet}
				<p class="error">{formErrors?.square_feet?._errors[0]}</p>
			{/if}
			<input
				type="number"
				id="square_feet"
				name="square_feet"
				min="1"
				step="1"
				class="custom-input"
				value={property.square_feet}
			/>
		</div>
	</div>

	<!-- amenities -->
	<div class="flex flex-col gap-2">
		<label for="amenities" class="block text-gray-700 font-bold mb-2">
			Amenities
		</label>
		{#if formErrors?.amenities}
			<p class="error">{formErrors?.amenities?._errors[0]}</p>
		{/if}
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
			{#each availableAmenities as amenity}
				<div class="flex items-center gap-2">
					<input
						type="checkbox"
						name={amenity}
						value={amenity}
						bind:group={property.amenities}
						class="size-6 cursor-pointer"
					/>
					<span class="">{amenity}</span>
				</div>
			{/each}
		</div>
	</div>

	<input
		type="text"
		name="amenities"
		id="amenities"
		value={property.amenities}
		hidden
	/>

	<!-- rates -->
	<div class="flex flex-col gap-2">
		<label for="rates" class="text-gray-700 font-bold">
			Rates <span class="required">*</span> (Leave blank if not applicable)
		</label>
		{#if formErrors?.nightly_rate || formErrors?.weekly_rate || formErrors?.monthly_rate}
			<p class="error">
				{formErrors?.nightly_rate?.weekly_rate?.monthly_rate._errors[0]}
			</p>
		{/if}
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
			<div class="flex items-center gap-2">
				<label class="w-1/2 sm:w-auto" for="nightly_rate">Nightly</label>
				<input
					type="number"
					id="nightly_rate"
					name="nightly_rate"
					class="custom-input w-full"
					value={property.nightly_rate}
				/>
			</div>
			<div class="flex items-center gap-2">
				<label class="w-1/2 sm:w-auto" for="weekly_rate">Weekly</label>
				<input
					type="number"
					id="weekly_rate"
					name="weekly_rate"
					class="custom-input w-full"
					value={property.weekly_rate}
				/>
			</div>
			<div class="flex items-center gap-2">
				<label class="w-1/2 sm:w-auto" for="monthly_rate">Monthly</label>
				<input
					type="number"
					id="monthly_rate"
					name="monthly_rate"
					class="custom-input w-full"
					value={property.monthly_rate}
				/>
			</div>
		</div>
	</div>

	<!-- submit button -->
	<div class="flex justify-center">
		<button class="button-primary" type="submit" disabled={loading}>
			{#if loading}
				<div class="flex items-center gap-2">
					<span>Adding Property</span>
					<span class="loading loading-spinner text-white"></span>
				</div>
			{:else}
				<span>Update Property</span>
			{/if}
		</button>
	</div>
</form>

<style>
	.custom-input {
		@apply border-2 border-gray-300 outline-blue-500 rounded-md p-2;
	}
</style>
