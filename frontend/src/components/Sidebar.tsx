import type { Page, Role } from '../types'

interface SidebarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  role: Role
  onRoleChange: (r: Role) => void
}

const navItems: { label: string; page: Page; icon: string }[] = [
  { label: 'Executive Dashboard', page: 'executive', icon: '📊' },
  { label: 'Property Comparison', page: 'comparison', icon: '🏢' },
  { label: 'Property Detail', page: 'detail', icon: '🔍' },
  { label: 'AI Document Summary', page: 'documents', icon: '🤖' },
]

const roles: Role[] = ['C-Level', 'Business Manager', 'Project Manager']

const roleColors: Record<Role, string> = {
  'C-Level': 'bg-violet-600',
  'Business Manager': 'bg-blue-600',
  'Project Manager': 'bg-teal-600',
}

const roleIcons: Record<Role, string> = {
  'C-Level': '👔',
  'Business Manager': '📋',
  'Project Manager': '🗂️',
}

export default function Sidebar({ currentPage, onNavigate, role, onRoleChange }: SidebarProps) {
  return (
    <div className="w-64 min-h-screen bg-slate-900 flex flex-col border-r border-slate-700 flex-shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-700">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            P
          </div>
          <span className="text-white font-bold text-lg tracking-tight">PropIQ</span>
        </div>
        <p className="text-slate-400 text-xs">AI Real Estate Revenue Dashboard</p>
      </div>

      {/* Role Selector */}
      <div className="px-4 py-4 border-b border-slate-700">
        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-2">
          Viewing as
        </p>
        <div className="flex flex-col gap-1">
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => onRoleChange(r)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${role === r
                  ? `${roleColors[r]} text-white shadow-lg`
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
            >
              <span>{roleIcons[r]}</span>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4">
        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-3">
          Navigation
        </p>
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left
                ${currentPage === item.page
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-700">
        <p className="text-slate-500 text-xs">
          Hackathon Demo v1.0
        </p>
        <p className="text-slate-600 text-xs mt-0.5">
          8 Properties · Mock Data
        </p>
      </div>
    </div>
  )
}
