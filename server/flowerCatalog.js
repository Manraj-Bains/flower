const FLOWER_CATALOG = [
  {
    id: 'rose',
    name: 'Rose',
    scientificName: 'Rosa',
    description:
      'A classic garden icon known for layered petals, a refined fragrance, and an endless spectrum of cultivars.',
    colors: ['Red', 'Pink', 'White', 'Yellow', 'Peach'],
    season: 'Summer',
    sunlight: 'Bright',
    watering: 'Moderate',
    petSafety: 'Caution',
    nativeRegion: 'Asia, Europe, North America',
    careTips: [
      'Water deeply when the top inch of soil feels dry',
      'Prioritize morning sun and good airflow to reduce mildew',
      'Deadhead spent blooms to encourage repeat flowering',
      'Feed lightly during active growth for stronger blooms',
    ],
    similarFlowers: ['Tulip', 'Orchid', 'Lavender'],
    aliases: ['rose', 'rosa'],
  },
  {
    id: 'tulip',
    name: 'Tulip',
    scientificName: 'Tulipa',
    description:
      'A spring favorite with elegant, cup-shaped blooms and clean lines that feel instantly modern and minimal.',
    colors: ['Red', 'Purple', 'Yellow', 'White', 'Orange'],
    season: 'Spring',
    sunlight: 'Bright',
    watering: 'Low',
    petSafety: 'Toxic',
    nativeRegion: 'Central Asia, Türkiye',
    careTips: [
      'Water sparingly and avoid soggy soil',
      'Plant in well-draining soil with a cool rest period',
      'Remove spent blooms but leave foliage until it yellows',
    ],
    similarFlowers: ['Rose', 'Sunflower', 'Orchid'],
    aliases: ['tulip', 'tulipa'],
  },
  {
    id: 'sunflower',
    name: 'Sunflower',
    scientificName: 'Helianthus annuus',
    description:
      'Bold and radiant, sunflowers track light and bring strong, optimistic structure to gardens and bouquets.',
    colors: ['Golden Yellow', 'Bronze', 'Cream'],
    season: 'Summer',
    sunlight: 'Bright',
    watering: 'Moderate',
    petSafety: 'Pet-safe',
    nativeRegion: 'North America',
    careTips: [
      'Stake tall varieties to protect from wind',
      'Water consistently during budding and flowering',
      'Give plenty of space for airflow and strong stems',
    ],
    similarFlowers: ['Lavender', 'Tulip', 'Rose'],
    aliases: ['sunflower', 'helianthus'],
  },
  {
    id: 'orchid',
    name: 'Orchid',
    scientificName: 'Orchidaceae',
    description:
      'A sculptural, high-end houseplant with long-lasting blooms and a reputation for elegance when cared for well.',
    colors: ['White', 'Purple', 'Pink', 'Yellow'],
    season: 'Year-round',
    sunlight: 'Medium',
    watering: 'Low',
    petSafety: 'Pet-safe',
    nativeRegion: 'Tropical & Subtropical Regions',
    careTips: [
      'Use an airy orchid mix; roots need oxygen',
      'Water when the pot feels light, then drain fully',
      'Bright, indirect light yields the best blooms',
      'Avoid water sitting in the crown of the plant',
    ],
    similarFlowers: ['Rose', 'Tulip', 'Lavender'],
    aliases: ['orchid', 'phalaenopsis', 'orchidaceae'],
  },
  {
    id: 'lavender',
    name: 'Lavender',
    scientificName: 'Lavandula',
    description:
      'A calming, aromatic plant with soft purple spikes, loved for pollinator appeal and effortless, breezy texture.',
    colors: ['Lavender', 'Deep Purple', 'Pale Violet'],
    season: 'Summer',
    sunlight: 'Bright',
    watering: 'Low',
    petSafety: 'Caution',
    nativeRegion: 'Mediterranean Region',
    careTips: [
      'Let soil dry between waterings to protect roots',
      'Prune lightly after blooming to keep it compact',
      'Choose gritty, well-draining soil for best fragrance',
    ],
    similarFlowers: ['Sunflower', 'Rose', 'Orchid'],
    aliases: ['lavender', 'lavandula'],
  },
]

function normalize(s = '') {
  return s.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim()
}

export function findFlowerProfile(candidate = '') {
  const normalized = normalize(candidate)
  if (!normalized) return null
  return (
    FLOWER_CATALOG.find((item) =>
      item.aliases.some((alias) => normalized.includes(alias) || alias.includes(normalized)),
    ) ?? null
  )
}

export function getFallbackProfile(name = '', scientificName = '') {
  const cleanName = name || 'Unknown flower'
  return {
    name: cleanName,
    scientificName: scientificName || 'Unspecified species',
    description: `${cleanName} was detected, but BloomScan does not yet have a full care profile for this species.`,
    colors: ['Varies'],
    season: 'Varies',
    sunlight: 'Medium',
    watering: 'Moderate',
    petSafety: 'Unknown',
    nativeRegion: 'Unknown',
    careTips: ['Use a closer photo for improved species-level guidance.'],
    similarFlowers: [],
  }
}

