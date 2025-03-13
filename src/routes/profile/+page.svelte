<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();
</script>

<main class="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
	<div class="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-md">
		<h1 class="text-2xl font-semibold text-gray-800">Hi, {data.user.username}!</h1>
		<p class="mt-2 text-gray-600">
			Your user ID is <span class="font-mono text-gray-700">{data.user.id}</span>.
		</p>

		<form method="post" action="?/logout" use:enhance class="mt-6">
			<button
				class="w-full rounded bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
			>
				Sign out
			</button>
		</form>
	</div>
</main>
