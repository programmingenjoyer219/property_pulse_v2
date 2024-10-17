<script lang="ts">
	import { page } from "$app/stores";

	$: ({ error, status } = $page);
</script>

<section class="section bg-gray-50">
	<div
		class="min-h-[60dvh] container mx-auto flex flex-col items-center justify-center gap-4"
	>
		<img
			src={status === 404 ? "/assets/404.svg" : "/assets/500.svg"}
			alt=""
			class="w-[400px]"
		/>
		<p class="font-medium text-2xl text-gray-700">
			{error?.message ?? "Oops... something went wrong."}
		</p>
		<a class="button-primary" href="/">Go back to home page</a>
	</div>
</section>
