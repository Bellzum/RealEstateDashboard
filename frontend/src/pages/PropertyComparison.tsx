import { useState } from 'react'
import type { Property } from '../types'
import { fmtJPY, fmtPct, fmtScore, recColorClass } from '../utils/calculations'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from 'recharts'

interface Props {
  properties: Property[]
  onSelectProperty: (id: string) => void
}

type SortKey = keyof Property
type SortDir = 'asc' | 'desc'

const COLS: { key: SortKey; label: string; fmt: (p: Property) => string; align: 'left' | 'right' }[] = [
  { key: 'property_name',        label: 'Property',           fmt: (p) => p.property_name,                       align: 'left' },
  { key: 'area',                 label: 'Area',               fmt: (p) => p.area,                                align: 'left' },
  { key: 'property_type',        label: 'Type',               fmt: (p) => p.property_type,                       align: 'left' },
  { key: 'floor_area_m2',        label: 'Floor m²',           fmt: (p) => `${p.floor_area_m2.toLocaleString()}`, align: 'right' },
  { key: 'building_age',         label: 'Age (yr)',           fmt: (p) => `${p.building_age}`,                   align: 'right' },
  { key: 'predicted_rent_per_m2',label: 'Pred. Rent/m²',     fmt: (p) => `¥${p.predicted_rent_per_m2.toFixed(0)}`, align: 'right' },
  { key: 'occupancy_rate',       label: 'Occupancy',          fmt: (p) => fmtPct(p.occupancy_rate),              align: 'right' },
  { key: 'monthly_revenue',      label: 'Monthly Rev',        fmt: (p) => fmtJPY(p.monthly_revenue),             align: 'right' },
  { key: 'yearly_revenue',       label: 'Yearly Rev',         fmt: (p) => fmtJPY(p.yearly_revenue),              align: 'right' },
  { key: 'renovation_roi',       label: 'Reno ROI',           fmt: (p) => `${(p.renovation_roi * 100).toFixed(0)}%`, align: 'right' },
  { key: 'risk_score',           label: 'Risk',               fmt: (p) => `${p.risk_score}/10`,                  align: 'right' },
  { key: 'opportunity_score',    label: 'Opp Score',          fmt: (p) => fmtScore(p.opportunity_score),         align: 'right' },
  { key: 'rec_label',            label: 'Action',             fmt: (p) => p.rec_label,                           align: 'left' },
]

function cellBg(key: SortKey, p: Property, all: Property[]): string {
  if (key === 'risk_score') {
    if (p.risk_score >= 6) return 'bg-red-50'
    if (p.risk_score >= 4) return 'bg-amber-50'
    return 'bg-emerald-50'
  }
  if (key === 'occupancy_rate') {
    if (p.occupancy_rate >= 0.95) return 'bg-emerald-50'
    if (p.occupancy_rate >= 0.80) return 'bg-amber-50'
    return 'bg-red-50'
  }
  if (key === 'opportunity_score') {
    const max = Math.max(...all.map((a) => a.opportunity_score))
    const pct = p.opportunity_score / max
    if (pct >= 0.75) return 'bg-emerald-50'
    if (pct >= 0.40) return 'bg-blue-50'
    return 'bg-red-50'
  }
  if (key === 'renovation_roi') {
    if (p.renovation_roi > 1) return 'bg-emerald-50'
    if (p.renovation_roi > 0) return 'bg-amber-50'
    return 'bg-red-50'
  }
  if (key === 'yearly_revenue') {
    const max = Math.max(...all.map((a) => a.yearly_revenue))
    const pct = p.yearly_revenue / max
    if (pct >= 0.6) return 'bg-blue-50'
    return ''
  }
  return ''
}

