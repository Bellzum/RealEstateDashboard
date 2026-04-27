import type { Property } from '../types'
import { fmtJPY, fmtPct, fmtScore, recColorClass } from '../utils/calculations'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from 'recharts'

interface Props {
  property: Property
  allProperties: Property[]
  onBack: () => void
  onSelectProperty: (id: string) => void
}

function ScoreBar({ label, value, max = 10, color }: { label: string; value: number; max?: number; color: string }) {
  const pct = (value / max) * 100
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500 w-36 flex-shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-semibold text-gray-700 w-12 text-right">{value.toFixed(1)}/{max}</span>
    </div>
  )
}

function MetricRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0 ${highlight ? 'bg-blue-50 -mx-4 px-4 rounded' : ''}`}>
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? 'text-blue-700' : 'text-gray-800'}`}>{value}</span>
    </div>
  )
}

export default function PropertyDetail({ property: p, allProperties, onBack, onSelectProperty }: Props) {
  const cls = recColorClass(p.rec_color)
  const minROI = Math.min(...allProperties.map((x) => x.renovation_roi))
  const maxROI = Math.max(...allProperties.map((x) => x.renovation_roi))
  const maxRevenue = Math.max(...allProperties.map((x) => x.yearly_revenue))

  const radarData = [
    { metric: 'Revenue', value: +(p.yearly_revenue / maxRevenue * 10).toFixed(1) },
    { metric: 'Location', value: +p.location_score.toFixed(1) },
    { metric: 'Occupancy', value: +(p.occupancy_rate * 10).toFixed(1) },
    { metric: 'Reno ROI', value: +((p.renovation_roi - minROI) / (maxROI - minROI) * 10).toFixed(1) },
    { metric: 'Low Risk', value: +(10 - p.risk_score).toFixed(1) },
  ]

  // 3 scenarios for revenue simulation
  const baseRev = p.yearly_revenue
  const bullRev = baseRev * (1 + p.expected_rent_increase_percent)
  const bearRev = baseRev * 0.75

  const scenarioData = [
    { scenario: 'Bear', revenue: Math.round(bearRev / 1_000_000), color: '#ef4444' },
    { scenario: 'Base', revenue: Math.round(baseRev / 1_000_000), color: '#3b82f6' },
    { scenario: 'Bull', revenue: Math.round(bullRev / 1_000_000), color: '#10b981' },
  ]

  // Similar properties (same type)
  const similar = allProperties
    .filter((x) => x.property_id !== p.property_id && x.property_type === p.property_type)
    .slice(0, 3)

  const rentGapPct = ((p.predicted_rent_per_m2 - p.current_rent_per_m2) / p.current_rent_per_m2) * 100
  const renoNetGain = p.yearly_revenue * p.expected_rent_increase_percent - p.renovation_cost

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Back + Header */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-5 transition-colors"
      >
        ← Back to Comparison
      </button>

      <div className={`rounded-xl border-2 p-6 mb-8 ${cls.border} ${cls.bg}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-gray-900">{p.property_name}</h1>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${cls.badge}`}>{p.rec_label}</span>
            </div>
            <p className="text-gray-500 text-sm">{p.area} · {p.property_type} · {p.floor_area_m2.toLocaleString()} m² · {p.building_age} years old</p>
            <p className={`mt-3 text-sm font-medium ${cls.text}`}>💡 {p.recommendation}</p>
          </div>
          <div className="flex-shrink-0 text-right">
            <p className="text-4xl font-bold text-gray-900">{fmtScore(p.opportunity_score)}</p>
            <p className="text-gray-400 text-sm">/ 30 opportunity score</p>
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-6 gap-4 mb-8">
        {[
          { label: 'Predicted Rent/m²', value: `¥${p.predicted_rent_per_m2.toFixed(0)}`, sub: `Current ¥${p.current_rent_per_m2} (${rentGapPct >= 0 ? '+' : ''}${rentGapPct.toFixed(0)}%)` },
          { label: 'Monthly Revenue', value: fmtJPY(p.monthly_revenue), sub: 'Predicted (occupied)' },
          { label: 'Yearly Revenue', value: fmtJPY(p.yearly_revenue), sub: 'Annual projection' },
          { label: 'Renovation ROI', value: `${(p.renovation_roi * 100).toFixed(0)}%`, sub: p.renovation_roi > 0 ? `Net gain ${fmtJPY(renoNetGain)}` : 'Negative ROI' },
          { label: 'Occupancy Rate', value: fmtPct(p.occupancy_rate), sub: 'Current occupancy' },
          { label: 'Risk Score', value: `${p.risk_score}/10`, sub: p.risk_score >= 6 ? '⚠ High risk' : p.risk_score >= 4 ? 'Medium risk' : 'Low risk' },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-xs text-gray-500 font-medium mb-1">{item.label}</p>
            <p className="text-xl font-bold text-gray-900">{item.value}</p>
            <p className="text-xs text-gray-400 mt-1">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Radar */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Performance Profile</h2>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10, fill: '#64748b' }} />
              <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.18} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Scenarios */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">Revenue Scenarios (¥M/yr)</h2>
          <p className="text-xs text-gray-400 mb-4">Bear: −25% | Base: predicted | Bull: +{(p.expected_rent_increase_percent * 100).toFixed(0)}%</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={scenarioData} margin={{ top: 0, right: 10, bottom: 0, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="scenario" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `¥${v}M`} />
              <Tooltip formatter={(v: number) => [`¥${v}M`, 'Revenue']} />
              <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                {scenarioData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Location Scores */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Location & Building Scores</h2>
          <div className="space-y-3">
            <ScoreBar label="Foot Traffic" value={p.foot_traffic_score} color="#3b82f6" />
            <ScoreBar label="Office Nearby" value={p.office_nearby_score} color="#8b5cf6" />
            <ScoreBar label="Event Score" value={p.event_score} color="#f59e0b" />
            <ScoreBar label="Location Composite" value={p.location_score} color="#10b981" />
            <div className="border-t border-gray-100 pt-3 mt-3">
              <ScoreBar label="Risk Score" value={p.risk_score} color="#ef4444" />
              <ScoreBar label="Opp Score" value={p.opportunity_score} max={30} color="#6366f1" />
            </div>
          </div>
        </div>
      </div>

      {/* Detail Tables */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Property Facts */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Property Facts</h2>
          <MetricRow label="Area" value={p.area} />
          <MetricRow label="Type" value={p.property_type} />
          <MetricRow label="Floor Area" value={`${p.floor_area_m2.toLocaleString()} m²`} />
          <MetricRow label="Building Age" value={`${p.building_age} years`} />
          <MetricRow label="Walk to Station" value={`${p.walking_minutes_to_station} min`} />
          <MetricRow label="Occupancy Rate" value={fmtPct(p.occupancy_rate)} highlight />
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Revenue Analysis</h2>
          <MetricRow label="Current Rent/m²" value={`¥${p.current_rent_per_m2.toLocaleString()}`} />
          <MetricRow label="Competitor Rent/m²" value={`¥${p.competitor_rent_per_m2.toLocaleString()}`} />
          <MetricRow label="Predicted Rent/m²" value={`¥${p.predicted_rent_per_m2.toFixed(0)}`} highlight />
          <MetricRow label="Monthly Revenue" value={fmtJPY(p.monthly_revenue)} />
          <MetricRow label="Yearly Revenue" value={fmtJPY(p.yearly_revenue)} highlight />
          <MetricRow label="Revenue/Year Score" value={`${fmtScore(p.yearly_revenue_score)}/10`} />
        </div>

        {/* Renovation Analysis */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Renovation Analysis</h2>
          <MetricRow label="Renovation Cost" value={fmtJPY(p.renovation_cost)} />
          <MetricRow label="Expected Rent ↑" value={`+${(p.expected_rent_increase_percent * 100).toFixed(0)}%`} />
          <MetricRow label="Annual Revenue Gain" value={fmtJPY(p.yearly_revenue * p.expected_rent_increase_percent)} />
          <MetricRow label="Net Gain (Yr 1)" value={fmtJPY(renoNetGain)} highlight />
          <MetricRow label="Renovation ROI" value={`${(p.renovation_roi * 100).toFixed(0)}%`} highlight />
          <MetricRow label="Reno Score" value={`${fmtScore(p.renovation_score)}/10`} />
        </div>
      </div>

      {/* Similar Properties */}
      {similar.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Similar Properties ({p.property_type})</h2>
          <div className="grid grid-cols-3 gap-4">
            {similar.map((s) => {
              const sc = recColorClass(s.rec_color)
              return (
                <button
                  key={s.property_id}
                  onClick={() => onSelectProperty(s.property_id)}
                  className={`text-left border rounded-xl p-4 hover:shadow-md transition-all ${sc.border} ${sc.bg}`}
                >
                  <p className={`font-semibold text-sm ${sc.text}`}>{s.property_name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.area} · {fmtJPY(s.yearly_revenue)}/yr</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">Score {fmtScore(s.opportunity_score)}/30</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${sc.badge}`}>{s.rec_label}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
