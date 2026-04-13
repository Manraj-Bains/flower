import { findFlowerProfile, getFallbackProfile } from './flowerCatalog.js'
import { identifyFlowerWithPlantId } from './providers/plantIdProvider.js'

const CONFIDENCE_THRESHOLD = 0.72
const PLANT_PRESENCE_THRESHOLD = 0.6
const REQUEST_TIMEOUT_MS = 14000

function withTimeout() {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  return {
    signal: controller.signal,
    clear: () => clearTimeout(timeout),
  }
}

function titleize(value) {
  if (!value) return null
  return String(value)
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function inferNativeRegion(providerTaxonomy) {
  if (!providerTaxonomy || typeof providerTaxonomy !== 'object') return null
  return (
    providerTaxonomy?.continent ||
    providerTaxonomy?.region ||
    providerTaxonomy?.distribution ||
    null
  )
}

export async function analyzeFlowerImage({ imageBuffer, apiKey }) {
  const timeout = withTimeout()
  try {
    const providerResult = await identifyFlowerWithPlantId({
      imageBuffer,
      apiKey,
      signal: timeout.signal,
    })
    if (!providerResult) {
      return {
        status: 'no_match',
        confidence: null,
        message: 'No confident flower match found.',
      }
    }
    if (providerResult.isPlantProbability < PLANT_PRESENCE_THRESHOLD) {
      return {
        status: 'no_match',
        confidence: providerResult.isPlantProbability,
        message: 'The image does not appear to contain a clear plant subject.',
      }
    }

    const confidence = Number(providerResult.confidence || 0)
    if (confidence < CONFIDENCE_THRESHOLD) {
      return {
        status: 'low_confidence',
        confidence,
        message: 'No confident flower match found.',
      }
    }

    const mapped = findFlowerProfile(`${providerResult.name} ${providerResult.scientificName}`)
    const inferredRegion = inferNativeRegion(providerResult.providerTaxonomy)
    const providerCareTips = [providerResult.providerWatering, providerResult.providerLight, providerResult.providerToxicity]
      .filter(Boolean)
      .map((tip) => String(tip).trim())
      .filter((tip, idx, arr) => arr.indexOf(tip) === idx)
      .slice(0, 3)

    const fallback = getFallbackProfile(titleize(providerResult.name), providerResult.scientificName)
    const details = mapped
      ? {
          name: titleize(providerResult.name) || mapped.name,
          scientificName: providerResult.scientificName || mapped.scientificName,
          description: providerResult.providerDescription || mapped.description,
          colors: mapped.colors.length > 0 ? mapped.colors : ['Varies'],
          season: mapped.season || 'Varies',
          sunlight: providerResult.providerLight || mapped.sunlight,
          watering: providerResult.providerWatering || mapped.watering,
          petSafety: providerResult.providerToxicity || mapped.petSafety,
          nativeRegion: inferredRegion || mapped.nativeRegion,
          careTips: providerCareTips.length > 0 ? providerCareTips : mapped.careTips,
          similarFlowers: mapped.similarFlowers,
          sourceUrl: providerResult.providerUrl,
          synonyms: providerResult.providerSynonyms.length > 0 ? providerResult.providerSynonyms : providerResult.providerCommonNames,
        }
      : {
          ...fallback,
          description: providerResult.providerDescription || fallback.description,
          sunlight: providerResult.providerLight || 'Medium',
          watering: providerResult.providerWatering || 'Moderate',
          petSafety: providerResult.providerToxicity || 'Unknown',
          nativeRegion: inferredRegion || 'Unknown',
          careTips: providerCareTips.length > 0 ? providerCareTips : ['Use a closer photo for improved species-level guidance.'],
          sourceUrl: providerResult.providerUrl,
          synonyms: providerResult.providerSynonyms.length > 0 ? providerResult.providerSynonyms : providerResult.providerCommonNames,
        }

    return {
      status: 'match',
      result: {
        ...details,
        confidence,
      },
    }
  } finally {
    timeout.clear()
  }
}

