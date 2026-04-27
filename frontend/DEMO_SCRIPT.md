# PropAI — 3-Minute Hackathon Demo Script

**App name:** AI Real Estate Revenue Dashboard
**Audience:** Judges, investors, real estate executives
**Duration:** 3 minutes (timed below)

---

## [0:00 – 0:20] HOOK — The Problem

> "Right now, most real estate managers in Japan are using Excel to decide which properties to buy, renovate, or sell.
> They miss revenue. They take on risk they can't see.
> PropAI changes that. In under 30 seconds, it tells you: what is this property worth, what revenue can I expect, and what should I do next."

---

## [0:20 – 0:50] ROLE SELECTOR — Show Role-Based Views

1. **Click "C-Level" in the sidebar** → Show the C-Level role is selected
2. Point to the **purple Executive Brief card**:
   > "If you're a CEO, you see: total portfolio revenue ¥916M per year, your best opportunity — Shibuya Mark Office — and 2 high-risk properties that need attention. One screen. No Excel."
3. **Click "Business Manager"** → Show the ranked list
   > "If you're a business manager, you see the property leaderboard with recommended actions — Buy, Hold, Renovate — instantly prioritized."
4. **Click "Project Manager"** → Show the task board
   > "Project managers see what needs to be done: low occupancy properties, renovation tasks, next actions."

---

## [0:50 – 1:20] CHARTS — Revenue & Risk View

1. **Point to the bar chart:**
   > "This chart shows yearly predicted revenue for all 8 properties. Colors tell you the recommendation: green is strong buy, red is divest."
   > "Roppongi Hills Mixed-Use (blue) generates the highest revenue at ¥261M per year — but see the scatter chart..."

2. **Point to the scatter chart:**
   > "Risk vs. Revenue. The ideal property is top-left — high revenue, low risk. Shibuya Mark Office sits right there. Omiya Office Center? High risk, low revenue — our AI says investigate or sell."

---

## [1:20 – 1:50] PROPERTY DETAIL — Deep Dive

1. **Click on "Shibuya Mark Office" in the ranking table**
2. Show the detail page header:
   > "Score 22.2 out of 30. Strong Opportunity. The AI tells you exactly why: 9.5 office nearby score, 96.5% occupancy, predicted rent ¥4,191 per m² — 10% above current rate."
3. **Point to the 3 scenario cards:**
   > "Bull case: ¥194M/year. Base: ¥155M. Bear: ¥116M. And the renovation ROI? 288% — for every ¥1 you spend on renovation, you get ¥2.88 back."

---

## [1:50 – 2:30] COMPARISON — Side-by-Side Analysis

1. **Navigate to Property Comparison**
2. **Sort by Renovation ROI (click column header):**
   > "Click any column to sort. Let's sort by Renovation ROI. Shibuya tops at 288%, Nakameguro Retail at 147%. Meanwhile Omiya and Kawasaki Logistics show negative ROI — renovation is not the answer there."
3. **Check 3 properties (P001, P002, P005) → Show radar chart:**
   > "Check 2 to 4 properties and you get this radar comparison. Shibuya Mark Office dominates on Revenue, Location, and Renovation ROI. Roppongi leads on Event Score — it has huge upside if we fix the 22% vacancy."

---

## [2:30 – 2:55] AI DOCUMENT SUMMARY

1. **Navigate to AI Document Summary**
2. **Click "Simulate Upload"** → Show the 2-second processing animation
3. **Point to the Roppongi Rent Roll card (High Risk badge):**
   > "This is a rent roll from Roppongi Hills. Our AI found that vacancy is 22% — higher than the manager reported — and Floor 3 has been empty for 14 months. The AI recommends: reposition as flex offices."
4. **Expand the extracted fields:**
   > "Every field has a confidence score. 98% for unit count, 90% for vacancy details. Low confidence fields get flagged for human review."
5. **Click on the Shibuya lease card:**
   > "And for the Shibuya lease — AI detects the contract expires in 6 months and recommends starting renewal negotiations now. With a rent increase from ¥3,800 to ¥4,200 per m²."

---

## [2:55 – 3:00] CLOSE

> "PropAI: rule-based revenue intelligence, document AI, and role-based views — all in one dashboard.
> Built for the real estate managers who make million-dollar decisions every week.
> Thank you."

---

## Quick Reference — Key Numbers to Know

| Property | Yearly Revenue | Opp Score | Recommendation |
|----------|---------------|-----------|----------------|
| P001 Shibuya Mark Office | ¥155M | 22.2 | Strong Opportunity |
| P002 Shinjuku Tower Apt | ¥196M | 18.2 | Buy / Hold |
| P005 Roppongi Hills | ¥261M | 16.1 | Renovate |
| P007 Omiya Office Center | ¥19M | 0.3 | Divest |

**Total portfolio: ¥916M/year across 8 properties**

---

## If Asked: How does the prediction work?

> "We use a rule-based formula — no black box. Predicted rent = competitor rent + foot traffic × 20 + office proximity × 15 + event score × 10 − building age × 50. The opportunity score is a normalized composite of revenue rank, location score, renovation ROI, and risk. Every formula is transparent and auditable."

## If Asked: How would you add real data?

> "Replace the mock JSON with a FastAPI backend connected to PostgreSQL with PostGIS. Connect the AI document extraction to OpenAI GPT-4o. Add MLIT government data and real-time market feeds. The formulas and frontend stay the same."
