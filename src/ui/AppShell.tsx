import type { PropsWithChildren } from 'react'

function LogoMark() {
  return (
    <div className="relative grid size-9 place-items-center rounded-2xl bg-gradient-to-br from-sage-200 via-white to-blossom-200 shadow-soft ring-1 ring-ink-900/5">
      <div className="absolute inset-0 rounded-2xl noise opacity-30" />
      <div className="relative">
        <div className="size-3.5 rounded-full bg-sage-500 shadow-[0_10px_28px_-14px_rgba(34,197,94,0.65)]" />
        <div className="-mt-2 ml-2 size-3.5 rounded-full bg-blossom-500 shadow-[0_10px_28px_-14px_rgba(244,63,94,0.65)]" />
      </div>
    </div>
  )
}

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-svh bg-gradient-to-b from-ink-50 via-white to-ink-50">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-br from-sage-200/65 via-sky-100/50 to-blossom-200/65 blur-3xl" />
        <div className="absolute bottom-[-240px] left-[-220px] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-sage-200/70 to-sky-200/55 blur-3xl" />
        <div className="absolute right-[-260px] top-[45%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-blossom-200/60 to-sky-200/55 blur-3xl" />
        <div className="absolute inset-0 noise opacity-[0.22]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-ink-900/5 bg-white/55 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <LogoMark />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-[-0.02em] text-ink-900">BloomScan</div>
              <div className="text-xs text-ink-500">Instant flower insights</div>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-ink-600 md:flex">
            <a className="transition hover:text-ink-900" href="#upload">
              Upload
            </a>
            <a className="transition hover:text-ink-900" href="#results">
              Results
            </a>
            <a className="transition hover:text-ink-900" href="#care">
              Care tips
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-16 pt-10 md:pt-14">{children}</main>

      <footer className="border-t border-ink-900/5 bg-white/50">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 text-sm text-ink-500 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <span className="font-medium text-ink-700">BloomScan</span>
            <span className="text-ink-400">·</span>
            <span>Concept MVP for portfolio</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-ink-900/5 px-3 py-1 text-xs text-ink-600 shadow-ring">
              Local mock detection
            </span>
            <span className="rounded-full bg-ink-900/5 px-3 py-1 text-xs text-ink-600 shadow-ring">
              React + TS + Tailwind
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

