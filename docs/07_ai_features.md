# D7 — AI Feature List

---

## AI Feature 1: PDF Contract & Lease Extraction

**What it does:** Extracts structured fields from uploaded PDF lease agreements, tenancy contracts, and legal documents.

**Technology:** GPT-4o with vision + Tesseract OCR fallback for scanned documents

**Input:** PDF file (native or scanned)

**Output fields extracted:**
- Tenant name, company registration number
- Contract start date, contract end date
- Monthly rent, security deposit
- Renewal clause (yes/no + terms)
- Subletting permission
- Special conditions / non-standard clauses
- Landlord / management contact
- Property reference (linked to property_id)

**Confidence handling:** Each field gets a confidence score (0–1). Fields below 0.80 are flagged for human review.

**UI:** Document viewer with annotated highlights showing which text was used for each extracted field.

---

## AI Feature 2: Excel Rent Roll Reader

**What it does:** Parses uploaded Excel rent roll files and generates a structured revenue summary per property.

**Technology:** Python pandas + GPT-4o for column mapping and anomaly detection

**Input:** .xlsx or .csv files

**Output:**
- Recognized column schema (auto-maps non-standard headers)
- Per-unit summary: unit ID, tenant, rent, start date, expiry, status
- Property-level aggregate: total rent, total vacancy, weighted occupancy
- Anomalies flagged: unexplained zero rents, future start dates, overlapping tenancies
- Comparison to prior period rent roll (if uploaded)

**Use case:** Property manager uploads a quarterly rent roll → PropIQ auto-generates the revenue dashboard without manual data entry.

---

## AI Feature 3: Property Image Analysis

**What it does:** Analyzes uploaded property or inspection photos to estimate renovation needs and flag visible defects.

**Technology:** GPT-4o Vision (multimodal)

**Input:** JPEG/PNG photos of interior, exterior, lobby, common areas, roof

**Output:**
- Condition rating per area (1–5 scale)
- Detected issues: "aging facade", "water damage on ceiling", "outdated HVAC units", "lobby modernization needed"
- Estimated urgency: cosmetic / functional / structural
- Recommended renovation category mapping
- Summary text: "Building exterior shows weathering consistent with 15+ years. Interior lobby has dated finishes. Recommend cosmetic renovation within 12 months."

**Linked to:** Renovation scenarios (pre-fills renovation_type recommendation)

---

## AI Feature 4: Voice Interview Transcription & Summarization

**What it does:** Transcribes audio recordings from field staff interviews with neighbors, tenants, or local business owners, then extracts business signals.

**Technology:** OpenAI Whisper (speech-to-text) + GPT-4o (summarization + signal extraction)

**Input:** .m4a, .mp3, .wav, .mp4 audio files

**Output:**
- Full transcript (Japanese or English)
- Key themes detected: area reputation, noise level, foot traffic patterns, customer demographics, local concerns, planned changes
- Sentiment: positive / neutral / negative per theme
- Structured signals: {"foot_traffic": "increasing", "noise": "high on weekends", "area_reputation": "improving", "planned_development": "new mall Q4 2026"}
- Summary narrative for manager review

**Use case:** Sales staff records 5-minute neighborhood walk interview → AI extracts area intelligence without manual note-taking.

---

## AI Feature 5: News & Government Data Signal Extraction

**What it does:** Monitors online news, government announcements, and redevelopment notices for signals affecting property value or revenue.

**Technology:** RSS scraping + GPT-4o summarization + rule-based tagger

**Input sources:**
- National Land Agency land price announcements
- Ministry of Land, Infrastructure, Transport and Tourism (MLIT) reports
- Local government planning and zoning announcements
- Major real estate news outlets (Nikkei, Homes, SUUMO news)
- Railway / infrastructure project announcements

**Output:**
- Signal type: price_impact / demand_impact / supply_impact / risk_impact
- Affected districts list
- Estimated directional impact: +/− % on price or rent
- Urgency: immediate / medium-term / long-term
- Linked property list (properties in affected district)

