import { useState } from 'react'
import type { MockDocument } from '../types'
import { mockDocuments } from '../data/mockData'

interface Props {
  onSelectProperty: (id: string) => void
}

const RISK_COLORS: Record<MockDocument['risk_level'], { badge: string; bar: string }> = {
  Low:    { badge: 'bg-emerald-100 text-emerald-800', bar: 'bg-emerald-500' },
  Medium: { badge: 'bg-amber-100 text-amber-800',     bar: 'bg-amber-500'   },
  High:   { badge: 'bg-red-100 text-red-800',         bar: 'bg-red-500'     },
}

const DOC_ICONS: Record<MockDocument['doc_type'], string> = {
  'Lease Contract':    '📄',
  'Rent Roll':         '📊',
  'Inspection Report': '🔎',
}

function ConfidenceBar({ pct }: { pct: number }) {
  const color = pct >= 90 ? 'bg-emerald-500' : pct >= 75 ? 'bg-amber-500' : 'bg-red-400'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
    </div>
  )
}

function DocumentCard({ doc, onSelectProperty }: { doc: MockDocument; onSelectProperty: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false)
  const riskStyle = RISK_COLORS[doc.risk_level]
  const avgConfidence = Math.round(doc.fields.reduce((s, f) => s + f.confidence, 0) / doc.fields.length)

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Document Header */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              {DOC_ICONS[doc.doc_type]}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-semibold text-gray-800">{doc.doc_name}</p>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{doc.doc_type}</span>
              </div>
              <p className="text-sm text-gray-500">{doc.property_name} · Uploaded {doc.upload_date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-center">
              <p className="text-xs text-gray-400">AI Confidence</p>
              <p className="text-lg font-bold text-gray-800">{avgConfidence}%</p>
            </div>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${riskStyle.badge}`}>
              {doc.risk_level} Risk
            </span>
          </div>
        </div>
      </div>

      {/* AI Summary */}
      <div className="px-6 py-4 bg-slate-50 border-b border-gray-100">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm flex-shrink-0 mt-0.5">
            🤖
          </div>
          <div>
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1.5">AI Summary</p>
            <p className="text-sm text-gray-700 leading-relaxed">{doc.ai_summary}</p>
          </div>
        </div>
      </div>

      {/* Recommended Action */}
      <div className="px-6 py-3 bg-blue-50 border-b border-blue-100 flex items-center gap-3">
        <span className="text-blue-500 text-lg">💡</span>
        <div>
          <span className="text-xs font-semibold text-blue-500 uppercase tracking-wide">Recommended Action  </span>
          <span className="text-sm font-medium text-blue-800">{doc.recommended_action}</span>
        </div>
      </div>

      {/* Extracted Fields (collapsible) */}
      <div className="px-6 py-4">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center justify-between w-full text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          <span className="font-semibold">Extracted Fields ({doc.fields.length})</span>
          <span className="text-gray-400">{expanded ? '▲ Hide' : '▼ Show'}</span>
        </button>

        {expanded && (
          <div className="mt-4 space-y-3">
            {doc.fields.map((field) => (
              <div key={field.label} className="grid grid-cols-3 gap-3 items-center">
                <span className="text-xs text-gray-500 font-medium">{field.label}</span>
                <span className="text-sm text-gray-800 font-semibold col-span-1">{field.value}</span>
                <ConfidenceBar pct={field.confidence} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50">
        <button
          onClick={() => onSelectProperty(doc.property_id)}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          View {doc.property_name} →
        </button>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span>✓ Extraction complete</span>
          <span>Model: GPT-4o (mock)</span>
        </div>
      </div>
    </div>
  )
}

function FakeUploadZone() {
  const [state, setState] = useState<'idle' | 'processing' | 'done'>('idle')

  const handleUpload = () => {
    setState('processing')
    setTimeout(() => setState('done'), 2400)
  }

  return (
    <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-8 text-center mb-8 hover:border-blue-300 transition-colors">
      {state === 'idle' && (
        <>
          <div className="text-5xl mb-3">📁</div>
          <p className="text-gray-600 font-semibold mb-1">Upload a document for AI extraction</p>
          <p className="text-gray-400 text-sm mb-4">PDF contracts, Excel rent rolls, inspection reports, voice notes</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleUpload}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Simulate Upload (Demo)
            </button>
            <span className="text-xs text-gray-400">Supports PDF · XLSX · JPG · MP3</span>
          </div>
        </>
      )}
      {state === 'processing' && (
        <div className="py-4">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" style={{ borderWidth: 3 }} />
            <p className="text-blue-700 font-semibold">AI extracting key information...</p>
          </div>
          <div className="space-y-1.5 max-w-sm mx-auto">
            {['Running OCR...', 'Parsing fields with GPT-4o...', 'Computing confidence scores...'].map((step, i) => (
              <p key={i} className="text-xs text-gray-400 animate-pulse">{step}</p>
            ))}
          </div>
        </div>
      )}
      {state === 'done' && (
        <div className="py-4">
          <div className="text-4xl mb-2">✅</div>
          <p className="text-emerald-700 font-semibold">Extraction complete!</p>
          <p className="text-gray-400 text-sm mt-1">Results would appear below (demo — see example documents)</p>
          <button
            onClick={() => setState('idle')}
            className="mt-3 text-xs text-gray-400 hover:text-gray-600 underline"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  )
}

export default function AIDocumentSummary({ onSelectProperty }: Props) {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">AI Document Summary</h1>
        <p className="text-gray-500 mt-1">Upload lease contracts, rent rolls, or inspection reports — AI extracts key fields and flags risks</p>
      </div>

      {/* How it works */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { step: '1', icon: '📤', label: 'Upload Document', desc: 'PDF, Excel, image, or audio' },
          { step: '2', icon: '🔬', label: 'AI Processing', desc: 'OCR + GPT-4o extraction' },
          { step: '3', icon: '📋', label: 'Field Extraction', desc: 'Rent, dates, terms, clauses' },
          { step: '4', icon: '💡', label: 'Action Recommendation', desc: 'Risk flag + next steps' },
        ].map((item) => (
          <div key={item.step} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm text-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full text-white text-sm font-bold flex items-center justify-center mx-auto mb-2">
              {item.step}
            </div>
            <div className="text-2xl mb-1">{item.icon}</div>
            <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Upload Zone */}
      <FakeUploadZone />

      {/* Existing Extractions */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Processed Documents</h2>
          <p className="text-xs text-gray-400">3 documents extracted · All linked to property records</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 bg-emerald-400 rounded-full inline-block" /> Low risk
          <span className="w-2 h-2 bg-amber-400 rounded-full inline-block ml-2" /> Medium risk
          <span className="w-2 h-2 bg-red-400 rounded-full inline-block ml-2" /> High risk
        </div>
      </div>

      <div className="space-y-6">
        {mockDocuments.map((doc) => (
          <DocumentCard key={doc.doc_id} doc={doc} onSelectProperty={onSelectProperty} />
        ))}
      </div>

      {/* AI Capabilities */}
      <div className="mt-8 bg-slate-800 rounded-xl p-6 text-white">
        <h3 className="font-bold text-lg mb-4">AI Extraction Capabilities (MVP)</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: '📄', title: 'PDF Lease Contracts', items: ['Tenant name & ID', 'Rent & deposit', 'Contract dates', 'Renewal terms', 'Special clauses'] },
            { icon: '📊', title: 'Excel Rent Rolls', items: ['Unit occupancy status', 'Revenue by unit', 'Vacancy analysis', 'Tenant concentration', 'Period comparison'] },
            { icon: '🏗️', title: 'Inspection Reports', items: ['Structural condition', 'System health (HVAC)', 'Repair cost estimates', 'Urgency classification', 'Renovation priority'] },
          ].map((cap) => (
            <div key={cap.title} className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{cap.icon}</span>
                <span className="font-semibold text-sm">{cap.title}</span>
              </div>
              <ul className="space-y-1">
                {cap.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="text-emerald-400">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-slate-400 text-xs mt-4">* In this MVP, documents and extractions are pre-seeded mock data. Production version connects to OpenAI GPT-4o API.</p>
      </div>
    </div>
  )
}
