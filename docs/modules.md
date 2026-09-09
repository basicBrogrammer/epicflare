# Modules

Epicflare supports a **compile-time** module (plugin) system. Modules are
ordinary TypeScript modules that contribute routes, server handlers, and client
wiring. There is no runtime discovery — you enable modules by listing them in
[`modules.ts`](../modules.ts) (and the matching server/client maps).

## Why compile-time?

- Tree-shaking and bundling stay simple (static imports only)
- TypeScript can see enabled routes at the call site
- Reviewers can see exactly what ships by reading the enable-list files
- Core Epicflare stays familiar; modules are additive
- Client and server registration stay split so the browser bundle never imports
  SSR handlers

## Contract

### 1. Route contribution (`defineModule`)

```ts
import { defineModule } from '#modules/define-module.ts'

export const helloModule = defineModule({
	id: 'hello',
	routes: {
		hello: '/hello',
	},
})
```

### 2. Server registrar

```ts
import { type RegisterHandlersArgs } from '#modules/server-types.ts'
import { createHelloHandler } from './handler.ts'

export function registerHelloModule({
	router,
	appEnv,
	routes,
}: RegisterHandlersArgs) {
	router.map(routes.hello, createHelloHandler(appEnv))
}
```

### 3. Client contribution

```ts
import { type ModuleClientContribution } from '#modules/client-types.ts'
import { HelloRoute } from './page.tsx'

export const helloClientContribution = {
	clientRoutes(routes) {
		return {
			[String(routes.hello.href())]: <HelloRoute />,
		}
	},
} satisfies ModuleClientContribution
```

## Enablement

Keep these three places in sync (TypeScript enforces id coverage on the maps):

1. [`modules.ts`](../modules.ts) — add to `enabledModules`
2. [`modules/server.ts`](../modules/server.ts) — add registrar to
   `serverRegistrars`
3. [`modules/client.tsx`](../modules/client.tsx) — add contribution to
   `clientContributions`

```ts
// modules.ts
export const enabledModules = [helloModule] as const
```

```ts
// modules/server.ts
const serverRegistrars = {
	hello: registerHelloModule,
} as const satisfies Record<EnabledModuleId, ModuleServerRegistrar>
```

```ts
// modules/client.tsx
const clientContributions = {
	hello: helloClientContribution,
} as const satisfies Record<EnabledModuleId, ModuleClientContribution>
```

To disable a module, remove it from all three.

## How composition works

1. `composeModules(enabledModules)` builds route defs in `moduleRegistry`
2. `server/routes.ts` spreads `moduleRegistry.routeDefs` into `route({...})`
3. `server/router.ts` calls `registerEnabledModuleHandlers(...)` after core maps
4. `client/routes/index.tsx` spreads `composeModuleClientRoutes/Loaders(...)`

Core auth, chat, home, and account routes remain first-class in core files so
stock Epicflare stays readable. Modules extend that surface without forking it.

## Demo module

[`modules/demo`](../modules/demo) is a tiny stub page at `/modules/demo`. It is
enabled by default to show the pattern and can be removed without affecting the
rest of the app.

## Adding a third-party module

1. Create `modules/<name>/` with `module.ts`, server registrar, and client page
2. Enable it in `modules.ts`, `modules/server.ts`, and `modules/client.tsx`
3. Run `bun run typecheck` — new route keys appear on `routes`
4. Visit the new paths (SSR + client navigation)

## What this is not

This surface is **only** the module/plugin system. It does not include SaaS
product modules (billing, marketing site, OAuth providers beyond stock
Epicflare, uploads, analytics, etc.).
