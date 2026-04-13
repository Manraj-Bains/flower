import type { Flower } from '../types/flower'
import type { AnalyzeApiResponse } from '../types/analysis'
import { ResultCard } from './components/ResultCard'
import { CareTips } from './components/CareTips'
import { RelatedFlowers } from './components/RelatedFlowers'

type ResultsProps = {
  imageUrl: string | null
  detection: AnalyzeApiResponse | null
  related: Flower[]
}

export function Results({ imageUrl, detection, related }: ResultsProps) {
  const flower = detection?.status === 'match' ? detection.result : null

  return (
    <section id="results" className="mt-12 md:mt-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-sm font-semibold tracking-[-0.02em] text-ink-900">Detection result</div>
          <p className="mt-1 text-sm text-ink-600 md:text-base">
            After analyzing, BloomScan presents a structured profile with clear badges, an info grid, and care guidance.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-8">
          <ResultCard imageUrl={imageUrl} detection={detection} />
        </div>
        <div className="md:col-span-4">
          <RelatedFlowers related={related} enabled={detection?.status === 'match'} />
        </div>
      </div>

      <div id="care" className="mt-6">
        <CareTips flower={flower} />
      </div>
    </section>
  )
}

