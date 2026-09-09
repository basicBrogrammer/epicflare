import { type RouteDefs } from 'remix/routes'

/**
 * Compile-time app module contract (route contribution).
 *
 * Server handlers and client pages are registered separately so the client
 * bundle does not import SSR/server code. See `modules/server.ts` and
 * `modules/client.tsx`, and [docs/modules.md](../docs/modules.md).
 */
export type AppModule = {
	/** Stable unique id used for conflict diagnostics and docs. */
	id: string
	/**
	 * Route definitions merged into `server/routes.ts` via `route({...})`.
	 * Use string paths or `post('/...')` helpers from `remix/routes`.
	 */
	routes?: RouteDefs
}

/**
 * Identity helper that preserves literal types for module definitions.
 */
export function defineModule<const T extends AppModule>(module: T): T {
	return module
}

type ModuleRoutes<M> = M extends { routes: infer R extends RouteDefs } ? R : {}

/**
 * Merge `routes` objects from a readonly module tuple into one RouteDefs shape.
 */
export type MergeModuleRouteDefs<Ms extends ReadonlyArray<AppModule>> =
	Ms extends readonly []
		? {}
		: Ms extends readonly [infer Head, ...infer Tail]
			? ModuleRoutes<Head> &
					(Tail extends ReadonlyArray<AppModule>
						? MergeModuleRouteDefs<Tail>
						: {})
			: {}
