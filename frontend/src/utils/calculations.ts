import type { RawProperty, Property } from '../types'

// ─── Core Formulas (exact as specified) ────────────────────────────────────

function calcPredictedRent(p: RawProperty): number {
  const raw =
    p.competitor_rent_per_m2 +
    p.foot_traffic_score * 20 +
    p.office_nearby_score * 15 +
    p.event_score * 10 -
    p.building_age * 50
  return Math.max(raw, 500)   // floor at ¥500/m² — prevents negative predictions
}

function calcMonthlyRevenue(predicted_rent: number, p: RawProperty): number {
  return predicted_rent * p.floor_area_m2 * p.occupancy_rate
}

function calcYearlyRevenue(monthly: number): number {
  return monthly * 12
}

function calcRenovationROI(yearly: number, p: RawProperty): number {
  return (yearly * p.expected_rent_increase_percent - p.renovation_cost) / p.renovation_cost
}

// ─── Opportunity Score sub-components ──────────────────────────────────────

function normalize(value: number, min: number, max: number): number {
  if (max === min) return 5
  return ((value - min) / (max - min)) * 10
}

function getRecommendation(score: number, roi: number): {
  recommendation: string
  rec_color: Property['rec_color']
  rec_label: string
} {
  if (score >= 20)
    return { recommendation: 'Strong Opportunity — Prioritize this asset', rec_color: 'green', rec_label: 'Strong Buy' }
  if (score >= 15)
    return { recommendation: 'Good asset — Hold and optimize rent', rec_color: 'blue', rec_label: 'Buy / Hold' }
  if (score >= 10) {
    if (roi > 0.5)
      return { recommendation: 'Renovation will unlock significant upside', rec_color: 'blue', rec_label: 'Renovate' }
    return { recommendation: 'Stable — Monitor market and vacancy', rec_color: 'yellow', rec_label: 'Monitor' }
  }
  if (score >= 4)
    return { recommendation: 'Underperforming — Investigate root cause', rec_color: 'orange', rec_label: 'Investigate' }
  return { recommendation: 'High risk with low return — Consider divesting', rec_color: 'red', rec_label: 'Divest' }
}

// ─── Main computation (two-pass: base values then normalized scores) ────────

export function computeProperties(rawProperties: RawProperty[]): Property[] {
  // Pass 1: base calculations
  const withBase = rawProperties.map((p) => {
    const predicted_rent_per_m2 = calcPredictedRent(p)
    const monthly_revenue = calcMonthlyRevenue(predicted_rent_per_m2, p)
    const yearly_revenue = calcYearlyRevenue(monthly_revenue)
    const renovation_roi = calcRenovationROI(yearly_revenue, p)
    const location_score = (p.foot_traffic_score + p.office_nearby_score + p.event_score) / 3
    return {
      ...p,
      predicted_rent_per_m2,
      monthly_revenue,
      yearly_revenue,
      renovation_roi,
      location_score,
      yearly_revenue_score: 0,
      renovation_score: 0,
      opportunity_score: 0,
      recommendation: '',
      rec_color: 'yellow' as Property['rec_color'],
      rec_label: '',
    }
  })

  // Pass 2: normalize across portfolio for opportunity_score
  const maxYearly = Math.max(...withBase.map((p) => p.yearly_revenue))
  const minROI = Math.min(...withBase.map((p) => p.renovation_roi))
  const maxROI = Math.max(...withBase.map((p) => p.renovation_roi))

  return withBase.map((p) => {
    const yearly_revenue_score = normalize(p.yearly_revenue, 0, maxYearly)
    const renovation_score = normalize(p.renovation_roi, minROI, maxROI)
    const opportunity_score =
      yearly_revenue_score + p.location_score + renovation_score - p.risk_score
    const { recommendation, rec_color, rec_label } = getRecommendation(opportunity_score, p.renovation_roi)
    return { ...p, yearly_revenue_score, renovation_score, opportunity_score, recommendation, rec_color, rec_label }
  })
}

// ─── Formatting helpers ────────────────────────────────────────────────────

export function fmtJPY(n: number): string {
  if (n >= 1_000_000_000) return `¥${(n / 1_000_000_000).toFixed(2)}B`
  if (n >= 1_000_000) return `¥${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `¥${(n / 1_000).toFixed(0)}K`
  return `¥${n.toFixed(0)}`
}

export function fmtPct(n: number): string {
  return `${(n * 100).toFixed(1)}%`
}

export function fmtScore(n: number): string {
  return n.toFixed(1)
}

export function recColorClass(color: Property['rec_color']): {
  bg: string; text: string; border: string; badge: string
} {
  const map: Record<Property['rec_color'], { bg: string; text: string; border: string; badge: string }> = {
    green:  { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-800' },
    blue:   { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200',    badge: 'bg-blue-100 text-blue-800' },
    yellow: { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200',   badge: 'bg-amber-100 text-amber-800' },
    orange: { bg: 'bg-orange-50',  text: 'text-orange-700',  border: 'border-orange-200',  badge: 'bg-orange-100 text-orange-800' },
    red:    { bg: 'bg-red-50',     text: 'text-red-700',     border: 'border-red-200',     badge: 'bg-red-100 text-red-800' },
  }
  return map[color]
}
