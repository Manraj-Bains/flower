const PLANT_ID_URL = 'https://plant.id/api/v3/identification'
const DETAILS = [
  'common_names',
  'description',
  'description_all',
  'taxonomy',
  'url',
  'best_watering',
  'best_light_condition',
  'toxicity',
  'synonyms',
]

function toBase64(buffer) {
  return buffer.toString('base64')
}

function readDetailText(detail) {
  if (!detail) return null
  if (typeof detail === 'string') return detail
  if (typeof detail?.value === 'string') return detail.value
  return null
}

export async function identifyFlowerWithPlantId({ imageBuffer, apiKey, signal }) {
  const payload = {
    images: [toBase64(imageBuffer)],
    similar_images: true,
    classification_level: 'species',
  }
  const search = new URLSearchParams()
  for (const detail of DETAILS) search.append('details', detail)
  search.set('language', 'en')
  const endpoint = `${PLANT_ID_URL}?${search.toString()}`

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': apiKey,
    },
    body: JSON.stringify(payload),
    signal,
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Plant.id error (${response.status}): ${body}`)
  }

  const data = await response.json()
  const isPlant = data?.result?.is_plant
  if (isPlant?.binary === false || Number(isPlant?.probability ?? 0) < 0.5) {
    return null
  }
  const suggestions = Array.isArray(data?.result?.classification?.suggestions)
    ? data.result.classification.suggestions
    : []
  if (suggestions.length === 0) return null

  const best = suggestions[0]
  const details = best?.details ?? {}
  const scientificName = best?.name || details?.taxonomy?.species || ''
  const plantName = details?.common_names?.[0] || scientificName || ''

  if (!plantName) return null

  return {
    name: plantName,
    scientificName,
    confidence: Number(best?.probability || 0),
    providerDescription: readDetailText(details?.description_all) || readDetailText(details?.description),
    providerUrl: details?.url || null,
    providerSynonyms: Array.isArray(details?.synonyms) ? details.synonyms : [],
    providerLight: readDetailText(details?.best_light_condition),
    providerWatering: readDetailText(details?.best_watering),
    providerToxicity: readDetailText(details?.toxicity),
    providerCommonNames: Array.isArray(details?.common_names) ? details.common_names : [],
    providerTaxonomy: details?.taxonomy ?? null,
    isPlantProbability: Number(isPlant?.probability || 0),
  }
}

