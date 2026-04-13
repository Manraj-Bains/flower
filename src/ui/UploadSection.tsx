import { useMemo } from 'react'
import { Button } from './components/Button'
import { UploadDropzone } from './components/UploadDropzone'
import { Badge } from './components/Badge'

type UploadSectionProps = {
  id: string
  imageUrl: string | null
  state: 'idle' | 'ready' | 'scanning' | 'done'
  canAnalyze: boolean
  errorMessage: string | null
  onPickFile: (file: File | null) => void
  onAnalyze: () => void
  onReset: () => void
}

export function UploadSection({
  id,
  imageUrl,
  state,
  canAnalyze,
  errorMessage,
  onPickFile,
  onAnalyze,
  onReset,
}: UploadSectionProps) {
  const headline = useMemo(() => {
    if (state === 'done') return 'Scan complete'
    if (state === 'scanning') return 'Scanning…'
    if (state === 'ready') return 'Ready to analyze'
    return 'Upload a flower photo'
  }, [state])

  return (
    <section id={id} className="mt-12 md:mt-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold tracking-[-0.02em] text-ink-900">{headline}</div>
          <p className="mt-1 max-w-2xl text-sm text-ink-600 md:text-base">
            Drag and drop an image or click to upload. BloomScan sends your image through a real identification pipeline and
            returns deterministic results.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="neutral">Backend proxy</Badge>
          <Badge tone="success">Premium UI</Badge>
          <Badge tone="info">Mobile-ready</Badge>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <UploadDropzone imageUrl={imageUrl} disabled={state === 'scanning'} onPickFile={onPickFile} />
        </div>

        <div className="md:col-span-5">
          <div className="glass rounded-3xl p-5 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold tracking-[-0.02em] text-ink-900">Analyze</div>
                <p className="mt-1 text-sm text-ink-600">
                  The scan uses a provider API and enriches results with local care data when a species is confidently matched.
                </p>
              </div>
              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sage-200/60 to-sky-200/50 shadow-ring md:flex">
                <div className="size-6 rounded-xl bg-ink-950/90" />
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <Button onClick={onAnalyze} disabled={!canAnalyze} intent="primary">
                {state === 'scanning' ? 'Analyzing…' : 'Analyze photo'}
              </Button>
              <Button onClick={onReset} disabled={!imageUrl || state === 'scanning'} intent="secondary">
                Choose a different photo
              </Button>
            </div>

            <div className="mt-6 rounded-2xl border border-ink-900/10 bg-white/60 p-4 shadow-ring">
              <div className="text-xs font-semibold text-ink-700">What you’ll get</div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-ink-700">
                <div className="rounded-xl bg-ink-900/5 px-3 py-2">Name + scientific</div>
                <div className="rounded-xl bg-ink-900/5 px-3 py-2">Season + colors</div>
                <div className="rounded-xl bg-ink-900/5 px-3 py-2">Sunlight + watering</div>
                <div className="rounded-xl bg-ink-900/5 px-3 py-2">Pet safety + region</div>
              </div>
            </div>
            {errorMessage && (
              <div className="mt-3 rounded-2xl border border-blossom-500/20 bg-blossom-100/50 px-4 py-3 text-sm text-blossom-900">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

