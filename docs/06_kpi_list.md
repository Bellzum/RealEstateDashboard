# D6 — KPI List

## Financial KPIs

| KPI | Formula | Unit | Update Frequency | User Group |
|-----|---------|------|-----------------|-----------|
| Gross Revenue | Rent × Occupancy Rate × 12 | ¥/year | Monthly | All |
| Net Operating Income (NOI) | Gross Revenue − Operating Costs | ¥/year | Monthly | Manager, Investor, C-level |
| Cap Rate | NOI ÷ Property Value | % | Quarterly | Investor, C-level |
| Gross Yield | Annual Rent ÷ Purchase Price | % | Quarterly | Investor |
| Net Yield | NOI ÷ Purchase Price | % | Quarterly | Investor |
| ROI | (NOI − Debt Service) ÷ Equity | % | Annually | Investor, CFO |
| IRR (5-year) | Discounted cash flow model | % | On demand | Investor |
| Payback Period | Total Investment ÷ Annual NOI | Years | Quarterly | Manager, Investor |
| Revenue per m² | Annual Revenue ÷ Floor Area | ¥/m²/yr | Monthly | Manager, Analyst |
| Rent per m² | Monthly Rent ÷ Floor Area | ¥/m²/mo | Monthly | Sales, Manager |
| Price per m² | Sale Price ÷ Floor Area | ¥/m² | Quarterly | Analyst, Investor |
| Renovation ROI | (After NOI − Before NOI) ÷ Renovation Cost | % | On demand | Manager |
| Renovation Payback | Renovation Cost ÷ Annual NOI Gain | Months | On demand | Manager |
| NOI Margin | NOI ÷ Gross Revenue | % | Monthly | CFO, Manager |
| Vacancy Loss | (1 − Occupancy Rate) × Potential Rent | ¥/year | Monthly | Manager |

---

## Operational KPIs

| KPI | Definition | Unit | Update Frequency | User Group |
|-----|-----------|------|-----------------|-----------|
| Occupancy Rate | Occupied m² ÷ Total Leasable m² | % | Monthly | All |
| Vacancy Rate | Vacant m² ÷ Total Leasable m² | % | Monthly | Manager, C-level |
| Days on Market | Days from listing to signed lease | Days | Per transaction | Sales |
| Lease Renewal Rate | Leases renewed ÷ Leases expiring | % | Quarterly | Manager |
| Tenant Concentration | % revenue from single tenant | % | Monthly | Manager, Risk |
| Average Lease Duration | Mean remaining lease term | Months | Monthly | Manager |
| Time to Fill | Days from vacancy to new tenant | Days | Per event | Sales |

---

## AI Prediction KPIs

| KPI | Definition | Range | User Group |
|-----|-----------|-------|-----------|
| Price Prediction Accuracy | MAPE of predicted vs. actual sale price | 0–100% error | Analyst, Tech |
| Rent Prediction Accuracy | MAPE of predicted vs. actual signed rent | 0–100% error | Analyst, Tech |
| Confidence Score | Model certainty for prediction | 0.0–1.0 | All |
| Risk Score | Composite risk across vacancy, market, building | 0–10 (10=high risk) | Manager, Investor |
| Investment Score | Composite attractiveness score | 0–10 (10=best) | Investor, C-level |
| Vacancy Risk Score | Probability-weighted vacancy severity | 0–10 | Manager |
| AI Extraction Confidence | % of extracted fields above 90% confidence | % | Analyst |

---

## Portfolio-Level KPIs (Executive)

| KPI | Formula | Unit | User Group |
|-----|---------|------|-----------|
| Total Portfolio Value | Σ predicted_price_jpy | ¥ Billion | C-level |
| Total Annual NOI | Σ annual_noi_jpy | ¥ Billion | C-level, CFO |
| Portfolio Average Cap Rate | Weighted avg NOI ÷ Portfolio Value | % | C-level, CFO |
| Portfolio Vacancy Rate | Σ vacant m² ÷ Σ total m² | % | C-level |
| High-Risk Property Count | Count where risk_score > 6.5 | Count | C-level |
| Revenue Uplift Potential | Σ (predicted_rent − current_rent) × 12 | ¥/year | C-level |
| Portfolio Diversification | Herfindahl-Hirschman Index by type | Score | CFO |
| YoY Portfolio Value Growth | (Current value − Prior year) ÷ Prior year | % | C-level |
| YoY Revenue Growth | (Current NOI − Prior NOI) ÷ Prior NOI | % | C-level, CFO |

---

## Market Benchmarking KPIs

| KPI | Definition | User Group |
|-----|-----------|-----------|
| Rent vs. Market (Gap %) | (current_rent − avg_market_rent) ÷ avg_market_rent | Manager, Sales |
| Price vs. Predicted (Gap %) | (current_price − predicted_price) ÷ predicted_price | Analyst, Investor |
| Competitor Rent Delta | Our rent − Avg competitor rent nearby | Sales, Manager |
| Area Vacancy vs. Property Vacancy | Property vacancy vs. district average | Manager |
| Price Trend vs. Area Trend | Property price growth vs. district average | Investor |

---

## KPI Health Thresholds

| KPI | Green (Good) | Amber (Watch) | Red (Alert) |
|-----|-------------|--------------|------------|
| Occupancy Rate | ≥ 90% | 75–90% | < 75% |
| Cap Rate (Tokyo) | ≥ 4.0% | 3.0–4.0% | < 3.0% |
| Risk Score | ≤ 3.0 | 3.1–6.5 | > 6.5 |
| Investment Score | ≥ 7.5 | 5.0–7.5 | < 5.0 |
| Confidence Score | ≥ 0.85 | 0.70–0.85 | < 0.70 |
| Rent vs. Market Gap | ≥ −5% | −5% to −15% | < −15% |
| Days on Market | ≤ 30 | 31–90 | > 90 |
| Data Completeness | ≥ 90% | 70–90% | < 70% |
| Building Age | ≤ 10 yr | 10–25 yr | > 25 yr |
| Vacancy Rate | ≤ 5% | 5–15% | > 15% |
