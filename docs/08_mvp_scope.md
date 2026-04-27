# D8 — MVP Scope (Version 1.0)

**Target delivery: 12 weeks | Team: 3 engineers, 1 data scientist, 1 designer**

---

## MVP Philosophy

Build the minimum surface that proves the core value proposition:
> "PropAI tells you which property is underperforming, by how much, and what to do about it — in under 30 seconds."

Everything not serving that sentence is deferred to v2.

---

## MVP Included

### Data Layer
- [x] Property master data for up to 200 properties (manual upload or CSV import)
- [x] Mock location data (pre-seeded, not live API)
- [x] Mock market data (pre-seeded benchmarks by district)
- [x] Revenue data (manual entry + Excel rent roll import)
- [x] Basic renovation scenarios (3 standard types: interior, mechanical, full)

### Prediction Models
- [x] Price prediction: linear regression + gradient boosting (LightGBM)
- [x] Rent prediction: same model family, different target
- [x] Revenue simulation: formula-based (NOI, cap rate, yield) — not ML
- [x] Risk score: rule-based weighted scoring (occupancy, age, vacancy area)
- [x] Investment score: weighted combination of yield, risk score, trend
- [x] Confidence score: based on data completeness + model CV error

### Dashboard Pages
- [x] Executive Overview (KPI cards + portfolio map + AI summary)
- [x] Property Valuation (price/rent prediction + comparable table)
- [x] Revenue Simulation (3-scenario waterfall + 5-year projection)
- [x] Location Intelligence (map + location scores, no live foot traffic)
- [x] Renovation Impact (3 scenario types + before/after NOI)
- [x] Manager Task Board (data quality + alerts)

### AI Features (MVP Tier)
- [x] PDF Contract Extraction (GPT-4o): tenant, rent, dates, renewal
- [x] Excel Rent Roll Reader (pandas + GPT-4o header mapping)
- [x] Executive Summary Generator (daily auto-generated portfolio brief)
- [x] News signal extraction (2–3 curated RSS feeds, manual trigger)

### Auth & Access Control
- [x] Role-based access: C-level, Manager, Analyst, Sales, Investor
- [x] Each role sees only their relevant dashboard sections
- [x] JWT-based session management

### Tech Stack (MVP)
```
Frontend:   Next.js 14 + TypeScript + Tailwind CSS
Charts:     Recharts (MVP) — swap to ECharts in v2 for performance
Maps:       Leaflet + OpenStreetMap (free, no API key needed)
Backend:    FastAPI (Python 3.11)
Database:   PostgreSQL 16 + PostGIS (for geo queries)
Cache:      Redis (session + prediction cache)
File Store: Local filesystem → S3 in v2
AI:         OpenAI GPT-4o (API)
ML:         scikit-learn + LightGBM
Deploy:     Docker Compose (dev) → single VPS or App Runner (prod)
```

---

## MVP Excluded (Deferred to v2)

- Live foot traffic data (Mapbox / Tableau)
- Voice interview transcription (Whisper)
- Image analysis (GPT-4o Vision)
- RAG document search (pgvector)
- Live government / MLIT data feeds
- Automated news scraping (scheduled)
- Full investor IRR / NPV calculator
- Report PDF generator
- Multi-currency support
- Mobile responsive layout
- White-label for external investors

---

## MVP Build Plan (12 Weeks)

| Week | Milestone |
|------|-----------|
| 1–2 | Database schema, mock data seed, FastAPI project scaffold |
| 3–4 | ML models (price, rent prediction), scoring logic |
| 5–6 | Frontend: Executive Overview + Property Valuation pages |
| 7–8 | Frontend: Revenue Simulation + Location Map pages |
| 9   | AI: PDF extraction + Excel rent roll reader |
| 10  | Frontend: Renovation Impact + Task Board + Auth |
| 11  | Integration testing + data quality review |
| 12  | Staging deploy + user acceptance testing |

---

## MVP Success Criteria

| Criterion | Target |
|-----------|--------|
| Properties loaded in system | 55+ (mock dataset) |
| Prediction latency | < 2 seconds |
| PDF extraction accuracy | > 85% on key fields |
| Dashboard page load | < 1.5 seconds |
| Zero critical data loss bugs | Required |
| C-level user can generate briefing | < 10 seconds |
| Manager can identify top 3 actions | < 30 seconds |
