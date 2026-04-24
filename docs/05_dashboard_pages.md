# D5 — Dashboard Page Design

---

## Page 1: Executive Overview

**Route:** `/dashboard/executive`
**Primary User:** CEO, CFO, COO
**Refresh Cadence:** Daily

### Layout (4-zone grid)

```
┌─────────────────────────────────────────────────────────┐
│  HEADER: Portfolio Health Banner                        │
│  "55 properties · ¥82.4B total value · ¥4.2B NOI"      │
├──────────┬──────────┬──────────┬──────────┬────────────┤
│  TOTAL   │  AVG     │  HIGH    │  VACANT  │  TREND     │
│  VALUE   │  CAP     │  RISK    │  UNITS   │  ARROW     │
│  ¥82.4B  │  RATE    │  PROP    │  8       │  ▲ +4.2%   │
│          │  4.21%   │  6       │          │  YoY       │
├──────────┴──────────┴──────────┴──────────┴────────────┤
│  TOP OPPORTUNITIES          │  HIGH RISK ALERTS        │
│  (ranked list, color coded) │  (red flag properties)   │
├─────────────────────────────┴──────────────────────────┤
│  PORTFOLIO MAP (Leaflet)                               │
│  · Green = Investment Score >7.5                       │
│  · Yellow = Score 5–7.5                               │
│  · Red = Score <5 or high vacancy                     │
├─────────────────────────────────────────────────────────┤
│  AI EXECUTIVE SUMMARY (GPT-4o generated)               │
│  "This week, 3 properties require attention:           │
│   Saitama Omiya Office (72% occupancy, aging           │
│   structure), Yokohama Kannai (earthquake risk HIGH),  │
│   Nerima House (vacant 90 days)..."                    │
└─────────────────────────────────────────────────────────┘
```

### Key Components
- **Portfolio KPI cards:** Total Value, Total NOI, Avg Cap Rate, Portfolio Vacancy Rate, YoY Revenue Growth
- **Opportunity table:** top 5 properties by revenue uplift potential (predicted_rent − current_rent)
- **Risk alert panel:** properties with risk_score > 6.5 or vacancy > 20%
- **Portfolio map:** color-coded by investment_score, click-to-detail
- **AI Summary card:** 3–5 bullet executive digest, auto-refreshed daily
- **Market Trend mini-chart:** regional price trend last 12 months (line chart)

---

## Page 2: Property Valuation

**Route:** `/dashboard/valuation/:property_id`
**Primary User:** Upper Manager, Analyst, Sales Staff

### Layout

```
┌─────────────────────────────────────────────────────────┐
│  PROPERTY HEADER                                        │
│  [Photo] Shibuya Mark Tower Office Suite                │
│          1-2-3 Dogenzaka, Shibuya-ku                    │
│          Type: Office | 3,200 m² | 18 floors | Age: 8yr│
├──────────┬──────────┬──────────┬──────────┬────────────┤
│ PREDICTED│ PREDICTED│ PRICE    │ RENT     │ CONFIDENCE │
│ PRICE    │ RENT/mo  │ per m²   │ per m²   │ SCORE      │
│ ¥4.38B   │¥13.4M    │¥1,369K   │ ¥4,188   │ 87%        │
├──────────┴──────────┴──────────┴──────────┴────────────┤
│  PRICE CONFIDENCE INTERVAL                             │
│  ──── [  ¥4.1B  ────[●]──── ¥4.38B ────  ¥4.65B  ]── │
│       Low (80%)     Predicted          High (80%)      │
├──────────────────────────────┬─────────────────────────┤
│  COMPARABLE PROPERTIES MAP   │  FACTOR ANALYSIS        │
│  (nearby pins with rents)    │  + Shibuya location     │
│                              │  + 320m to station      │
│                              │  + 96.5% occupancy      │
│                              │  − Low cap rate 3.29%   │
│                              │  − High entry price     │
├──────────────────────────────┴─────────────────────────┤
│  PRICE HISTORY CHART (bar: quarterly transaction data)  │
│  COMPARABLE TABLE (3 nearest similar properties)        │
└─────────────────────────────────────────────────────────┘
```

