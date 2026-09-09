import { type RouteDefs } from 'remix/routes'
import { type AppModule, type MergeModuleRouteDefs } from './define-module.ts'

export type ModuleRegistry<
	Ms extends ReadonlyArray<AppModule> = ReadonlyArray<AppModule>,
> = {
	modules: Ms
	routeDefs: MergeModuleRouteDefs<Ms>
}

function assertUniqueModuleIds(modules: ReadonlyArray<AppModule>) {
	const seen = new Set<string>()
	for (const module of modules) {
		if (seen.has(module.id)) {
			throw new Error(`Duplicate module id: "${module.id}"`)
		}
		seen.add(module.id)
	}
}

function assertUniqueRouteKeys(modules: ReadonlyArray<AppModule>) {
	const owners = new Map<string, string>()
	for (const module of modules) {
		if (!module.routes) continue
		for (const key of Object.keys(module.routes)) {
			const existing = owners.get(key)
			if (existing) {
				throw new Error(
					`Duplicate route key "${key}" from modules "${existing}" and "${module.id}"`,
				)
			}
			owners.set(key, module.id)
		}
	}
}

/**
 * Compose enabled modules into a registry of route defs.
 *
 * This is compile-time composition: callers pass a static enable-list of
 * imported modules. Disabled modules are simply omitted from that list.
 */
export function composeModules<const Ms extends ReadonlyArray<AppModule>>(
	modules: Ms,
): ModuleRegistry<Ms> {
	assertUniqueModuleIds(modules)
	assertUniqueRouteKeys(modules)

	const routeDefs = {} as MergeModuleRouteDefs<Ms>
	for (const module of modules) {
		if (!module.routes) continue
		Object.assign(routeDefs, module.routes)
	}

	return {
		modules,
		routeDefs,
	}
}

/** Exported for unit tests that build RouteDefs without full modules. */
export function mergeRouteDefsForTest(
	modules: ReadonlyArray<Pick<AppModule, 'id' | 'routes'>>,
): RouteDefs {
	assertUniqueModuleIds(modules as ReadonlyArray<AppModule>)
	assertUniqueRouteKeys(modules as ReadonlyArray<AppModule>)
	const routeDefs: RouteDefs = {}
	for (const module of modules) {
		if (!module.routes) continue
		Object.assign(routeDefs, module.routes)
	}
	return routeDefs
}
