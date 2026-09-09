import { expect, test } from 'vitest'
import { post } from 'remix/routes'
import { defineModule } from './define-module.ts'
import { composeModules, mergeRouteDefsForTest } from './registry.ts'

test('composeModules merges route defs from enabled modules', () => {
	const alpha = defineModule({
		id: 'alpha',
		routes: {
			alphaPage: '/alpha',
			alphaAction: post('/alpha'),
		},
	})
	const beta = defineModule({
		id: 'beta',
		routes: {
			betaPage: '/beta',
		},
	})

	const registry = composeModules([alpha, beta])

	expect(registry.modules.map((module) => module.id)).toEqual(['alpha', 'beta'])
	expect(registry.routeDefs).toEqual({
		alphaPage: '/alpha',
		alphaAction: post('/alpha'),
		betaPage: '/beta',
	})
})

test('composeModules skips modules without routes', () => {
	const bare = defineModule({ id: 'bare' })
	const withRoutes = defineModule({
		id: 'with-routes',
		routes: { hello: '/hello' },
	})

	const registry = composeModules([bare, withRoutes])

	expect(registry.routeDefs).toEqual({ hello: '/hello' })
})

test('composeModules rejects duplicate module ids', () => {
	const first = defineModule({ id: 'dup', routes: { a: '/a' } })
	const second = defineModule({ id: 'dup', routes: { b: '/b' } })

	expect(() => composeModules([first, second])).toThrow(
		'Duplicate module id: "dup"',
	)
})

test('composeModules rejects duplicate route keys', () => {
	const first = defineModule({
		id: 'one',
		routes: { shared: '/one' },
	})
	const second = defineModule({
		id: 'two',
		routes: { shared: '/two' },
	})

	expect(() => composeModules([first, second])).toThrow(
		'Duplicate route key "shared" from modules "one" and "two"',
	)
})

test('disabled modules are omitted when not listed', () => {
	const enabled = defineModule({
		id: 'enabled',
		routes: { enabledPage: '/enabled' },
	})
	const disabled = defineModule({
		id: 'disabled',
		routes: { disabledPage: '/disabled' },
	})

	const registry = composeModules([enabled])

	expect(registry.routeDefs).toEqual({ enabledPage: '/enabled' })
	expect(Object.keys(registry.routeDefs)).not.toContain('disabledPage')
	expect(disabled.id).toBe('disabled')
})

test('mergeRouteDefsForTest mirrors compose route merging', () => {
	const defs = mergeRouteDefsForTest([
		{ id: 'a', routes: { a: '/a' } },
		{ id: 'b', routes: { b: '/b' } },
	])

	expect(defs).toEqual({ a: '/a', b: '/b' })
})