### Key Components
- **Valuation cards:** predicted price, predicted rent, price/m², rent/m², confidence score
- **Confidence interval slider:** visual range display
- **Comparable map:** properties within 1km radius, color by rent/m²
- **Factor analysis:** SHAP-based positive / negative drivers (bar chart)
- **Price history:** quarterly price per m² trend (line or bar chart)
- **Comparable table:** side-by-side comparison of 3 similar properties

---

## Page 3: Revenue Simulation

**Route:** `/dashboard/revenue/:property_id`
**Primary User:** Investor, Upper Manager, CFO

### Layout

```
┌─────────────────────────────────────────────────────────┐
│  SCENARIO SELECTOR  [● Base Case] [Bull Case] [Bear]    │
│  Adjustable inputs: Rent ¥[____] | Occupancy [___]%     │
│                     Vacancy Risk [Low/Med/High]         │
├──────────────────────────────────────────────────────────┤
│  MONTHLY REVENUE   │  ANNUAL NOI    │  CAP RATE          │
│  ¥13.4M            │  ¥144.2M       │  3.29%             │
├──────────────────────────────────────────────────────────┤
│  ROI      │  PAYBACK  │  VACANCY RISK │  INVESTMENT SCORE │
│  3.44%    │  29.1 yrs │  LOW (2.1/10) │  8.7 / 10         │
├──────────────────────────────────────────────────────────┤
│  SCENARIO COMPARISON CHART (grouped bars)               │
│       Bear     Base     Bull                            │
│  Rev  ¥128M   ¥144M    ¥162M                            │
│  NOI  ¥108M   ¥144M    ¥158M                            │
│  ROI  2.8%    3.4%     4.1%                             │
├──────────────────────────────────────────────────────────┤
│  5-YEAR CUMULATIVE CASH FLOW (area chart)               │
│  Break-even line overlay                                │
├──────────────────────────────────────────────────────────┤
│  REVENUE WATERFALL                                      │
│  Gross Rent → Service Fee → Maintenance → Mgmt →       │
│  Tax → Net Operating Income                            │
└─────────────────────────────────────────────────────────┘
```

### Key Components
- **Scenario selector:** toggle Bull/Base/Bear with adjustable sliders
- **Revenue KPI cards:** monthly revenue, annual NOI, cap rate, ROI, payback period
- **Scenario comparison:** grouped bar chart comparing all three scenarios
- **5-year projection:** cumulative cash flow area chart with break-even line
- **Waterfall chart:** shows how gross revenue flows to NOI
- **Sensitivity table:** how cap rate changes with ±10%, ±20% occupancy or rent

---

## Page 4: Location Intelligence

**Route:** `/dashboard/location/:property_id`
**Primary User:** Sales Staff, Manager, Analyst

### Layout

```
┌─────────────────────────────────────────────────────────┐
│  FULL-WIDTH MAP (Leaflet)                              │
│  Layers: Stations, Offices, Schools, Hospitals,        │
│          Competitors, Population Heatmap               │
│  [Toggle layers control — top right]                   │
├──────────────────────────────────────────────────────────┤
│  LOCATION SCORES                                        │
│  Foot Traffic: ████████░░ 9.2/10                        │
│  Tourist Score: ████████░░ 8.5/10                       │
│  Walkability:   ██████████ 9.8/10                       │
│  Transport:     ██████████ 9.5/10                       │
├──────────────────────────────────────────────────────────┤
│  POPULATION DATA          │  NEARBY INFRASTRUCTURE      │
│  1km Residents: 42,000    │  Nearest Station: 320m      │
│  Daytime Pop: 180,000     │  Office District: 100m      │
│  Avg Income: ¥7.2M/yr     │  Shopping: 150m             │
│  Households: 18,500       │  School: 900m               │
├───────────────────────────┴────────────────────────────┤
│  EVENT IMPACT CALENDAR                                  │
│  May: Shibuya Festival (+8% foot traffic 3 days)       │
│  Jun: Pride Parade (traffic disruption 1 day)          │
├──────────────────────────────────────────────────────────┤
│  REDEVELOPMENT / NEWS ALERTS                            │
│  [AI-extracted] "Shibuya Station West Exit renovation   │
│  to complete Q3 2026, adding 3,000 daily commuters"    │
└─────────────────────────────────────────────────────────┘
```