**Example output:**
```json
{
  "signal_type": "demand_impact",
  "headline": "Tokyo Metro Hibiya Line to add new station at Ebisu South 2027",
  "affected_districts": ["Ebisu", "Daikanyama"],
  "estimated_price_impact_pct": 8.5,
  "direction": "positive",
  "urgency": "medium_term",
  "linked_properties": ["p-009", "p-015"]
}
```

---

## AI Feature 6: Geospatial Competitor Benchmarking

**What it does:** Automatically identifies and compares a target property against nearby competing properties.

**Technology:** PostGIS spatial queries + scikit-learn similarity matching + GPT-4o narrative

**Input:** property_id

**Output:**
- Top 3–5 competitor properties within configurable radius (default 1km)
- Comparison table: rent/m², occupancy, building age, distance, amenities
- Competitive position: our property vs. market average
- Differentiation opportunities: what our property offers that competitors don't
- Risk flags: nearby new supply coming in next 12 months

**Use case:** Leasing staff preparing a pitch — click "Compare to Market" and get an instant competitive position card.

---

## AI Feature 7: Executive Summary Generator

**What it does:** Generates a concise, decision-ready executive briefing for C-level users, covering the whole portfolio or a single property.

**Technology:** GPT-4o with structured data + RAG from document extractions

**Input:** Portfolio KPIs, property predictions, risk alerts, news signals

**Output format:**
```
PORTFOLIO EXECUTIVE SUMMARY — April 2026

Portfolio Health: GOOD
Total Value: ¥82.4B (+4.2% YoY) | Total NOI: ¥4.2B | Avg Cap Rate: 4.21%

⚠ ATTENTION REQUIRED (3 properties):
1. Nerima House (p-039) — Vacant 90 days. Recommend: price reduction or sell.
2. Yokohama Kannai (p-014) — Earthquake risk HIGH. Structural assessment overdue.
3. Omiya Office (p-007) — 28% vacancy. Renovation ROI positive at 42-month payback.

🚀 TOP OPPORTUNITY THIS MONTH:
Kawaguchi Distribution Center (p-044) — Investment score 9.1.
New 2-year building, 100% occupied, cap rate 6.0%. Consider acquisition.

📈 MARKET SIGNAL:
Tokyo logistics sector demand up 12% YoY. Warehouse properties outperforming.
```

---

## AI Feature 8: Smart Data Request (Recommended Data for Manager)

**What it does:** Analyzes which data fields are missing or stale for each property and recommends the highest-priority data to collect.

**Technology:** Rule-based completeness checker + LightGBM feature importance

**Output:**
- Data completeness score per property
- Ranked list of missing fields by impact on prediction confidence
- Suggested sources: "Obtain government land price from MLIT website", "Request rent roll from property manager"

---

## AI Feature 9: RAG Document Search

**What it does:** Allows users to ask natural language questions across all uploaded documents for a property.

**Technology:** OpenAI embeddings + vector store (pgvector) + GPT-4o

**Example queries:**
- "What are the renewal terms for the Shibuya Tower lease?"
- "Which tenants have subleasing permission?"
- "What did the building inspection say about the HVAC system?"

**Input:** Natural language query + property filter (optional)
**Output:** Direct answer + source document reference + highlighted excerpt

---

## AI Feature Summary Table

| Feature | Technology | Input Type | Priority |
|---------|-----------|-----------|---------|
| PDF Contract Extraction | GPT-4o + OCR | PDF | MVP |
| Excel Rent Roll Reader | pandas + GPT-4o | Excel | MVP |
| Image Analysis | GPT-4o Vision | JPEG/PNG | MVP |
| Voice Interview | Whisper + GPT-4o | Audio | MVP |
| News Signal Extraction | Scraper + GPT-4o | RSS/Web | MVP |
| Competitor Benchmarking | PostGIS + GPT-4o | Internal data | MVP |
| Executive Summary | GPT-4o | All data | MVP |
| Smart Data Request | Rule-based + ML | Internal data | MVP |
| RAG Document Search | Embeddings + GPT-4o | Uploaded docs | v2 |
