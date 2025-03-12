<script lang="ts">
	import { onMount } from 'svelte';
	let notes = $state([]);
	let title = $state('');
	let content = $state('');

	// Variables for editing a note
	let editingId: number | null = $state(null);
	let editTitle = $state('');
	let editContent = $state('');

	async function loadNotes() {
		const res = await fetch('/api/notes');
		notes = await res.json();
	}

	onMount(loadNotes);

	// Add a new note
	async function addNote() {
		const res = await fetch('/api/notes', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, content })
		});
		if (res.ok) {
			title = '';
			content = '';
			loadNotes();
		}
	}

	// Delete a note by its id
	async function deleteNote(id: number) {
		const res = await fetch(`/api/notes/${id}`, {
			method: 'DELETE'
		});
		if (res.ok) {
			loadNotes();
		}
	}

	// Prepare to edit a note
	function startEditing(note) {
		editingId = note.id;
		editTitle = note.title;
		editContent = note.content;
	}

	// Update a note
	async function updateNote(id: number) {
		const res = await fetch(`/api/notes/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: editTitle, content: editContent })
		});
		if (res.ok) {
			editingId = null;
			loadNotes();
		}
	}
</script>

<main class="mx-auto max-w-2xl p-4">
	<h1 class="mb-4 text-3xl font-bold">My Notes</h1>

	<form onsubmit={addNote} class="mb-8 space-y-4">
		<div>
			<input
				type="text"
				bind:value={title}
				placeholder="Title"
				class="w-full rounded border p-2"
				required
			/>
		</div>
		<div>
			<textarea
				bind:value={content}
				placeholder="Content"
				class="w-full rounded border p-2"
				rows="4"
				required
			></textarea>
		</div>
		<button type="submit" class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
			Add Note
		</button>
	</form>

	<ul class="space-y-4">
		{#each notes as note (note.id)}
			<li class="rounded border p-4 shadow">
				{#if editingId === note.id}
					<form onsubmit={() => updateNote(note.id)} class="space-y-2">
						<input type="text" bind:value={editTitle} class="w-full rounded border p-2" required />
						<textarea bind:value={editContent} class="w-full rounded border p-2" rows="4" required
						></textarea>
						<div class="flex space-x-2">
							<button
								type="submit"
								class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
							>
								Save
							</button>
							<button
								type="button"
								class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
								onclick={() => (editingId = null)}
							>
								Cancel
							</button>
						</div>
					</form>
				{:else}
					<h2 class="text-xl font-semibold">{note.title}</h2>
					<p>{note.content}</p>
					<div class="mt-2 flex space-x-2">
						<button
							class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
							onclick={() => deleteNote(note.id)}
						>
							Delete
						</button>
						<button
							class="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
							onclick={() => startEditing(note)}
						>
							Edit
						</button>
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</main>
