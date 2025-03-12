<script lang="ts">
	import '../app.css';
	let { children, data } = $props();
	let isOpen = $state(false);
	let sessionToken = $derived(data.authSession);
</script>

<div class="min-h-screen bg-gray-100">
	<!-- Navbar -->
	<nav class="bg-blue-600 p-4 shadow-md">
		<div class="mx-auto flex max-w-7xl items-center justify-between">
			<div class="text-2xl font-semibold text-white">My App</div>
			<button class="text-white lg:hidden" onclick={() => (isOpen = !isOpen)}>
				<span class="sr-only">Open menu</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					></path>
				</svg>
			</button>
			<div class="hidden space-x-8 text-white lg:flex">
				<a href="/" class="hover:text-gray-200">Home</a>
				{#if sessionToken}
					<a href="/profile" class="hover:text-gray-200">Profile</a>
				{:else}
					<a href="/profile/login" class="hover:text-gray-200">Login</a>
				{/if}
			</div>
		</div>
	</nav>

	<!-- Mobile Menu -->
	{#if isOpen}
		<div class="space-y-4 bg-blue-600 p-4 text-white lg:hidden">
			<a href="/" class="block hover:text-gray-200">Home</a>
			{#if sessionToken}
				<a href="/profile" class="block hover:text-gray-200">Profile</a>
			{:else}
				<a href="/profile/login" class="block hover:text-gray-200">Login</a>
			{/if}
		</div>
	{/if}
	<main>
		{@render children()}
	</main>
</div>
