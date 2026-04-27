interface KPICardProps {
  label: string
  value: string
  sub?: string
  icon?: string
  color?: 'blue' | 'green' | 'red' | 'amber' | 'violet' | 'slate'
  onClick?: () => void
}

const colorMap = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   icon: 'bg-blue-100 text-blue-600',  text: 'text-blue-700'   },
  green:  { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'bg-emerald-100 text-emerald-600', text: 'text-emerald-700' },
  red:    { bg: 'bg-red-50',    border: 'border-red-200',    icon: 'bg-red-100 text-red-600',    text: 'text-red-700'    },
  amber:  { bg: 'bg-amber-50',  border: 'border-amber-200',  icon: 'bg-amber-100 text-amber-600', text: 'text-amber-700' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', icon: 'bg-violet-100 text-violet-600', text: 'text-violet-700' },
  slate:  { bg: 'bg-slate-50',  border: 'border-slate-200',  icon: 'bg-slate-100 text-slate-600', text: 'text-slate-700' },
}

export default function KPICard({ label, value, sub, icon, color = 'slate', onClick }: KPICardProps) {
  const c = colorMap[color]
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border p-5 ${c.bg} ${c.border} ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{label}</p>
          <p className={`text-2xl font-bold ${c.text} leading-tight truncate`}>{value}</p>
          {sub && <p className="text-xs text-slate-500 mt-1.5 leading-snug">{sub}</p>}
        </div>
        {icon && (
          <div className={`w-10 h-10 rounded-lg ${c.icon} flex items-center justify-center text-lg flex-shrink-0`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