### Key Components
- **Interactive map:** toggle layer control, click competitors to compare
- **Location score gauges:** foot traffic, tourist, walkability, transport (0–10)
- **Population summary cards:** residents, daytime, income, households
- **Distance table:** key distances in meters
- **Event calendar:** upcoming events with estimated revenue impact %
- **News alert feed:** AI-extracted signals from area news

---

## Page 5: Renovation Impact

**Route:** `/dashboard/renovation/:property_id`
**Primary User:** Upper Manager, Asset Manager

### Layout

```
┌─────────────────────────────────────────────────────────┐
│  PROPERTY: Roppongi Hills Adjacent Mixed-Use            │
│  Current State: 78% occupancy | Rent 27% below market  │
│  Recommended Action: RENOVATE                          │
├──────────────────────────────────────────────────────────┤
│  RENOVATION OPTIONS (tabs)                              │
│  [Interior] [Exterior] [Mechanical] [Full Renovation]   │
├──────────────────────────────────────────────────────────┤
│  SELECTED: Full Renovation                              │
│  Est. Cost: ¥420M                                       │
│  Expected Rent Increase: +28.5%                        │
│  Expected Occupancy Gain: +18%                         │
│  Payback Period: 42 months (3.5 years)                 │
├──────────────────────────────────────────────────────────┤
│  BEFORE vs. AFTER WATERFALL                             │
│  Before NOI: ¥244M → After NOI: ¥358M (+¥114M/yr)     │
├──────────────────────────────────────────────────────────┤
│  RENOVATION PRIORITY RANKING (all options)             │
│  1. Full Renovation    ROI 27.1%  Payback 42mo  ●●●●● │
│  2. Interior Only      ROI 18.5%  Payback 28mo  ●●●●  │
│  3. Mechanical Only    ROI 12.3%  Payback 35mo  ●●●   │
├──────────────────────────────────────────────────────────┤
│  PHOTO ANALYSIS (AI)                                    │
│  [Upload building photo] → AI detects: "Aging facade,  │
│  HVAC units outdated, lobby requires modernization"    │
└─────────────────────────────────────────────────────────┘
```

---

## Page 6: Investor View

**Route:** `/dashboard/investor/:property_id`
**Primary User:** Investor, Fund Manager

### Layout

```
┌─────────────────────────────────────────────────────────┐
│  INVESTMENT SCORE: 8.7 / 10   RECOMMENDED: ● HOLD      │
├───────────┬──────────┬──────────┬────────────┬─────────┤
│ GROSS     │  NET     │  CAP     │  EST. IRR  │ PAYBACK │
│ YIELD     │  YIELD   │  RATE    │  (5yr)     │ PERIOD  │
│ 3.83%     │  3.44%   │  3.29%   │  6.2%      │ 29yr    │
├───────────┴──────────┴──────────┴────────────┴─────────┤
│  SENSITIVITY TORNADO CHART                             │
│  Occupancy ±20%    ───[■■■■■■■■]───  Highest impact   │
│  Rent ±15%         ────[■■■■■■]────                   │
│  Interest Rate ±1% ──────[■■■■]────                   │
│  Area Price ±10%   ────────[■■]────                   │
├──────────────────────────────────────────────────────────┤
│  RISK MATRIX                                            │
│  ↑ High   │ Moderate  │ Critical  │                    │
│  Impact   │           │           │                    │
│           │ ● Vacancy │ ● Tenant  │                    │
│  ↓ Low    │ risk      │ default   │                    │
│           ├───────────┴───────────┤                    │
│           Low Probability → High                       │
├──────────────────────────────────────────────────────────┤
│  5-YEAR CUMULATIVE RETURN PROJECTION (line chart)       │
│  [Base] [Bull +2 std] [Bear −2 std]                    │
├──────────────────────────────────────────────────────────┤
│  LIQUIDITY SCORE: 7.5/10 (Prime Shibuya = high)        │
│  DOWNSIDE PROTECTION: Strong (occupancy floor 85%)      │
│  COMPARISON vs. PORTFOLIO: Top 15% by investment score  │
└─────────────────────────────────────────────────────────┘
```

---

## Page 7: Document AI

**Route:** `/dashboard/documents`
**Primary User:** Analyst, Project Manager, Sales Staff

### Layout

