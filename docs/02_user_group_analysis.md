# D2 — User Group Analysis

---

## User Group 1: C-Level Executives (CEO, CFO, COO, CIO)

### Main Business Questions
- What is the total value and revenue of our entire portfolio right now?
- Which properties are performing below expectations?
- Where are our biggest revenue risks in the next 12 months?
- Should we expand, divest, or hold given current market conditions?
- What is our projected revenue vs. actuals this quarter?

### Data They Need
- Portfolio-level aggregates (total value, total NOI, total cap rate)
- Red/amber/green status per property
- Top 5 risks and top 5 opportunities
- Market trend direction (rising / flat / falling)
- AI-generated narrative summary (one page maximum)

### Dashboard Output
- Single-page Executive Overview with portfolio scorecard
- Trend charts (12-month portfolio revenue trajectory)
- Heat map of properties by performance tier
- Automated weekly executive briefing email

### KPIs They Care About
- Total Portfolio Value (¥B)
- Total Annual NOI
- Portfolio Average Cap Rate
- Number of high-risk properties
- Portfolio vacancy rate
- YoY revenue growth %

### Best Visualization
- KPI scorecards (big numbers with trend arrows)
- Portfolio heatmap (map view colored by performance)
- Waterfall chart (revenue vs. cost breakdown)
- Donut chart (portfolio composition by property type)

### Decisions Made
- Capital allocation priorities
- Divestiture candidates
- Investment budget approval
- Strategic market entry / exit

---

## User Group 2: Upper Managers / Business Managers (Division Head, Regional Manager)

### Main Business Questions
- Which properties in my region are underperforming and why?
- What is the optimal rent for each property given current market conditions?
- How much revenue uplift can I get from renovating building X?
- How do my properties compare to competitor buildings nearby?
- What is the occupancy trajectory for the next 6 months?

### Data They Need
- Property-level performance vs. benchmark
- Rent gap analysis (current vs. market)
- Competitor benchmarking (200m–2km radius)
- Renovation cost vs. uplift projections
- Occupancy trend and vacancy risk per property

### Dashboard Output
- Property performance table with sortable KPIs
- Rent gap chart (current vs. predicted market rent)
- Competitor map view
- Renovation scenario comparison

### KPIs They Care About
- Revenue per m² vs. market average
- Vacancy rate per property and region
- Rent uplift potential (¥/month)
- Renovation payback period (months)
- Net Revenue after cost

### Best Visualization
- Bar charts (property vs. benchmark)
- Scatter plot (rent/m² vs. occupancy rate)
- Geographic comparison map
- Before/after renovation waterfall chart

### Decisions Made
- Rent price adjustments
- Renovation go/no-go
- Lease renewal vs. termination
- Staffing and operational focus

---

## User Group 3: Project Managers (Asset Managers, Portfolio Analysts)

### Main Business Questions
- What data is missing for this property?
- Is this property's valuation based on fresh data or outdated assumptions?
- What tasks need to be done before I can submit this property for investment review?
- Which properties have lease expiry within 6 months?

### Data They Need
- Data completeness score per property
- Action item list with deadlines
- Data source freshness indicators
- Lease expiry calendar
- Document upload status (which PDFs have been processed)

### Dashboard Output
- Task management board (Kanban-style)
- Data quality score per property
- Alert feed (expiring leases, missing data, new market data)
- Audit trail of last data update per field

### KPIs They Care About
- % properties with complete data
- Number of pending document extractions
- Average data staleness (days since last update)
- Open tasks per property

### Best Visualization
- Kanban board / task list
- Completion progress bars per property
- Timeline (lease expiry calendar)
- Data freshness heatmap

### Decisions Made
- Data collection priorities
- Document extraction queue
- Workflow scheduling
- Escalation to upper management

---

## User Group 4: Real Estate Sales / Leasing Staff

### Main Business Questions
- What is the market rent I should quote a prospective tenant?
- How does this property compare to what the tenant can find nearby?
- What is the strongest selling point of this property vs. competitors?
- What renovation would make this property most leasable?

### Data They Need
- Predicted rent price with confidence range
- Nearby competitor properties and their rents
- Property strengths vs. weaknesses vs. competition
- Foot traffic score and daytime population
- AI-generated property pitch summary

### Dashboard Output
- Property fact sheet (one-page printable / shareable)
- Competitive position card (this property vs. 3 nearest competitors)
- Rent negotiation range (floor / target / ceiling)
- Suggested talking points from AI

