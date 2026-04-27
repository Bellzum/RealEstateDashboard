import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ScatterChart, Scatter, ResponsiveContainer, Cell, Legend,
  ReferenceLine,
} from 'recharts'
import type { Property, Role } from '../types'
import KPICard from '../components/KPICard'
import { fmtJPY, fmtPct, fmtScore, recColorClass } from '../utils/calculations'

interface Props {
  properties: Property[]
  role: Role
  onSelectProperty: (id: string) => void
}

const REC_COLORS: Record<Property['rec_color'], string> = {
  green: '#10b981', blue: '#3b82f6', yellow: '#f59e0b', orange: '#f97316', red: '#ef4444',
}

const AREA_COLORS: Record<string, string> = {
  Shibuya: '#6366f1', Shinjuku: '#3b82f6', Meguro: '#10b981', Kawasaki: '#f59e0b',
  Roppongi: '#f97316', Ebisu: '#8b5cf6', Saitama: '#ef4444',
}

function RoleSummaryCard({ properties, role, onSelectProperty }: Props) {
  const sorted = [...properties].sort((a, b) => b.opportunity_score - a.opportunity_score)
  const best = sorted[0]
  const worst = sorted[sorted.length - 1]
  const totalRevenue = properties.reduce((s, p) => s + p.yearly_revenue, 0)
  const highRisk = properties.filter((p) => p.risk_score >= 5)
  const needsReno = properties.filter((p) => p.renovation_roi > 1)

  if (role === 'C-Level') {
    return (
      <div className="bg-violet-900 rounded-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">👔</span>
          <h3 className="font-bold text-lg">C-Level Executive Brief</h3>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-violet-800/60 rounded-lg p-3">
            <p className="text-violet-300 text-xs mb-1">Total Portfolio Revenue</p>
            <p className="text-2xl font-bold">{fmtJPY(totalRevenue)}<span className="text-sm font-normal text-violet-300">/yr</span></p>
          </div>
          <div className="bg-violet-800/60 rounded-lg p-3">
            <p className="text-violet-300 text-xs mb-1">Best Opportunity</p>
            <p className="font-bold text-lg leading-tight">{best.property_name}</p>
            <p className="text-violet-300 text-xs">Score {fmtScore(best.opportunity_score)}</p>
          </div>
          <div className="bg-violet-800/60 rounded-lg p-3">
            <p className="text-violet-300 text-xs mb-1">High Risk Properties</p>
            <p className="text-2xl font-bold text-red-300">{highRisk.length}</p>
            <p className="text-violet-300 text-xs">Require attention</p>
          </div>
        </div>
        <div className="bg-violet-800/40 rounded-lg p-3">
          <p className="text-violet-200 text-sm">
            <span className="font-semibold">AI Summary: </span>
            Portfolio generating {fmtJPY(totalRevenue)}/yr across 8 properties.{' '}
            <span className="text-emerald-300 font-semibold">{best.property_name}</span> is your top revenue opportunity (Score {fmtScore(best.opportunity_score)}/30).{' '}
            {highRisk.length > 0 && (
              <span><span className="text-red-300 font-semibold">{worst.property_name}</span> carries the highest risk (Risk {worst.risk_score}/10) — recommend a strategic review. </span>
            )}
            {needsReno.length > 0 && (
              <span>{needsReno.length} properties have renovation ROI &gt; 100% — approve budgets to unlock {fmtJPY(needsReno.reduce((s, p) => s + p.yearly_revenue * p.expected_rent_increase_percent, 0))}/yr upside.</span>
            )}
          </p>
        </div>
      </div>
    )
  }

  if (role === 'Business Manager') {
    return (
      <div className="bg-blue-900 rounded-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📋</span>
          <h3 className="font-bold text-lg">Business Manager Summary</h3>
        </div>
        <p className="text-blue-200 text-sm mb-4">Properties ranked by opportunity score. Scroll the comparison table to see all metrics.</p>
        <div className="space-y-2">
          {sorted.slice(0, 5).map((p, i) => {
            const cls = recColorClass(p.rec_color)
            return (
              <button
                key={p.property_id}
                onClick={() => onSelectProperty(p.property_id)}
                className="w-full flex items-center justify-between bg-blue-800/50 hover:bg-blue-700/50 rounded-lg px-4 py-2.5 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-blue-300 font-mono text-sm w-5">#{i + 1}</span>
                  <div>
                    <p className="font-semibold text-sm">{p.property_name}</p>
                    <p className="text-blue-300 text-xs">{p.area} · {p.property_type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${cls.badge}`}>{p.rec_label}</span>
                  <span className="text-sm font-bold">{fmtScore(p.opportunity_score)}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Project Manager
  const missingData = properties.filter((p) => p.occupancy_rate < 0.80 || p.building_age > 20)
  const renoTasks = properties.filter((p) => p.renovation_roi > 0.5)

  return (
    <div className="bg-teal-900 rounded-xl p-6 text-white">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🗂️</span>
        <h3 className="font-bold text-lg">Project Manager Task Board</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-teal-300 text-xs font-semibold uppercase mb-2">⚠ Needs Review</p>
          {missingData.map((p) => (
            <button
              key={p.property_id}
              onClick={() => onSelectProperty(p.property_id)}
              className="flex items-start gap-2 bg-teal-800/40 hover:bg-teal-700/40 rounded-lg p-2.5 mb-1.5 w-full text-left transition-colors"
            >
              <span className="text-amber-400 mt-0.5">⚠</span>
              <div>
                <p className="text-sm font-medium">{p.property_name}</p>
                <p className="text-teal-300 text-xs">
                  {p.occupancy_rate < 0.80 ? `Low occupancy ${fmtPct(p.occupancy_rate)}` : `Age ${p.building_age}yr`}
                </p>
              </div>
            </button>
          ))}
        </div>
        <div>
          <p className="text-teal-300 text-xs font-semibold uppercase mb-2">🔨 Renovation Tasks</p>
          {renoTasks.slice(0, 3).map((p) => (
            <button
              key={p.property_id}
              onClick={() => onSelectProperty(p.property_id)}
              className="flex items-start gap-2 bg-teal-800/40 hover:bg-teal-700/40 rounded-lg p-2.5 mb-1.5 w-full text-left transition-colors"
            >
              <span className="text-emerald-400 mt-0.5">↑</span>
              <div>
                <p className="text-sm font-medium">{p.property_name}</p>
                <p className="text-teal-300 text-xs">ROI {(p.renovation_roi * 100).toFixed(0)}% · Get quotes</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const CustomTooltipBar = ({ active, payload }: { active?: boolean; payload?: { payload: Property }[] }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
        <p className="font-semibold text-gray-800 mb-1">{d.property_name}</p>
        <p className="text-gray-600">Yearly Revenue: <span className="font-bold text-blue-700">{fmtJPY(d.yearly_revenue)}</span></p>
        <p className="text-gray-600">Type: {d.property_type}</p>
        <p className="text-gray-600">Occupancy: {fmtPct(d.occupancy_rate)}</p>
      </div>
    )
  }
  return null
}

const CustomTooltipScatter = ({ active, payload }: { active?: boolean; payload?: { payload: Property }[] }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
        <p className="font-semibold text-gray-800 mb-1">{d.property_name}</p>
        <p className="text-gray-600">Risk Score: <span className="font-bold text-red-600">{d.risk_score}</span></p>
        <p className="text-gray-600">Yearly Revenue: <span className="font-bold text-blue-700">{fmtJPY(d.yearly_revenue)}</span></p>
        <p className="text-gray-600">Recommendation: <span className="font-bold">{d.rec_label}</span></p>
      </div>
    )
  }
  return null
}

export default function ExecutiveDashboard({ properties, role, onSelectProperty }: Props) {
  const sorted = [...properties].sort((a, b) => b.opportunity_score - a.opportunity_score)
  const best = sorted[0]
  const highestRevenue = [...properties].sort((a, b) => b.yearly_revenue - a.yearly_revenue)[0]
  const bestROI = [...properties].sort((a, b) => b.renovation_roi - a.renovation_roi)[0]
  const highestRisk = [...properties].sort((a, b) => b.risk_score - a.risk_score)[0]
  const totalRevenue = properties.reduce((s, p) => s + p.yearly_revenue, 0)
  const avgOccupancy = properties.reduce((s, p) => s + p.occupancy_rate, 0) / properties.length

  const barData = [...properties]
    .sort((a, b) => b.yearly_revenue - a.yearly_revenue)
    .map((p) => ({
      ...p,
      name: p.property_name.split(' ').slice(0, 2).join(' '),
      revenue_m: Math.round(p.yearly_revenue / 1_000_000),
    }))

  const scatterData = properties.map((p) => ({
    ...p,
    x: p.risk_score,
    y: Math.round(p.yearly_revenue / 1_000_000),
  }))

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Executive Dashboard</h1>
        <p className="text-gray-500 mt-1">8-property portfolio overview · Rule-based predictions · Mock data</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <KPICard
          label="Total Portfolio Revenue"
          value={fmtJPY(totalRevenue)}
          sub="Annual projected (all 8 properties)"
          icon="💰"
          color="violet"
        />
        <KPICard
          label="Best Opportunity"
          value={best.property_name.split(' ').slice(0, 2).join(' ')}
          sub={`Score ${fmtScore(best.opportunity_score)} · ${best.area}`}
          icon="🏆"
          color="green"
          onClick={() => onSelectProperty(best.property_id)}
        />
        <KPICard
          label="Highest Yearly Revenue"
          value={fmtJPY(highestRevenue.yearly_revenue)}
          sub={highestRevenue.property_name}
          icon="📈"
          color="blue"
          onClick={() => onSelectProperty(highestRevenue.property_id)}
        />
        <KPICard
          label="Best Renovation ROI"
          value={`${(bestROI.renovation_roi * 100).toFixed(0)}%`}
          sub={bestROI.property_name}
          icon="🔨"
          color="amber"
          onClick={() => onSelectProperty(bestROI.property_id)}
        />
        <KPICard
          label="Highest Risk"
          value={highestRisk.property_name.split(' ').slice(0, 2).join(' ')}
          sub={`Risk score ${highestRisk.risk_score}/10`}
          icon="⚠️"
          color="red"
          onClick={() => onSelectProperty(highestRisk.property_id)}
        />
      </div>

      {/* Role Summary */}
      <div className="mb-8">
        <RoleSummaryCard properties={properties} role={role} onSelectProperty={onSelectProperty} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-1">Yearly Revenue by Property</h2>
          <p className="text-xs text-gray-400 mb-4">Predicted revenue (¥M/year)</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} margin={{ top: 0, right: 10, bottom: 40, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: '#64748b' }}
                angle={-30}
                textAnchor="end"
                interval={0}
              />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(v) => `¥${v}M`} />
              <Tooltip content={<CustomTooltipBar />} />
              <Bar dataKey="revenue_m" radius={[4, 4, 0, 0]}>
                {barData.map((entry) => (
                  <Cell key={entry.property_id} fill={REC_COLORS[entry.rec_color]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-3">
            {Object.entries(REC_COLORS).map(([color, hex]) => {
              const label = { green: 'Strong Buy', blue: 'Buy/Hold', yellow: 'Monitor', orange: 'Investigate', red: 'Divest' }[color]
              return (
                <div key={color} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: hex }} />
                  <span className="text-xs text-gray-500">{label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Scatter Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-1">Risk vs. Revenue</h2>
          <p className="text-xs text-gray-400 mb-4">
            Best assets: <span className="text-emerald-600 font-medium">top-left</span> (low risk, high revenue)
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="x"
                name="Risk Score"
                domain={[0, 10]}
                tick={{ fontSize: 11, fill: '#64748b' }}
                label={{ value: 'Risk Score →', position: 'insideBottom', offset: -5, fontSize: 11, fill: '#94a3b8' }}
              />
              <YAxis
                dataKey="y"
                name="Revenue"
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickFormatter={(v) => `¥${v}M`}
              />
              <ReferenceLine x={5} stroke="#fca5a5" strokeDasharray="4 4" label={{ value: 'Risk threshold', position: 'top', fontSize: 10, fill: '#ef4444' }} />
              <Tooltip content={<CustomTooltipScatter />} cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={scatterData} shape={(props: unknown) => {
                const p = props as { cx: number; cy: number; payload: typeof scatterData[number] }
                const cx = p.cx
                const cy = p.cy
                const item = p.payload
                return (
                  <g>
                    <circle cx={cx} cy={cy} r={10} fill={REC_COLORS[item.rec_color]} fillOpacity={0.85} stroke="white" strokeWidth={2} />
                    <text x={cx} y={cy - 15} textAnchor="middle" fontSize={9} fill="#374151">
                      {item.property_id}
                    </text>
                  </g>
                )
              }} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Area Cards */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Portfolio by Area</h2>
        <div className="grid grid-cols-4 gap-3">
          {Array.from(new Set(properties.map((p) => p.area))).map((area) => {
            const areaProps = properties.filter((p) => p.area === area)
            const areaRevenue = areaProps.reduce((s, p) => s + p.yearly_revenue, 0)
            const avgScore = areaProps.reduce((s, p) => s + p.opportunity_score, 0) / areaProps.length
            const color = AREA_COLORS[area] || '#6b7280'
            return (
              <div key={area} className="rounded-lg p-4 border border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                  <span className="font-semibold text-gray-800 text-sm">{area}</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{fmtJPY(areaRevenue)}<span className="text-xs font-normal text-gray-400">/yr</span></p>
                <p className="text-xs text-gray-500">{areaProps.length} {areaProps.length === 1 ? 'property' : 'properties'} · Avg score {avgScore.toFixed(1)}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Opportunity Ranking Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800">Opportunity Ranking</h2>
          <p className="text-xs text-gray-400">Sorted by opportunity score (higher = better)</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">#</th>
                <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">Property</th>
                <th className="text-right px-4 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">Yearly Rev</th>
                <th className="text-right px-4 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">Opp Score</th>
                <th className="text-right px-4 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">Risk</th>
                <th className="text-center px-4 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p, i) => {
                const cls = recColorClass(p.rec_color)
                return (
                  <tr
                    key={p.property_id}
                    onClick={() => onSelectProperty(p.property_id)}
                    className="border-b border-gray-50 hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-3 text-gray-400 font-mono">{i + 1}</td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-gray-800">{p.property_name}</p>
                        <p className="text-xs text-gray-400">{p.area} · {p.property_type}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-blue-700">{fmtJPY(p.yearly_revenue)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-bold text-gray-800">{fmtScore(p.opportunity_score)}</span>
                      <span className="text-gray-400 text-xs">/30</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`font-semibold ${p.risk_score >= 5 ? 'text-red-600' : p.risk_score >= 3 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {p.risk_score}
                      </span>
                      <span className="text-gray-400 text-xs">/10</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cls.badge}`}>{p.rec_label}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