function cellText(key: SortKey, p: Property): string {
  if (key === 'risk_score') {
    if (p.risk_score >= 6) return 'text-red-700 font-bold'
    if (p.risk_score >= 4) return 'text-amber-700 font-semibold'
    return 'text-emerald-700 font-semibold'
  }
  if (key === 'occupancy_rate') {
    if (p.occupancy_rate >= 0.95) return 'text-emerald-700 font-semibold'
    if (p.occupancy_rate >= 0.80) return 'text-amber-700'
    return 'text-red-700 font-bold'
  }
  if (key === 'renovation_roi') {
    if (p.renovation_roi > 1) return 'text-emerald-700 font-bold'
    if (p.renovation_roi > 0) return 'text-amber-700'
    return 'text-red-600'
  }
  if (key === 'yearly_revenue' || key === 'monthly_revenue') return 'text-blue-700 font-semibold'
  if (key === 'opportunity_score') return 'text-gray-900 font-bold'
  return 'text-gray-700'
}

const RADAR_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#f97316', '#06b6d4', '#84cc16']

export default function PropertyComparison({ properties, onSelectProperty }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('opportunity_score')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [selected, setSelected] = useState<string[]>(['P001', 'P002', 'P005'])
  const [filterType, setFilterType] = useState<string>('All')

  const types = ['All', ...Array.from(new Set(properties.map((p) => p.property_type)))]

  const sorted = [...properties]
    .filter((p) => filterType === 'All' || p.property_type === filterType)
    .sort((a, b) => {
      const av = a[sortKey] as number | string
      const bv = b[sortKey] as number | string
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'desc' ? bv - av : av - bv
      }
      return sortDir === 'desc'
        ? String(bv).localeCompare(String(av))
        : String(av).localeCompare(String(bv))
    })

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === 'desc' ? 'asc' : 'desc')
    else { setSortKey(key); setSortDir('desc') }
  }

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id].slice(-4)
    )
  }

  const selectedProps = properties.filter((p) => selected.includes(p.property_id))

  // Radar chart data (normalize each metric 0-10)
  const maxRevenue = Math.max(...properties.map((p) => p.yearly_revenue))
  const radarData = [
    { metric: 'Revenue' },
    { metric: 'Location' },
    { metric: 'Occupancy' },
    { metric: 'Reno ROI' },
    { metric: 'Low Risk' },
  ].map((item) => {
    const out: Record<string, string | number> = { metric: item.metric }
    selectedProps.forEach((p) => {
      const minROI = Math.min(...properties.map((x) => x.renovation_roi))
      const maxROI = Math.max(...properties.map((x) => x.renovation_roi))
      const scores: Record<string, number> = {
        'Revenue': (p.yearly_revenue / maxRevenue) * 10,
        'Location': p.location_score,
        'Occupancy': p.occupancy_rate * 10,
        'Reno ROI': ((p.renovation_roi - minROI) / (maxROI - minROI)) * 10,
        'Low Risk': 10 - p.risk_score,
      }
      out[p.property_id] = +scores[item.metric].toFixed(1)
    })
    return out
  })

  const barCompareData = selectedProps.map((p) => ({
    name: p.property_name.split(' ').slice(0, 2).join(' '),
    revenue_m: Math.round(p.yearly_revenue / 1_000_000),
    score: +p.opportunity_score.toFixed(1),
    rec_color: p.rec_color,
  }))

  const REC_COLORS_HEX: Record<Property['rec_color'], string> = {
    green: '#10b981', blue: '#3b82f6', yellow: '#f59e0b', orange: '#f97316', red: '#ef4444',
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Property Comparison</h1>
        <p className="text-gray-500 mt-1">Sort and filter all properties · Click column headers to sort · Check 2–4 properties to compare</p>
      </div>

      {/* Filter + Legend */}
      <div className="flex items-center gap-4 mb-5">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">Filter type:</span>
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterType === t ? 'bg-blue-600 text-white shadow' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-emerald-100 rounded inline-block" />High</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-100 rounded inline-block" />Mid</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-100 rounded inline-block" />Low/Risk</span>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="px-3 py-3 w-8">
                  <span className="text-slate-400 text-xs">✓</span>
                </th>
                {COLS.map((col) => (
                  <th
                    key={String(col.key)}
                    onClick={() => toggleSort(col.key)}
                    className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide cursor-pointer hover:bg-slate-700 transition-colors whitespace-nowrap
                      ${col.align === 'right' ? 'text-right' : 'text-left'}`}
                  >
                    {col.label}
                    {sortKey === col.key && (
                      <span className="ml-1 text-blue-300">{sortDir === 'desc' ? '↓' : '↑'}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((p) => {
                const cls = recColorClass(p.rec_color)
                const isSelected = selected.includes(p.property_id)
                return (
                  <tr
                    key={p.property_id}
                    className={`border-b border-gray-100 transition-colors ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                  >
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(p.property_id)}
                        className="w-4 h-4 rounded accent-blue-600"
                      />
                    </td>
                    {COLS.map((col) => {
                      const bg = cellBg(col.key, p, properties)
                      const txt = cellText(col.key, p)
                      if (col.key === 'property_name') {
                        return (
                          <td key={String(col.key)} className="px-4 py-3">
                            <button
                              onClick={() => onSelectProperty(p.property_id)}
                              className="text-left hover:text-blue-700 transition-colors"
                            >
                              <p className="font-semibold text-gray-800 hover:text-blue-700">{p.property_name}</p>
                            </button>
                          </td>
                        )
                      }
                      if (col.key === 'rec_label') {
                        return (
                          <td key="rec_label" className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${cls.badge}`}>{p.rec_label}</span>
                          </td>
                        )
                      }
                      return (
                        <td
                          key={String(col.key)}
                          className={`px-4 py-3 ${col.align === 'right' ? 'text-right' : 'text-left'} ${bg} ${txt}`}
                        >
                          {col.fmt(p)}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Properties Deep Comparison */}
      {selectedProps.length >= 2 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-1">Side-by-Side Comparison</h2>
          <p className="text-xs text-gray-400 mb-4">Showing {selectedProps.length} selected properties · Check up to 4 in the table above</p>
          <div className="grid grid-cols-2 gap-6">
            {/* Radar */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Performance Radar (0–10)</h3>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: '#475569' }} />
                  {selectedProps.map((p, i) => (
                    <Radar
                      key={p.property_id}
                      name={p.property_name}
                      dataKey={p.property_id}
                      stroke={RADAR_COLORS[i % RADAR_COLORS.length]}
                      fill={RADAR_COLORS[i % RADAR_COLORS.length]}
                      fillOpacity={0.12}
                      strokeWidth={2}
                    />
                  ))}
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 mt-1">
                {selectedProps.map((p, i) => (
                  <div key={p.property_id} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: RADAR_COLORS[i % RADAR_COLORS.length] }} />
                    <span className="text-xs text-gray-600">{p.property_name.split(' ').slice(0, 2).join(' ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue + Score bars */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Revenue & Opportunity Score</h3>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={barCompareData} layout="vertical" margin={{ left: 10, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => `¥${v}M`} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={90} />
                  <Tooltip formatter={(v: number) => [`¥${v}M`, 'Revenue']} />
                  <Bar dataKey="revenue_m" radius={[0, 4, 4, 0]}>
                    {barCompareData.map((entry, i) => (
                      <Cell key={i} fill={REC_COLORS_HEX[entry.rec_color as Property['rec_color']]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {selectedProps.map((p) => {
                  const cls = recColorClass(p.rec_color)
                  return (
                    <div key={p.property_id} className={`flex items-center justify-between rounded-lg px-4 py-2.5 border ${cls.border} ${cls.bg}`}>
                      <span className={`text-sm font-semibold ${cls.text}`}>{p.property_name.split(' ').slice(0, 2).join(' ')}</span>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">Score <b>{fmtScore(p.opportunity_score)}</b>/30</span>
                        <span className={`font-bold px-2 py-0.5 rounded-full text-xs ${cls.badge}`}>{p.rec_label}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
