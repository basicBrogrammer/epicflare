import { type RouteMap } from 'remix/routes'
import { type createRouter } from 'remix/router'
import { type AppEnv } from '#types/env-schema.ts'

export type AppRouter = ReturnType<typeof createRouter>

export type RegisterHandlersArgs = {
	router: AppRouter
	appEnv: AppEnv
	/** Full composed app route map (core + enabled modules). */
	routes: RouteMap
}

export type ModuleServerRegistrar = (args: RegisterHandlersArgs) => void
