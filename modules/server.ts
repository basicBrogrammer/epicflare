import { type EnabledModuleId } from '#modules.ts'
import { registerDemoModule } from '#modules/demo/server.ts'
import {
	type ModuleServerRegistrar,
	type RegisterHandlersArgs,
} from '#modules/server-types.ts'

/**
 * Server handler registrars for enabled modules.
 * Keys must match `enabledModules` ids in `modules.ts`.
 */
const serverRegistrars = {
	demo: registerDemoModule,
} as const satisfies Record<EnabledModuleId, ModuleServerRegistrar>

export function registerEnabledModuleHandlers(args: RegisterHandlersArgs) {
	for (const register of Object.values(serverRegistrars)) {
		register(args)
	}
}
