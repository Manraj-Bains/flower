import { useEffect, useState } from 'react'

type ScanOverlayProps = {
  open: boolean
  label: string
}

function Spinner() {
  return (
    <div className="relative size-14">
      <div className="absolute inset-0 rounded-full border border-ink-900/10 bg-white/60 shadow-ring" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-ink-900/80 border-r-ink-900/10 animate-spin" />
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-sage-200/60 via-white/60 to-blossom-200/60" />
    </div>
  )
}

export function ScanOverlay({ open, label }: ScanOverlayProps) {
  const [mounted, setMounted] = useState(open)

  useEffect(() => {
    if (open) setMounted(true)
    if (!open) {
      const t = window.setTimeout(() => setMounted(false), 220)
      return () => window.clearTimeout(t)
    }
  }, [open])

  if (!mounted) return null

  return (
    <div
      aria-hidden={!open}
      className={[
        'fixed inset-0 z-50 flex items-center justify-center px-5 transition',
        open ? 'opacity-100' : 'opacity-0',
      ].join(' ')}
    >
      <div className="absolute inset-0 bg-ink-950/30 backdrop-blur-sm" />
      <div className="glass relative w-full max-w-md rounded-3xl p-6 shadow-lift">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/60 to-white/25" />
        <div className="relative">
          <div className="flex items-center gap-4">
            <Spinner />
            <div className="min-w-0">
              <div className="text-sm font-semibold tracking-[-0.02em] text-ink-900">Scanning image</div>
              <div className="mt-1 text-sm text-ink-600">{label}</div>
            </div>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-ink-900/10">
            <div className="h-full w-full animate-shimmer rounded-full bg-[linear-gradient(110deg,rgba(34,197,94,0.0),rgba(34,197,94,0.55),rgba(59,130,246,0.45),rgba(244,63,94,0.45),rgba(34,197,94,0.0))] bg-[length:200%_100%]" />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-ink-600">
            <div className="rounded-2xl bg-ink-900/5 px-3 py-2">Texture</div>
            <div className="rounded-2xl bg-ink-900/5 px-3 py-2">Color</div>
            <div className="rounded-2xl bg-ink-900/5 px-3 py-2">Shape</div>
          </div>
        </div>
      </div>
    </div>
  )
}

