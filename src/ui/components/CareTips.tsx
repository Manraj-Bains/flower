import type { FlowerAnalysisResult } from '../../types/analysis'

type CareTipsProps = {
  flower: FlowerAnalysisResult | null
}

function TipCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="glass rounded-3xl p-5 shadow-soft transition hover:-translate-y-0.5">
      <div className="text-sm font-semibold tracking-[-0.02em] text-ink-900">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-ink-600">{body}</div>
    </div>
  )
}

export function CareTips({ flower }: CareTipsProps) {
  const tips = flower?.careTips?.slice(0, 5) ?? []
  const empty = tips.length === 0

  return (
    <section>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold tracking-[-0.02em] text-ink-900">Care tips</div>
          <p className="mt-1 text-sm text-ink-600 md:text-base">
            Practical guidance to keep your plant thriving, presented in a calm, readable format.
          </p>
        </div>
        {!empty && (
          <div className="rounded-full bg-ink-900/5 px-3 py-1 text-xs text-ink-600 shadow-ring">
            Curated for {flower?.name}
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-12">
        {empty ? (
          <div className="md:col-span-12">
            <div className="glass rounded-3xl p-6 shadow-soft">
              <div className="rounded-2xl border border-ink-900/10 bg-white/60 p-6 shadow-ring">
                <div className="text-sm font-semibold tracking-[-0.02em] text-ink-900">Tips appear after analysis</div>
                <div className="mt-1 text-sm text-ink-600">
                  Once you analyze a photo, you’ll see 3–5 concise care tips tailored to the detected flower.
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="md:col-span-5">
              <TipCard title="Keep it consistent" body={tips[0] ?? ''} />
            </div>
            <div className="md:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {tips.slice(1).map((t, i) => (
                  <TipCard key={`${i}-${t}`} title={`Tip ${i + 2}`} body={t} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

