import { defineModule } from '#modules/define-module.ts'

/**
 * Minimal demo module route contribution.
 * Handlers/client wiring live in `./server.ts` and `./client.tsx`.
 */
export const demoModule = defineModule({
	id: 'demo',
	routes: {
		moduleDemo: '/modules/demo',
	},
})
