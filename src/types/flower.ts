export type Sunlight = 'Low' | 'Medium' | 'Bright'
export type Watering = 'Low' | 'Moderate' | 'High'
export type PetSafety = 'Pet-safe' | 'Caution' | 'Toxic'
export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'Year-round'

export type Flower = {
  id: string
  name: string
  scientificName: string
  description: string
  colors: string[]
  season: Season
  sunlight: Sunlight
  watering: Watering
  petSafety: PetSafety
  nativeRegion: string
  careTips: string[]
  similarFlowers: string[]
  accent: 'sage' | 'blossom' | 'sky'
}

