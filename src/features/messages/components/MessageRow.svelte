<script lang="ts">
	import { formatDate, formatName } from "../utils";
	import ContactInfo from "./ContactInfo.svelte";
	import DeleteMessageButton from "./DeleteMessageButton.svelte";
	import MarkAsReadButton from "./MarkAsReadButton.svelte";

	export let message: Message;
</script>

<!-- for screen width > 1000px -->
<div
	class="message-grid text-sm p-1 border rounded-sm transition-shadow duration-200 hover:shadow-md {message.marked_as_read &&
		'bg-blue-50'}"
>
	<!-- property name -->
	<div>
		<span class="font-semibold">{message.properties.name}</span>
	</div>
	<!-- sender details -->
	<ContactInfo
		screenSize={"big"}
		title={formatName(message.sender_name)}
		senderName={formatName(message.sender_name)}
		senderEmail={message.sender_email}
		senderPhoneNumber={message.sender_phone_number}
	/>
	<!-- message -->
	<div>
		<p>{message.content}</p>
	</div>
	<!-- actions -->
	<div>
		<div class="grid-cols-2 gap-1">
			<MarkAsReadButton
				markedAsRead={message.marked_as_read}
				messageId={message.id}
			/>
			<DeleteMessageButton messageId={message.id} />
		</div>
	</div>
	<!-- date -->
	<div>
		<span>{formatDate(message.created_at)}</span>
	</div>
</div>

<!-- for screen width < 1000px -->
<div
	class="min-[1000px]:hidden p-2 border rounded-sm transition-shadow duration-200 hover:shadow-md {message.marked_as_read &&
		'bg-blue-50'}"
>
	<!-- property name -->
	<p class="font-medium max-[425px]:text-base text-lg text-gray-700 mb-1">
		{message.properties.name}
	</p>
	<!--sender's details-->
	<ContactInfo
		title={formatName(message.sender_name)}
		screenSize={"small"}
		senderName={formatName(message.sender_name)}
		senderEmail={message.sender_email}
		senderPhoneNumber={message.sender_phone_number}
	/>
	<!--date-->
	<p class="max-[425px]:text-xs text-sm mb-3 text-gray-500">
		{formatDate(message.created_at)}
	</p>
	<!-- message -->
	<p class="mb-3 max-[425px]:text-sm">{message.content}</p>
	<!-- actions -->
	<div class="flex items-center max-[425px]:justify-end">
		<div class="w-fit grid grid-cols-2 gap-2">
			<MarkAsReadButton
				markedAsRead={message.marked_as_read}
				messageId={message.id}
			/>
			<DeleteMessageButton messageId={message.id} />
		</div>
	</div>
</div>

<style>
	.message-grid {
		display: grid;
		grid-template-columns: 2fr 2fr 6fr 1fr 2fr;
		column-gap: 0.5rem;
	}

	@media (max-width: 1000px) {
		.message-grid {
			display: none;
		}
	}
</style>
