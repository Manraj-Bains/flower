export type FlowerAnalysisResult = {
  name: string
  scientificName: string
  confidence: number
  description: string
  colors: string[]
  season: string
  sunlight: string
  watering: string
  petSafety: string
  nativeRegion: string
  careTips: string[]
  similarFlowers: string[]
  sourceUrl?: string | null
  synonyms?: string[]
}

export type AnalyzeApiResponse =
  | { status: 'match'; result: FlowerAnalysisResult }
  | { status: 'low_confidence' | 'no_match'; confidence: number | null; message: string }
  | { status: 'error'; errorCode: string; message: string }

