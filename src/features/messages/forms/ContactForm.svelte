<script lang="ts">
	import { SignIn } from "@auth/sveltekit/components";
	import { enhance } from "$app/forms";
	import toast from "svelte-french-toast";

	export let form;
	export let session;
	export let receiver_email;
	export let property_id;

	$: submissionErrors = {
		general:
			form?.formErrors?.dbError ||
			form?.formErrors?.property_id ||
			form?.formErrors?.sender_name ||
			form?.formErrors?.sender_email ||
			form?.formErrors?.receiver_email
				? "Oops... something went wrong. Try again later"
				: "",
		sender_phone_number: form?.formErrors?.sender_phone_number
			? form?.formErrors?.sender_phone_number?._errors[0]
			: "",
		content: form?.formErrors?.content
			? form?.formErrors?.content?._errors[0]
			: "",
	};

	$: {
		if (form?.success) toast.success("Message sent successfully");
	}
</script>

{#if !!session}
	<form
		method="post"
		use:enhance
		class="sm:sticky sm:top-4 flex flex-col gap-4 p-4 rounded-md shadow-md bg-white text-gray-800 h-fit"
	>
		<h3 class="text-xl font-medium">Contact Property Owner</h3>
		<!-- property_id -->
		<input type="number" name="property_id" value={property_id} hidden />
		<!-- sender_name -->
		<input type="text" name="sender_name" value={session?.user?.name} hidden />
		<!-- sender_email -->
		<input
			type="text"
			name="sender_email"
			value={session?.user?.email}
			hidden
		/>
		<!-- receiver_email -->
		<input type="text" name="receiver_email" value={receiver_email} hidden />
		{#if submissionErrors.general}
			<p class="error">Oops... something went wrong. Try again later</p>
		{/if}
		<!-- contact number -->
		<div class="flex flex-col gap-2">
			<label for="sender_phone_number" class="font-medium">Contact no.</label>
			{#if submissionErrors.sender_phone_number}
				<p class="error">{submissionErrors.sender_phone_number}</p>
			{/if}
			<input
				type="text"
				id="sender_phone_number"
				name="sender_phone_number"
				placeholder="Enter your phone number"
				class="rounded-md border outline-blue-500 p-2"
			/>
		</div>
		<!-- message -->
		<div class="flex flex-col gap-2">
			<label for="content" class="font-medium">Message</label>
			{#if submissionErrors.content}
				<p class="error">{submissionErrors.content}</p>
			{/if}
			<textarea
				rows="4"
				id="content"
				name="content"
				placeholder="Enter your message"
				class="rounded-md border outline-blue-500 p-2 resize-none"
			/>
		</div>
		<!-- submit button -->
		<button type="submit" class="button-primary space-x-2">
			<i class="ri-send-plane-fill"></i>
			<span class="">Send Message</span>
		</button>
	</form>
{:else}
	<div
		class="sm:sticky sm:top-4 flex flex-col gap-4 p-4 rounded-md shadow-md bg-white text-gray-800 h-fit"
	>
		<h3 class="text-xl font-medium text-center">
			Login to contact property owner
		</h3>
		<SignIn class="w-fit mx-auto">
			<div slot="submitButton" class="button-primary space-x-2">
				<i class="ri-google-fill"></i>
				<span>Login</span>
			</div>
		</SignIn>
	</div>
{/if}