### KPIs They Care About
- Days on market
- Rent vs. asking price (negotiation gap)
- Number of qualified inquiries
- Conversion rate (inquiry → signed lease)
- Vacancy days lost

### Best Visualization
- Property comparison card (side-by-side)
- Location map with competitor pins
- Rent range bar (floor / target / ceiling)
- Spider chart (property attribute scores)

### Decisions Made
- Rent pricing for new listings
- Marketing positioning
- Negotiation floor for leases
- Upsell of renovations to tenant

---

## User Group 5: Investors (Internal Fund Manager / External Investor)

### Main Business Questions
- What is the expected yield on this investment?
- What is the downside risk if occupancy drops 20%?
- How does this deal compare to other investment opportunities in the portfolio?
- What is the expected exit value in 5 years?

### Data They Need
- Cap rate, yield, IRR, NPV estimates
- Sensitivity analysis (occupancy, rent, interest rate)
- Comparable transaction prices
- Market trend (appreciation / depreciation forecast)
- Risk score and scenario modeling

### Dashboard Output
- Investment scorecard (one-pager per property)
- Scenario comparison (bull / base / bear case)
- Risk matrix (probability vs. impact)
- Portfolio contribution analysis

### KPIs They Care About
- Gross yield
- Net yield
- Cap rate
- Estimated IRR (5-year)
- Downside protection score
- Liquidity score

### Best Visualization
- Scenario waterfall chart
- Yield vs. risk scatter plot (portfolio view)
- Sensitivity tornado chart
- Cumulative cash flow projection

### Decisions Made
- Buy / pass decision
- Bid price range
- Hold vs. sell timing
- Capital structure (leverage decision)

---

## User Group 6: Property Owners / Rent Owners

### Main Business Questions
- Am I charging the right rent for my property?
- What would I earn if I renovated?
- Is my occupancy rate normal for this area?
- Should I sell now or hold for more appreciation?

### Data They Need
- Current rent vs. market rent (gap analysis)
- Expected income under different rent scenarios
- Area price trend (5-year historic + forecast)
- Renovation ROI specific to their property type

### Dashboard Output
- "My Property" simple dashboard
- Revenue comparison (current vs. potential)
- Price trend chart (area)
- Renovation impact card

### KPIs They Care About
- Monthly rental income
- Vacancy days per year
- Property value appreciation
- Renovation payback period

### Best Visualization
- Simple number cards (income this month, income if fully leased)
- Area price trend line chart
- Before/after renovation bar chart
- Calendar (occupancy view)

### Decisions Made
- Rent adjustment (raise / maintain)
- Renovation decision
- Sell vs. hold vs. lease decision
- Tenant renewal vs. new search

---

## User Group 7: General Employees / Analysts

### Main Business Questions
- What does the data say about this specific property?
- How do I generate a report for this property for the manager meeting?
- What assumptions does the prediction model use?
- Are the AI-extracted contract terms correct?

### Data They Need
- Full property detail with all data fields visible
- Model prediction with explainability (feature importance)
- Document extraction output with confidence score
- Editable data fields with audit log

### Dashboard Output
- Property detail page (all data, all predictions)
- Report generator (PDF output)
- Document AI results review panel
- Data edit / override UI

### KPIs They Care About
- Data completeness score
- AI extraction confidence
- Model confidence interval
- Report generation time

### Best Visualization
- Data tables with inline editing
- Model explanation bar chart (feature importance)
- Document viewer with annotation overlay
- Activity feed (who changed what, when)

### Decisions Made
- Data quality corrections
- Model override (manual adjustment)
- Report generation and distribution
- Escalation of anomalies to managers

---

## Summary Matrix

| User Group | Primary Goal | Primary Output | Key KPI | Decisions |
|-----------|-------------|----------------|---------|-----------|
| C-Level | Portfolio health | 1-page scorecard | Portfolio NOI, Cap Rate | Invest / divest strategy |
| Upper Manager | Region performance | Property leaderboard | Rent gap, Vacancy rate | Rent adjust, Renovate |
| Project Manager | Data quality / workflow | Task board | Data completeness % | Prioritize collection |
| Sales / Leasing | Quote right price | Property fact sheet | Days on market | Rent floor / ceiling |
| Investor | Investment return | Investment scorecard | Yield, IRR | Buy / pass |
| Property Owner | Maximize income | Revenue comparison | Monthly income | Renovate / sell |
| Analyst | Data accuracy | Full detail page | Confidence score | Correct data |
