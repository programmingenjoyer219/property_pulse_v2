<script lang="ts">
	import { SignIn, SignOut } from "@auth/sveltekit/components";
	import { page } from "$app/stores";

	export let session;
	$: loggedIn = !!session;
</script>

<header id="navbar" class="flex items-center justify-between p-4 bg-blue-700">
	<!-- logo -->
	<a href="/" class="text-gray-50 text-xl sm:text-2xl flex items-center gap-2">
		<i class="ri-home-7-fill"></i>
		<p class="font-semibold">PropertyPulse</p>
	</a>

	<!-- user profile -->
	<div class="flex items-center gap-2 sm:gap-4">
		<div class="dropdown dropdown-end relative">
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
				<!-- image container -->
				<div
					class="w-10 rounded-full border-2 border-blue-400 hover:border-blue-100 transition-colors duration-200 bg-blue-700 hover:bg-blue-800 text-white grid place-content-center"
				>
					{#if loggedIn}
						<img alt="" src={session?.user?.image} />
					{:else}
						<i class="ri-user-fill text-xl"></i>
					{/if}
				</div>

				<!-- links -->
				<ul
					class="absolute top-[3rem] menu menu-sm dropdown-content bg-blue-700 border-2 border-white rounded-md z-[1] w-52 p-1 shadow-md flex flex-col gap-1"
				>
					{#if loggedIn}
						<!-- profile -->
						<li>
							<a
								href="/profile"
								class="{$page.route.id?.includes('/profile') &&
									'bg-blue-800'} nav-link"
							>
								<i class="ri-user-3-fill text-xl"></i>
								<span>Profile</span>
							</a>
						</li>
						<!-- messages -->
						<li>
							<a
								href="/messages"
								class="{$page.route.id?.includes('/messages') &&
									'bg-blue-800'} nav-link"
							>
								<i class="ri-message-2-fill text-xl"></i>
								<span>Messages</span>
							</a>
						</li>
						<!-- add property -->
						<li>
							<a
								href="/add"
								class="{$page.route.id?.includes('/add') &&
									'bg-blue-800'} nav-link"
							>
								<i class="ri-add-fill text-xl"></i>
								<span>Add Property</span>
							</a>
						</li>
						<!-- logout -->
						<li>
							<SignOut>
								<svelte:fragment slot="submitButton">
									<i class="ri-logout-box-fill text-xl"></i>
									<span>Sign Out</span>
								</svelte:fragment>
							</SignOut>
						</li>
					{:else}
						<!-- login -->
						<li>
							<SignIn>
								<svelte:fragment slot="submitButton">
									<i class="ri-google-fill text-xl"></i>
									<span>Login</span>
								</svelte:fragment>
							</SignIn>
						</li>
					{/if}
				</ul>
			</div>
		</div>
	</div>
</header>

<style>
	.nav-link {
		@apply p-2 rounded-sm text-gray-50 hover:bg-blue-800 transition-colors duration-200;
	}
	.nav-link-secondary {
		@apply p-2 rounded-sm text-blue-700 hover:bg-blue-200 transition-colors duration-200;
	}
</style>
