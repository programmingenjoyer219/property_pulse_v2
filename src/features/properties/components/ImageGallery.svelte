<script lang="ts">
	export let images: string[];
</script>

{#if images.length > 0}
	<div class="snap-x snap-mandatory overflow-x-auto flex gap-2 rounded-md">
		{#each images as image, index}
			<div class="snap-start scroll-mx-4 shrink-0">
				<img
					src={image}
					alt="image-{index}"
					class="rounded-md min-[320px]:h-[30vh] sm:h-[60vh]"
				/>
			</div>
		{/each}
	</div>
{/if}
