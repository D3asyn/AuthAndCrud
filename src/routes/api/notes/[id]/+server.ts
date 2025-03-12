// src/routes/api/notes/[id]/+server.ts
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db/index';
import { notes } from '$lib/server/db/schema';
// Adjust this import as needed based on your Drizzle setup
import { eq } from 'drizzle-orm';

// DELETE a note by id
export async function DELETE({ params, cookies }) {
	const auth = cookies.get('auth-session');
	if (!auth) {
		throw error(401, 'Unauthorized');
	}

	const id = Number(params.id);
	const result = await db.delete(notes).where(eq(notes.id, id)).returning();
	if (result.length === 0) {
		throw error(404, 'Note not found');
	}

	return json({ message: 'Note deleted', note: result[0] });
}

// UPDATE (PUT) a note by id
export async function PUT({ request, params, cookies }) {
	const auth = cookies.get('auth-session');
	if (!auth) {
		throw error(401, 'Unauthorized');
	}

	const id = Number(params.id);
	const { title, content } = await request.json();

	const result = await db.update(notes).set({ title, content }).where(eq(notes.id, id)).returning();

	if (result.length === 0) {
		throw error(404, 'Note not found');
	}

	return json({ message: 'Note updated', note: result[0] });
}
