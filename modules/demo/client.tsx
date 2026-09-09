import { type RouteMap } from 'remix/routes'
import { type ModuleClientContribution } from '#modules/client-types.ts'
import { demoModule } from './module.ts'
import { ModuleDemoRoute } from './page.tsx'

export const demoClientContribution = {
	clientRoutes(_routes: RouteMap) {
		return {
			[demoModule.routes.moduleDemo]: <ModuleDemoRoute />,
		}
	},
} satisfies ModuleClientContribution