```
┌─────────────────────────────────────────────────────────┐
│  UPLOAD ZONE                                           │
│  ┌─────────────────────────────────────┐              │
│  │  Drag & drop PDF, Excel, Image,     │              │
│  │  Audio, or any document             │              │
│  │  [Browse Files]                     │              │
│  └─────────────────────────────────────┘              │
│  Link to property: [Search property ▾]                 │
├──────────────────────────────────────────────────────────┤
│  EXTRACTED RESULTS                                      │
│  Document: lease_agreement_shibuya_2025.pdf            │
│  Confidence: 92%   Status: ● Completed                 │
│                                                        │
│  FIELD          │ EXTRACTED VALUE     │ CONFIDENCE     │
│  Tenant Name    │ Nippon Tech KK      │ 98%            │
│  Rent/month     │ ¥12,800,000         │ 95%            │
│  Contract Start │ 2024-04-01          │ 97%            │
│  Contract End   │ 2026-03-31          │ 97%            │
│  Renewal Option │ Yes, 2-year option  │ 89%            │
│  Deposit        │ 3 months rent       │ 91%            │
│  Special Terms  │ No subleasing...    │ 84%            │
├──────────────────────────────────────────────────────────┤
│  AI SUMMARY                                             │
│  "This is a standard 2-year commercial lease for floor  │
│   8 of Shibuya Mark Tower. Key risk: lease expires in   │
│   6 months. Renewal option is available at market rate. │
│   Recommended action: begin renewal negotiation now."   │
├──────────────────────────────────────────────────────────┤
│  DOCUMENT QUEUE                                         │
│  ● processing: rent_roll_q1_2026.xlsx                  │
│  ✓ completed:  inspection_report_p005.pdf              │
│  ✗ failed:     voice_note_neighbor_interview.m4a       │
└─────────────────────────────────────────────────────────┘
```

---

## Page 8: Manager Task Board

**Route:** `/dashboard/tasks`
**Primary User:** Project Manager, Analyst

### Layout

```
┌─────────────────────────────────────────────────────────┐
│  TASK FILTERS: [All] [Urgent] [Missing Data] [Expiring] │
├──────────────────────────────────────────────────────────┤
│  URGENT — 3 items                                       │
│  ● p-039 Nerima House: Vacant 90+ days — take action   │
│  ● p-014 Kannai Office: Lease expires in 45 days       │
│  ● p-024 Chinatown Restaurant: Data incomplete (38%)   │
├──────────────────────────────────────────────────────────┤
│  ALERTS — from news & government                        │
│  ⚠ New subway line announced: impacts p-052 (+15%)     │
│  ⚠ Zoning change proposal: affects p-007 Omiya        │
│  ⚠ Earthquake risk re-assessment: p-014 flagged HIGH  │
├──────────────────────────────────────────────────────────┤
│  DATA QUALITY BOARD                                     │
│  Property        │ Completeness │ Last Updated │ Action │
│  p-024 Chinatown │ ████░░ 38%  │ 62 days ago  │ Update│
│  p-036 Funabashi │ ██████░ 55% │ 45 days ago  │ Update│
│  p-053 Tokorozawa│ █████░░ 48% │ 90 days ago  │ Update│
├──────────────────────────────────────────────────────────┤
│  NEXT BEST ACTIONS (AI-recommended)                     │
│  1. Upload lease document for p-039 (vacant property)  │
│  2. Request renovation quote for p-005 Roppongi        │
│  3. Review rent roll for p-002 Shinjuku Tower A        │
└─────────────────────────────────────────────────────────┘
```

---

## Navigation Structure

```
PropIQ
├── / (redirect to /dashboard/executive)
├── /dashboard
│   ├── /executive          ← C-level overview
│   ├── /properties         ← property list + search + filter
│   ├── /property/:id       ← property detail hub
│   │   ├── /valuation      ← price & rent prediction
│   │   ├── /revenue        ← simulation & scenarios
│   │   ├── /location       ← map & area data
│   │   ├── /renovation     ← renovation scenarios
│   │   └── /investor       ← investor metrics
│   ├── /documents          ← Document AI upload & extraction
│   ├── /tasks              ← Manager task board
│   └── /reports            ← Report generator
├── /admin
│   ├── /users              ← User management
│   ├── /models             ← Model version management
│   └── /settings           ← Configuration
```
