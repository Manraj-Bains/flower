import type { PropsWithChildren } from 'react'

type BadgeProps = PropsWithChildren<{
  tone?: 'neutral' | 'success' | 'warning' | 'info'
}>

export function Badge({ tone = 'neutral', children }: BadgeProps) {
  const cls =
    tone === 'success'
      ? 'border-sage-500/25 bg-sage-100/60 text-sage-800'
      : tone === 'warning'
        ? 'border-blossom-500/20 bg-blossom-100/55 text-blossom-800'
        : tone === 'info'
          ? 'border-sky-500/20 bg-sky-100/60 text-sky-900'
          : 'border-ink-900/10 bg-white/60 text-ink-700'

  return (
    <span className={['inline-flex items-center rounded-full border px-3 py-1 text-xs shadow-ring', cls].join(' ')}>
      {children}
    </span>
  )
}

