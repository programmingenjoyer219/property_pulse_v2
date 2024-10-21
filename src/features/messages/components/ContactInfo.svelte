<script lang="ts">
	export let title: string;
	export let senderName: string;
	export let senderEmail: string;
	export let senderPhoneNumber: string;
	export let screenSize: "big" | "small";
</script>

<div class="dropdown">
	<div
		tabindex="0"
		role="button"
		title="click to get contact info"
		class="underline max-[425px]:text-xs text-sm text-blue-500 font-medium"
	>
		{#if screenSize === "big"}
			{title.length < 12 ? title : title.slice(0, 12) + "..."}
		{:else}
			{title}
		{/if}
	</div>
	<ul
		tabindex="0"
		class="dropdown-content menu rounded-sm bg-white z-[1] p-2 shadow max-[425px]:text-xs text-sm"
	>
		<li>
			<a class="space-x-2 p-1">
				<i class="ri-user-fill text-blue-600"></i>
				<span>{senderName}</span>
			</a>
		</li>
		<li>
			<a class="space-x-2 p-1">
				<i class="ri-mail-fill text-blue-600"></i>
				<span>{senderEmail}</span>
			</a>
		</li>
		<li>
			<a class="space-x-2 p-1">
				<i class="ri-phone-fill text-blue-600"></i>
				<span>{senderPhoneNumber}</span>
			</a>
		</li>
	</ul>
</div>
