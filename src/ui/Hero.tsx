type HeroProps = {
  onCta: () => void
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-xl2 px-4 py-3 shadow-soft">
      <div className="text-xs text-ink-500">{label}</div>
      <div className="mt-1 text-sm font-semibold tracking-[-0.02em] text-ink-900">{value}</div>
    </div>
  )
}

export function Hero({ onCta }: HeroProps) {
  return (
    <section className="relative">
      <div className="grid items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink-900/10 bg-white/60 px-3 py-1 text-xs text-ink-600 shadow-ring">
            <span className="inline-block size-1.5 rounded-full bg-sage-500" />
            Mobile-first flower detection concept
          </div>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.04em] text-ink-950 md:text-6xl">
            Identify flowers instantly, with a calm premium feel.
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-ink-600 md:text-lg">
            Upload a flower photo and BloomScan returns a polished profile: name, season, care guidance, and pet safety.
            Built to look like a startup MVP—no backend required.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={onCta}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-ink-950 px-5 py-3 text-sm font-semibold text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-ink-900 active:translate-y-0"
            >
              Scan a flower
              <span className="inline-block transition group-hover:translate-x-0.5">→</span>
            </button>
            <div className="text-sm text-ink-500">
              Drag & drop, tap to upload, then analyze in ~2 seconds.
            </div>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="glass relative overflow-hidden rounded-3xl p-5 shadow-soft">
            <div className="absolute -left-24 -top-24 size-72 rounded-full bg-gradient-to-br from-sage-200/80 to-sky-200/70 blur-2xl" />
            <div className="absolute -bottom-24 -right-24 size-72 rounded-full bg-gradient-to-br from-blossom-200/70 to-sky-200/60 blur-2xl" />
            <div className="relative">
              <div className="rounded-2xl border border-ink-900/10 bg-white/60 p-4 shadow-ring">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold tracking-[-0.02em] text-ink-900">Today’s vibe</div>
                  <div className="rounded-full bg-ink-900/5 px-3 py-1 text-xs text-ink-600">Soft · Clean · Modern</div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Stat label="Scan quality" value="Studio-grade UI" />
                  <Stat label="Latency" value="~2s simulated" />
                  <Stat label="Profiles" value="5 curated flowers" />
                  <Stat label="Care tips" value="3–5 per flower" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-ink-900/10 bg-gradient-to-br from-white/70 to-white/40 px-4 py-3 shadow-ring">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-2xl bg-ink-950 text-white shadow-soft">
                    <span className="text-sm">BS</span>
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm font-semibold text-ink-900">BloomScan</div>
                    <div className="text-xs text-ink-500">Flower profile generator</div>
                  </div>
                </div>
                <div className="h-2 w-20 overflow-hidden rounded-full bg-ink-900/10">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-sage-500 to-sky-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

