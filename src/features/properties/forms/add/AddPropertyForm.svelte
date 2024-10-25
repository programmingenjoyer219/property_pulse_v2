<script lang="ts">
	import { goto } from "$app/navigation";
	import { validateAddPropertyFormData } from "./validation";
	import { CldUploadWidget } from "svelte-cloudinary";
	import {
		PUBLIC_CLOUDINARY_CLOUD_NAME,
		PUBLIC_CLOUDINARY_API_KEY,
	} from "$env/static/public";
	import { dbAddProperty } from "$features/properties/db/create";
	import toast from "svelte-french-toast";

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

	let formErrors: any;

	// form entries
	export let owner_email = "";
	let type = "Apartment";
	let name = "";
	let description = "";
	let street = "";
	let city = "";
	let state = "";
	let zipcode = "";
	let beds = 0;
	let baths = 0;
	let square_feet = 0;
	let amenities: string[] = [];
	let nightly_rate: null | number = null;
	let weekly_rate: null | number = null;
	let monthly_rate: null | number = null;
	let images: string[] = [];

	$: propertyData = {
		owner_email,
		type,
		name,
		description,
		street,
		city,
		state,
		zipcode,
		beds,
		baths,
		square_feet,
		amenities,
		nightly_rate,
		weekly_rate,
		monthly_rate,
		images,
	};

	$: otherPropertyExists =
		!!owner_email &&
		!!type &&
		!!name &&
		!!description &&
		!!street &&
		!!city &&
		!!state &&
		!!zipcode &&
		!!beds &&
		!!baths &&
		!!square_feet &&
		(!!nightly_rate || !!weekly_rate || !!monthly_rate);

	async function handleSubmit(e: SubmitEvent) {
		loading = true;
		const form = e.target as HTMLFormElement;
		const validationResult = validateAddPropertyFormData(propertyData);
		formErrors = validationResult?.formErrors;
		if (validationResult?.isValidated) {
			try {
				const { id } = await dbAddProperty(propertyData);
				toast.success("New listing added successfully");
				form.reset();
				goto(`/properties/${id}`);
			} catch (error) {
				toast.error("Failed to list property");
			}
		}
		loading = false;
	}

	function handleQueuesEnd(results: any) {
		results?.data?.info?.files?.forEach((file: any) => {
			images = [...images, file?.uploadInfo?.public_id];
		});
	}
</script>

<form
	on:submit|preventDefault={handleSubmit}
	class="space-y-6 max-[425px]:text-sm"
>
	<!-- type -->
	<div class="flex flex-col gap-2">
		<label for="type" class="text-gray-700 font-bold"> Property Type </label>
		<select id="type" name="type" class="custom-input w-full" bind:value={type}>
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
			bind:value={name}
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
			bind:value={description}
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
			bind:value={street}
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
			bind:value={city}
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
			bind:value={state}
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
			bind:value={zipcode}
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
				bind:value={beds}
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
				bind:value={baths}
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
				bind:value={square_feet}
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
						bind:group={amenities}
						class="size-6 cursor-pointer"
					/>
					<span class="">{amenity}</span>
				</div>
			{/each}
		</div>
	</div>

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
					bind:value={nightly_rate}
				/>
			</div>
			<div class="flex items-center gap-2">
				<label class="w-1/2 sm:w-auto" for="weekly_rate">Weekly</label>
				<input
					type="number"
					id="weekly_rate"
					name="weekly_rate"
					class="custom-input w-full"
					bind:value={weekly_rate}
				/>
			</div>
			<div class="flex items-center gap-2">
				<label class="w-1/2 sm:w-auto" for="monthly_rate">Monthly</label>
				<input
					type="number"
					id="monthly_rate"
					name="monthly_rate"
					class="custom-input w-full"
					bind:value={monthly_rate}
				/>
			</div>
		</div>
	</div>

	<!-- images -->
	<div class="flex flex-col gap-2">
		<label for="images" class="text-gray-700 font-bold">
			Images <span class="required">*</span> (Maximum 4 images)
		</label>
		{#if formErrors?.images}
			<p class="error">{formErrors?.images?._errors[0]}</p>
		{/if}
		{#if otherPropertyExists}
			<CldUploadWidget
				uploadPreset="ml_default"
				signatureEndpoint="/properties/api/sign-cloudinary-params"
				config={{
					cloud: {
						cloudName: PUBLIC_CLOUDINARY_CLOUD_NAME,
						apiKey: PUBLIC_CLOUDINARY_API_KEY,
					},
				}}
				options={{
					sources: ["local", "camera"],
					maxFiles: 4,
				}}
				onQueuesEnd={(results) => {
					handleQueuesEnd(results);
				}}
				let:open
				let:isLoading
			>
				<button
					type="button"
					class="button-secondary hover:bg-green-100 hover:border-green-500 hover:text-green-500 text-gray-500/75 w-fit"
					on:click={() => open()}
					disabled={isLoading}
				>
					Choose Files
				</button>
			</CldUploadWidget>
		{:else}
			<button
				title="fill other entries first"
				class="button-secondary cursor-not-allowed opacity-75 w-fit"
			>
				Choose Files
			</button>
		{/if}
		<p class="text-blue-600">{images.length} images uploaded</p>
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
				<span>Add Property</span>
			{/if}
		</button>
	</div>
</form>

<style>
	.custom-input {
		@apply border-2 border-gray-300 outline-blue-500 rounded-md p-2;
	}
</style>
