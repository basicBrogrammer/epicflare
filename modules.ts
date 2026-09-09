import { composeModules } from '#modules/registry.ts'
import { demoModule } from '#modules/demo/module.ts'

/**
 * Explicit enable-list for compile-time app modules (route contributions).
 *
 * Also update:
 * - `modules/server.ts` (handler registration)
 * - `modules/client.tsx` (client routes/loaders)
 *
 * TypeScript requires those maps to cover every enabled module id.
 *
 * The `demo` module is enabled by default so the template shows the pattern
 * without changing existing Epicflare routes.
 */
export const enabledModules = [demoModule] as const

export const moduleRegistry = composeModules(enabledModules)

export type EnabledModuleId = (typeof enabledModules)[number]['id']
