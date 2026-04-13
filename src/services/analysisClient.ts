import type { AnalyzeApiResponse } from '../types/analysis'

export async function analyzeFlowerImage(file: File): Promise<AnalyzeApiResponse> {
  const formData = new FormData()
  formData.append('image', file)

  const response = await fetch('/api/analyze-flower', {
    method: 'POST',
    body: formData,
  })

  const data = (await response.json()) as AnalyzeApiResponse
  if (!response.ok) {
    if (data.status === 'error') return data
    return {
      status: 'error',
      errorCode: 'REQUEST_FAILED',
      message: 'BloomScan could not process this image.',
    }
  }
  return data
}

