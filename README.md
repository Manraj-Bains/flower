# BloomScan

BloomScan is a React + TypeScript + Tailwind app with a Node proxy backend for real flower identification.

## Setup

1. Copy `.env.example` to `.env`
2. Add your Plant.id key to `PLANT_ID_API_KEY`
3. Install dependencies:
   - `npm install`

## Run

Start API server:

- `npm run dev:server`

Start frontend:

- `npm run dev`

The Vite app proxies `/api/*` requests to `http://localhost:8787`.

## Build

- `npm run build`

