import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    intent?: 'primary' | 'secondary'
  }
>

export function Button({ intent = 'primary', className, disabled, ...props }: ButtonProps) {
  const base =
    'inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-900/30 disabled:cursor-not-allowed disabled:opacity-50'
  const styles =
    intent === 'primary'
      ? 'bg-ink-950 text-white shadow-lift hover:-translate-y-0.5 hover:bg-ink-900 active:translate-y-0'
      : 'bg-white/70 text-ink-800 shadow-ring hover:bg-white active:bg-white'

  return <button {...props} disabled={disabled} className={[base, styles, className].filter(Boolean).join(' ')} />
}

