import { post, route } from 'remix/routes'
import { moduleRegistry } from '#modules.ts'

export const routes = route({
	home: '/',
	chat: '/chat',
	chatThread: '/chat/:threadId',
	chatThreads: '/chat-threads',
	chatThreadsCreate: post('/chat-threads'),
	chatThreadsUpdate: post('/chat-threads/update'),
	chatThreadsDelete: post('/chat-threads/delete'),
	health: '/health',
	login: '/login',
	signup: '/signup',
	account: '/account',
	resetPassword: '/reset-password',
	oauthAuthorize: '/oauth/authorize',
	oauthCallback: '/oauth/callback',
	auth: post('/auth'),
	session: '/session',
	logout: post('/logout'),
	passwordResetRequest: post('/password-reset'),
	passwordResetConfirm: post('/password-reset/confirm'),
	...moduleRegistry.routeDefs,
})
