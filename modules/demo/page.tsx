import { css, type Handle } from 'remix/ui'
import {
	colors,
	radius,
	shadows,
	spacing,
	typography,
} from '#client/styles/tokens.ts'

export function ModuleDemoRoute(_handle: Handle) {
	return () => (
		<section
			mix={[
				css({
					display: 'grid',
					gap: spacing.lg,
					justifyItems: 'center',
					textAlign: 'center',
				}),
			]}
		>
			<div
				mix={[
					css({
						display: 'grid',
						gap: spacing.md,
						padding: spacing.lg,
						borderRadius: radius.lg,
						border: `1px solid ${colors.border}`,
						background: colors.surface,
						boxShadow: shadows.sm,
						maxWidth: '36rem',
						width: '100%',
					}),
				]}
			>
				<h1
					mix={[
						css({
							margin: 0,
							fontSize: typography.fontSize.xl,
							fontWeight: typography.fontWeight.semibold,
							color: colors.text,
						}),
					]}
				>
					Module demo
				</h1>
				<p
					mix={[
						css({
							margin: 0,
							color: colors.textMuted,
						}),
					]}
				>
					This page is registered by the compile-time <code>demo</code> module.
					Disable it in <code>modules.ts</code> to remove the route.
				</p>
			</div>
		</section>
	)
}
