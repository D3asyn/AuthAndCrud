import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event: {
	locals: { user: any };
	cookies: { get: (arg0: string) => any };
}) => {
	if (event.locals.user) {
		let authSession = event.cookies.get('auth-session');
		return { user: event.locals.user, authSession };
	} else {
		return { user: null, authSession: null };
	}
};
