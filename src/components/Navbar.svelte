<script>
	import { page } from "$app/stores";

	export let loggedIn = false;
</script>

<header class="flex items-center justify-between p-4 bg-blue-700">
	<!-- logo -->
	<a href="/" class="text-gray-50 text-xl sm:text-2xl flex items-center gap-2">
		<i class="ri-home-7-fill"></i>
		<p class="font-semibold">PropertyPulse</p>
	</a>

	<div class="flex items-center gap-2 sm:gap-4">
		<!-- links to different pages, visible on large screens -->
		<nav class="hidden sm:flex items-center gap-2">
			<!-- home -->
			<a href="/" class="{$page.route.id === '/' && 'bg-blue-800'} nav-link">
				<i class="ri-home-7-fill text-xl"></i>
				<span>Home</span>
			</a>
			<!-- properties -->
			<a
				href="/properties"
				class="{$page.route.id?.includes('/properties') &&
					'bg-blue-800'} nav-link"
			>
				<i class="ri-building-fill text-xl"></i>
				<span>Properties</span>
			</a>
		</nav>

		<!-- links to different pages, visible on small screens -->
		<div class="sm:hidden dropdown dropdown-end relative">
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
				<!-- hamburger icon -->
				<div
					class="w-10 rounded-full border-2 border-blue-400 hover:border-blue-100 transition-colors duration-200 bg-blue-700 hover:bg-blue-800 text-gray-50 grid place-content-center"
				>
					<i class="ri-menu-line text-xl"></i>
				</div>

				<!-- links -->
				<ul
					class="absolute top-[3rem] menu menu-sm dropdown-content bg-blue-700 border-2 border-white rounded-md z-[1] w-52 p-1 shadow-md flex flex-col gap-1"
				>
					<!-- home -->
					<li>
						<a
							href="/"
							class="{$page.route.id?.includes('/') && 'bg-blue-800'} nav-link"
						>
							<i class="ri-home-7-fill text-xl"></i>
							<span>Home</span>
						</a>
					</li>
					<!-- properties -->
					<li>
						<a
							href="/properties"
							class="{$page.route.id?.includes('/properties') &&
								'bg-blue-200'} nav-link"
						>
							<i class="ri-building-fill text-xl"></i>
							<span>Properties</span>
						</a>
					</li>
				</ul>
			</div>
		</div>

		<!-- user profile -->
		<div class="dropdown dropdown-end relative">
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
				<!-- image container -->
				<div
					class="w-10 rounded-full border-2 border-blue-400 hover:border-blue-100 transition-colors duration-200 bg-blue-700 hover:bg-blue-800 text-white grid place-content-center"
				>
					{#if loggedIn}
						<img
							alt="Tailwind CSS Navbar component"
							src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
						/>
					{:else}
						<i class="ri-user-fill text-xl"></i>
					{/if}
				</div>

				<!-- links -->
				<ul
					class="absolute top-[3rem] menu menu-sm dropdown-content bg-blue-700 border-2 border-white rounded-md z-[1] w-52 p-1 shadow-md flex flex-col gap-1"
				>
					{#if loggedIn}
						<li>
							<!-- profile -->
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
							<a
								href="/signout"
								class="{$page.route.id?.includes('/signout') &&
									'bg-blue-800'} nav-link"
							>
								<i class="ri-logout-box-fill text-xl"></i>
								<span>Sign Out</span>
							</a>
						</li>
					{:else}
						<!-- login -->
						<li>
							<a
								href="/login"
								class="{$page.route.id?.includes('/login') &&
									'bg-blue-800'} nav-link"
							>
								<i class="ri-google-fill text-xl"></i>
								<span>Login</span>
							</a>
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
