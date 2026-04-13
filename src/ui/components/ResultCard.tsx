import type { AnalyzeApiResponse, FlowerAnalysisResult } from '../../types/analysis'
import { Badge } from './Badge'

type ResultCardProps = {
  imageUrl: string | null
  detection: AnalyzeApiResponse | null
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ink-900/10 bg-white/60 px-4 py-3 shadow-ring">
      <div className="text-xs font-semibold text-ink-600">{label}</div>
      <div className="mt-1 text-sm font-semibold tracking-[-0.02em] text-ink-900">{value}</div>
    </div>
  )
}

function toneForPetSafety(p: string): 'success' | 'warning' {
  return p.toLowerCase().includes('safe') ? 'success' : 'warning'
}

function toneForWatering(w: string): 'info' | 'neutral' | 'warning' {
  if (w.toLowerCase() === 'low') return 'neutral'
  if (w.toLowerCase() === 'moderate') return 'info'
  return 'warning'
}

function Empty() {
  return (
    <div className="glass rounded-3xl p-6 shadow-soft">
      <div className="rounded-2xl border border-ink-900/10 bg-white/60 p-6 shadow-ring">
        <div className="text-sm font-semibold tracking-[-0.02em] text-ink-900">No scan yet</div>
        <p className="mt-1 text-sm text-ink-600">
          Upload a flower photo and click analyze to generate a premium, product-style profile.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-ink-900/5 px-4 py-3">
            <div className="text-xs font-semibold text-ink-600">Badges</div>
            <div className="mt-1 text-sm font-semibold text-ink-900">Safety · Sun · Water</div>
          </div>
          <div className="rounded-2xl bg-ink-900/5 px-4 py-3">
            <div className="text-xs font-semibold text-ink-600">Info grid</div>
            <div className="mt-1 text-sm font-semibold text-ink-900">Season · Region</div>
          </div>
          <div className="rounded-2xl bg-ink-900/5 px-4 py-3">
            <div className="text-xs font-semibold text-ink-600">Care tips</div>
            <div className="mt-1 text-sm font-semibold text-ink-900">3–5 concise tips</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ResultCard({ imageUrl, detection }: ResultCardProps) {
  if (!detection) return <Empty />
  if (detection.status === 'error') {
    return (
      <div className="glass rounded-3xl p-6 shadow-soft">
        <div className="rounded-2xl border border-blossom-500/20 bg-blossom-100/40 p-6 shadow-ring">
          <div className="text-sm font-semibold tracking-[-0.02em] text-blossom-900">Analysis unavailable</div>
          <p className="mt-2 text-sm text-blossom-900/90">{detection.message}</p>
        </div>
      </div>
    )
  }

  if (detection.status !== 'match') {
    return (
      <div className="glass overflow-hidden rounded-3xl shadow-soft">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/65 via-white/60 to-sky-100/45" />
          <div className="absolute inset-0 noise opacity-[0.2]" />
          <div className="relative grid gap-5 p-6 md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border border-ink-900/10 bg-white/55 shadow-ring">
                {imageUrl ? (
                  <img src={imageUrl} alt="Uploaded image preview" className="h-64 w-full object-cover md:h-72" />
                ) : (
                  <div className="grid h-64 w-full place-items-center bg-ink-900/5 text-sm text-ink-600 md:h-72">
                    Image preview
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-950/35 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <Badge tone="warning">Low confidence {detection.confidence ? `· ${Math.round(detection.confidence * 100)}%` : ''}</Badge>
                </div>
              </div>
            </div>
            <div className="md:col-span-7">
              <div className="text-2xl font-semibold tracking-[-0.04em] text-ink-950 md:text-3xl">
                No confident flower match found
              </div>
              <p className="mt-2 text-sm text-ink-700 md:text-base">{detection.message}</p>
              <div className="mt-4 rounded-2xl border border-ink-900/10 bg-white/60 px-4 py-3 text-sm text-ink-700 shadow-ring">
                Try a clearer photo focused on the bloom or petals.
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Pill label="Capture tip" value="Center one flower head" />
                <Pill label="Lighting" value="Use bright natural light" />
                <Pill label="Focus" value="Sharp petals, less background" />
                <Pill label="Framing" value="Move closer to the bloom" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const flower: FlowerAnalysisResult = detection.result

  const accent =
    'from-sage-200/70 via-white/60 to-sky-200/50'
  const confidencePct = Math.round(flower.confidence * 100)

  return (
    <div className="glass overflow-hidden rounded-3xl shadow-soft">
      <div className="relative">
        <div className={['absolute inset-0 bg-gradient-to-br', accent].join(' ')} />
        <div className="absolute inset-0 noise opacity-[0.22]" />

        <div className="relative grid gap-5 p-6 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-ink-900/10 bg-white/55 shadow-ring">
              {imageUrl ? (
                <img src={imageUrl} alt={`${flower.name} preview`} className="h-64 w-full object-cover md:h-72" />
              ) : (
                <div className="grid h-64 w-full place-items-center bg-ink-900/5 text-sm text-ink-600 md:h-72">
                  Image preview
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-950/35 to-transparent" />
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                <Badge tone="success">Confidence {confidencePct}%</Badge>
                <Badge tone={toneForPetSafety(flower.petSafety)}>{flower.petSafety}</Badge>
                <Badge tone="info">{flower.sunlight} light</Badge>
                <Badge tone={toneForWatering(flower.watering)}>{flower.watering} water</Badge>
                <Badge tone="neutral">{flower.season}</Badge>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-2xl font-semibold tracking-[-0.04em] text-ink-950 md:text-3xl">{flower.name}</div>
                <div className="mt-1 text-sm text-ink-600">
                  <span className="italic">{flower.scientificName}</span>
                </div>
              </div>
              <div className="hidden rounded-2xl bg-white/60 px-3 py-2 text-xs text-ink-600 shadow-ring md:block">
                BloomScan result
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-ink-700 md:text-base">{flower.description}</p>
            {(flower.sourceUrl || (flower.synonyms && flower.synonyms.length > 0)) && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {flower.synonyms && flower.synonyms.length > 0 && (
                  <span className="rounded-full bg-ink-900/5 px-3 py-1 text-xs text-ink-600 shadow-ring">
                    Also known as {flower.synonyms.slice(0, 2).join(', ')}
                  </span>
                )}
                {flower.sourceUrl && (
                  <a
                    href={flower.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-ink-900/5 px-3 py-1 text-xs text-ink-700 shadow-ring transition hover:bg-ink-900/10"
                  >
                    Species reference
                  </a>
                )}
              </div>
            )}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Pill label="Common colors" value={flower.colors.slice(0, 4).join(' · ')} />
              <Pill label="Native region" value={flower.nativeRegion} />
              <Pill label="Blooming season" value={flower.season} />
              <Pill label="Sunlight needs" value={`${flower.sunlight} light`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

