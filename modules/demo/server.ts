import { type Action } from 'remix/router'
import { route } from 'remix/routes'
import { type AppEnv } from '#types/env-schema.ts'
import { renderAppPage } from '#server/ssr-render.tsx'
import { type RegisterHandlersArgs } from '#modules/server-types.ts'
import { demoModule } from './module.ts'

const demoRoutes = route({
	moduleDemo: demoModule.routes.moduleDemo,
})

export function createModuleDemoHandler(appEnv: AppEnv) {
	return {
		middleware: [],
		async handler({ request }) {
			return renderAppPage({
				request,
				appEnv,
				title: 'Module demo',
			})
		},
	} satisfies Action<typeof demoRoutes.moduleDemo>
}

export function registerDemoModule({
	router,
	appEnv,
	routes,
}: RegisterHandlersArgs) {
	const moduleDemo = (routes as typeof demoRoutes).moduleDemo
	router.map(moduleDemo, createModuleDemoHandler(appEnv))
}
