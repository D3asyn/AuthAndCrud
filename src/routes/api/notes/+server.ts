// src/routes/api/notes/+server.ts
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db/index';
import { notes } from '$lib/server/db/schema';

// GET endpoint with cookie check
export async function GET({ cookies }) {
	const auth = cookies.get('auth-session');
	if (!auth) {
		throw error(401, 'Unauthorized');
	}

	const allNotes = await db.select().from(notes);
	return json(allNotes);
}

// POST endpoint with cookie check
export const POST: RequestHandler = async ({ request, cookies }) => {
	const auth = cookies.get('auth-session');
	if (!auth) {
		throw error(401, 'Unauthorized');
	}

	const { title, content } = await request.json();
	const result = await db.insert(notes).values({ title, content }).returning();
	return json(result);
};
