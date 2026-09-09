import { type RouteMap } from 'remix/routes'
import { type EnabledModuleId } from '#modules.ts'
import { type RouteLoader } from '#client/route-loader.ts'
import { type ModuleClientContribution } from '#modules/client-types.ts'
import { demoClientContribution } from '#modules/demo/client.tsx'

/**
 * Client contributions for enabled modules.
 * Keys must match `enabledModules` ids in `modules.ts`.
 */
const clientContributions: Record<EnabledModuleId, ModuleClientContribution> = {
	demo: demoClientContribution,
}

export function composeModuleClientRoutes(routes: RouteMap) {
	const composed: Record<string, JSX.Element> = {}
	for (const contribution of Object.values(clientContributions)) {
		if (!contribution.clientRoutes) continue
		Object.assign(composed, contribution.clientRoutes(routes))
	}
	return composed
}

export function composeModuleClientRouteLoaders(routes: RouteMap) {
	const composed: Record<string, RouteLoader> = {}
	for (const contribution of Object.values(clientContributions)) {
		if (!contribution.clientRouteLoaders) continue
		Object.assign(composed, contribution.clientRouteLoaders(routes))
	}
	return composed
}
