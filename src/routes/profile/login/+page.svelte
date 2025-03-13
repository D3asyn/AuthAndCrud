<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<main class="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
	<div class="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
		<h1 class="text-center text-2xl font-semibold text-gray-800">Login / Register</h1>

		<form method="post" action="?/login" use:enhance class="mt-6 space-y-4">
			<div>
				<label for="username" class="block font-medium text-gray-700">Username</label>
				<input
					id="username"
					name="username"
					class="w-full rounded border p-2 focus:ring focus:ring-blue-300"
					required
				/>
			</div>

			<div>
				<label for="password" class="block font-medium text-gray-700">Password</label>
				<input
					id="password"
					type="password"
					name="password"
					class="w-full rounded border p-2 focus:ring focus:ring-blue-300"
					required
				/>
			</div>

			<div class="flex space-x-2">
				<button
					class="w-full rounded bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600"
				>
					Login
				</button>

				<button
					formaction="?/register"
					class="w-full rounded bg-green-500 px-4 py-2 font-semibold text-white transition hover:bg-green-600"
				>
					Register
				</button>
			</div>
		</form>

		{#if form?.message}
			<p class="mt-4 text-center font-medium text-red-500">{form.message}</p>
		{/if}
	</div>
</main>
