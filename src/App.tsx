import { useEffect, useMemo, useRef, useState } from 'react'
import { flowers } from './data/flowers'
import { analyzeFlowerImage } from './services/analysisClient'
import type { FlowerAnalysisResult } from './types/analysis'
import { AppShell } from './ui/AppShell'
import { Hero } from './ui/Hero'
import { UploadSection } from './ui/UploadSection'
import { ScanOverlay } from './ui/ScanOverlay'
import { Results } from './ui/Results'

type AnalyzeState = 'idle' | 'ready' | 'scanning' | 'done'
type Detection =
  | { status: 'match'; result: FlowerAnalysisResult }
  | { status: 'low_confidence' | 'no_match'; confidence: number | null; message: string }
  | { status: 'error'; errorCode: string; message: string }
  | null

export default function App() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [state, setState] = useState<AnalyzeState>('idle')
  const [detection, setDetection] = useState<Detection>(null)
  const [scanLabel, setScanLabel] = useState('Preparing scan')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const analysisTimer = useRef<number | null>(null)
  const labelTimer = useRef<number | null>(null)
  const scanStartRef = useRef<number | null>(null)

  const canAnalyze = Boolean(imageFile) && state !== 'scanning'

  const related = useMemo(() => {
    if (!detection || detection.status !== 'match') return []
    const ids = new Set(detection.result.similarFlowers.map((s) => s.toLowerCase()))
    return flowers.filter((f) => ids.has(f.name.toLowerCase())).slice(0, 3)
  }, [detection])

  useEffect(() => {
    if (!imageFile) {
      setImageUrl(null)
      setState('idle')
      setDetection(null)
      setErrorMessage(null)
      return
    }
    const next = URL.createObjectURL(imageFile)
    setImageUrl(next)
    setState('ready')
    return () => URL.revokeObjectURL(next)
  }, [imageFile])

  useEffect(() => {
    return () => {
      if (analysisTimer.current) window.clearTimeout(analysisTimer.current)
      if (labelTimer.current) window.clearInterval(labelTimer.current)
    }
  }, [])

  function onAnalyze() {
    if (!imageFile) return
    setState('scanning')
    setDetection(null)
    setErrorMessage(null)
    scanStartRef.current = Date.now()
    const labels = [
      'Analyzing petals',
      'Estimating bloom geometry',
      'Matching species profile',
      'Cross-checking native regions',
      'Assembling care guidance',
    ]
    let i = 0
    setScanLabel(labels[0])
    if (labelTimer.current) window.clearInterval(labelTimer.current)
    labelTimer.current = window.setInterval(() => {
      i = (i + 1) % labels.length
      setScanLabel(labels[i])
    }, 360)

    void (async () => {
      const response = await analyzeFlowerImage(imageFile)
      const elapsed = Date.now() - (scanStartRef.current ?? Date.now())
      const waitFor = Math.max(0, 1600 - elapsed)
      if (analysisTimer.current) window.clearTimeout(analysisTimer.current)
      analysisTimer.current = window.setTimeout(() => {
        if (labelTimer.current) window.clearInterval(labelTimer.current)
        setDetection(response)
        if (response.status === 'error') {
          setErrorMessage(response.message)
        }
        setState('done')
      }, waitFor)
    })().catch(() => {
      if (labelTimer.current) window.clearInterval(labelTimer.current)
      setDetection({
        status: 'error',
        errorCode: 'REQUEST_FAILED',
        message: 'BloomScan could not process this image right now.',
      })
      setErrorMessage('BloomScan could not process this image right now.')
      setState('done')
    })
  }

  function onReset() {
    setImageFile(null)
  }

  function onCta() {
    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <AppShell>
      <Hero onCta={onCta} />
      <UploadSection
        id="upload"
        imageUrl={imageUrl}
        state={state}
        canAnalyze={canAnalyze}
        errorMessage={errorMessage}
        onPickFile={setImageFile}
        onAnalyze={onAnalyze}
        onReset={onReset}
      />
      <Results imageUrl={imageUrl} detection={detection} related={related} />
      <ScanOverlay open={state === 'scanning'} label={scanLabel} />
    </AppShell>
  )
}
