import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import multer from 'multer'
import { analyzeFlowerImage } from './analysisService.js'

const app = express()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
})

const PORT = Number(process.env.PORT || 8787)
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'])

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'bloomscan-api' })
})

app.post('/api/analyze-flower', upload.single('image'), async (req, res) => {
  try {
    const file = req.file
    if (!file) {
      return res.status(400).json({
        status: 'error',
        errorCode: 'NO_FILE',
        message: 'Please upload an image file.',
      })
    }
    if (!ALLOWED_MIME.has(file.mimetype)) {
      return res.status(415).json({
        status: 'error',
        errorCode: 'UNSUPPORTED_FILE',
        message: 'Unsupported file type. Use JPG, PNG, WEBP, or HEIC.',
      })
    }
    if (!process.env.PLANT_ID_API_KEY) {
      return res.status(503).json({
        status: 'error',
        errorCode: 'MISSING_API_KEY',
        message: 'Plant identification API key is not configured.',
      })
    }

    const analysis = await analyzeFlowerImage({
      imageBuffer: file.buffer,
      apiKey: process.env.PLANT_ID_API_KEY,
    })
    return res.json(analysis)
  } catch (error) {
    if (error?.name === 'AbortError') {
      return res.status(504).json({
        status: 'error',
        errorCode: 'TIMEOUT',
        message: 'The identification request timed out. Please try again.',
      })
    }

    return res.status(500).json({
      status: 'error',
      errorCode: 'ANALYSIS_FAILED',
      message: 'BloomScan could not process this image right now.',
    })
  }
})

app.listen(PORT, () => {
  console.log(`BloomScan API running on http://localhost:${PORT}`)
})

