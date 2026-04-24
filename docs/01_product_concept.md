# D1 — Product Concept Summary

## Product Name: PropIQ

**Tagline:** *Know the value. Predict the revenue. Make the move.*

---

## Problem Statement

Real estate organizations in Japan (and across Asia) manage portfolios ranging from 10 to 10,000+ properties. The decisions they make — price, renovate, lease, sell, invest — are worth millions of dollars per year. Yet most teams still:

- Use Excel sheets updated manually every quarter
- Rely on broker gut-feel for rent pricing
- Have no clear view of which properties are underperforming
- Cannot connect renovation spend to revenue impact
- Cannot extract value from the PDFs, images, and voice notes sitting in their file servers

The result: **mispriced assets, missed revenue, and slow decisions.**

---

## Product Vision

PropIQ is a **real estate revenue intelligence platform** — not just a price calculator.

It treats every property as a **revenue-generating asset** and helps each user type — from C-level executives to field sales staff — understand the levers that control that revenue and the decisions that maximize it.

The product has three intelligence layers:

```
Layer 1: DESCRIPTIVE  — "What do we have? What is it worth now?"
Layer 2: PREDICTIVE   — "What will it be worth? What revenue can we expect?"
Layer 3: PRESCRIPTIVE — "What should we do? Buy? Hold? Renovate? Sell?"
```

---

## Core Business Logic

Every property in PropIQ is evaluated against a **Revenue Value Model**:

```
Gross Revenue = (Rent per m² × Occupiable m²) × Occupancy Rate × 12 months
Net Operating Income (NOI) = Gross Revenue − Operating Costs
Cap Rate = NOI ÷ Property Value
ROI = (NOI − Debt Service) ÷ Equity Invested
Payback Period = Total Investment ÷ Annual NOI
```

PropIQ adds three prediction layers on top:

1. **Price Prediction** — what comparable properties are selling for, adjusted for property attributes and location
2. **Rent Prediction** — market rent benchmarked against competing buildings within 500m–2km radius
3. **Revenue Simulation** — best / base / worst case scenarios with adjustable assumptions

---

## Key Differentiators vs. Competitors

| Feature | PropIQ | Typical BI Tool | Broker Software |
|---------|--------|-----------------|-----------------|
| Revenue simulation (not just price) | ✅ | ❌ | ❌ |
| AI document extraction (PDF, Excel, image) | ✅ | ❌ | ❌ |
| Event & foot-traffic impact modeling | ✅ | ❌ | ❌ |
| Renovation ROI calculator | ✅ | Partial | ❌ |
| Role-based views (C-level to analyst) | ✅ | Partial | ❌ |
| Recommended action engine (buy/hold/sell) | ✅ | ❌ | ❌ |
| Investor-grade metrics (cap rate, yield) | ✅ | ❌ | Partial |
| Geospatial competitor benchmarking | ✅ | ❌ | ❌ |

---

## Design Principles

1. **Revenue first.** Every screen answers: "How does this affect money?"
2. **Decision-ready outputs.** Show recommended actions, not just data.
3. **Role-aware.** A C-level executive and a field analyst see the same data differently.
4. **Uncertainty-honest.** Always show confidence intervals and risk scores.
5. **Document-native.** Real estate runs on PDFs and Excel. PropIQ must handle them.
6. **Japan-context-aware.** Incorporate Japan-specific factors: railway distance, floor ratio, zoning, earthquake risk, and population aging.

---

## Success Metrics (Product Level)

| Metric | Target at 6 Months |
|--------|-------------------|
| Properties analyzed per week | 200+ |
| Time to generate full property report | < 30 seconds |
| Document extraction accuracy (key fields) | > 90% |
| User satisfaction (NPS) | > 40 |
| Revenue uplift identified vs. current portfolio | > 5% |
| Time saved vs. manual Excel workflow | > 60% |
