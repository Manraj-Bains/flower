import type { Flower } from '../../types/flower'

type RelatedFlowersProps = {
  related: Flower[]
  enabled?: boolean
}

function AccentDot({ accent }: { accent: Flower['accent'] }) {
  const cls =
    accent === 'sage' ? 'bg-sage-500' : accent === 'sky' ? 'bg-sky-500' : 'bg-blossom-500'
  return <span className={['inline-block size-2 rounded-full', cls].join(' ')} />
}

function Item({ f }: { f: Flower }) {
  return (
    <div className="group flex items-center justify-between gap-3 rounded-2xl border border-ink-900/10 bg-white/60 p-4 shadow-ring transition hover:-translate-y-0.5 hover:bg-white">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <AccentDot accent={f.accent} />
          <div className="truncate text-sm font-semibold tracking-[-0.02em] text-ink-900">{f.name}</div>
        </div>
        <div className="mt-1 truncate text-xs text-ink-600">{f.scientificName}</div>
      </div>
      <div className="shrink-0 rounded-full bg-ink-900/5 px-3 py-1 text-xs text-ink-600 transition group-hover:bg-ink-900/10">
        {f.season}
      </div>
    </div>
  )
}

export function RelatedFlowers({ related, enabled = true }: RelatedFlowersProps) {
  return (
    <div className="glass rounded-3xl p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold tracking-[-0.02em] text-ink-900">Related flowers</div>
          <div className="mt-1 text-sm text-ink-600">Three similar profiles from the mock dataset.</div>
        </div>
        <div className="hidden rounded-2xl bg-ink-900/5 px-3 py-2 text-xs text-ink-600 shadow-ring md:block">
          Curated
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {!enabled ? (
          <div className="rounded-2xl border border-ink-900/10 bg-white/60 p-4 text-sm text-ink-600 shadow-ring">
            Similar flowers appear after a confident match.
          </div>
        ) : related.length === 0 ? (
          <div className="rounded-2xl border border-ink-900/10 bg-white/60 p-4 text-sm text-ink-600 shadow-ring">
            Analyze a photo to see similar flowers.
          </div>
        ) : (
          related.map((f) => <Item key={f.id} f={f} />)
        )}
      </div>
    </div>
  )
}

