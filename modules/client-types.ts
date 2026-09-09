import { type RouteMap } from 'remix/routes'
import { type RouteLoader } from '#client/route-loader.ts'

export type ModuleClientContribution = {
	clientRoutes?: (routes: RouteMap) => Record<string, JSX.Element>
	clientRouteLoaders?: (routes: RouteMap) => Record<string, RouteLoader>
}
