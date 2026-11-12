# Silk Roads Lab — Classroom MVP

Entry point: /silk-roads

## OER structure
- Six regions: China, Central Asia, India, Persia, Arabia, Byzantium.
- Trade Zone 1: Byzantium + Arabia.
- Trade Zone 2: Persia + India.
- Trade Zone 3: Central Asia + China.
- Round 1: trade within the home region.
- Round 2: trade within the assigned trade zone.
- Round 3: reach distant regions through a chain of adjacent merchant intermediaries.
- One disease card is assigned to a merchant in each regional group and remains concealed from other players until exchanged.
- China's Round 2 goods tax must be paid before the teacher can open Round 3.
- Regional Round 2/3 adjustments are represented in the guide and scoring logic.

## Feature map
- src/silkroads/SilkRoadsApp.tsx: classroom UI, map, market, merchant journal.
- src/silkroads/engine.ts: region data, starter decks, guide cards and scoring.
- src/silkroads/SilkRoadsApp.css: responsive parchment/cartographic interface.
- server/silkRoadsRules.js: server-side regional adjacency rules.
- server/index.js: classroom, round, trade and inventory API.
- server/db.js: persistent SQLite room state.

## Run locally
1. Install dependencies using the existing project lockfile.
2. Start the API with npm run server.
3. Start the Vite app with npm run dev.
4. Open /silk-roads and create a classroom. Students join with the six-character room code.

## Acceptance checks
- Teacher creates a room; students join from separate browsers.
- Only the teacher can advance rounds.
- Round 1 rejects cross-region trades.
- Round 2 rejects cross-zone trades.
- Round 3 requires an adjacent intermediary chain for distant trades.
- Accepted trades transfer item IDs and preserve origin metadata.
- Disease cards are concealed from other players until transferred.
- China merchants must pay the Round 2 goods tax before Round 3.
- Classroom state and trade log persist in SQLite.

## MVP limitations
- Room-code access; no student accounts in this version.
- Polling every 2.5 seconds rather than WebSocket realtime.
- The map is schematic, not geospatially precise.
- The initial card-dealing mechanic is a digital simplification of the printed OER card distribution.
