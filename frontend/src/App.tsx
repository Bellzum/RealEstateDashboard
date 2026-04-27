import { useState, useMemo } from 'react'
import type { Page, Role } from './types'
import { rawProperties } from './data/mockData'
import { computeProperties } from './utils/calculations'
import Sidebar from './components/Sidebar'
import ExecutiveDashboard from './pages/ExecutiveDashboard'
import PropertyComparison from './pages/PropertyComparison'
import PropertyDetail from './pages/PropertyDetail'
import AIDocumentSummary from './pages/AIDocumentSummary'

export default function App() {
  const [page, setPage] = useState<Page>('executive')
  const [role, setRole] = useState<Role>('C-Level')
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('P001')

  const properties = useMemo(() => computeProperties(rawProperties), [])

  const selectedProperty = properties.find((p) => p.property_id === selectedPropertyId) ?? properties[0]

  const handleSelectProperty = (id: string) => {
    setSelectedPropertyId(id)
    setPage('detail')
  }

  const handleNavigate = (p: Page) => {
    setPage(p)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        currentPage={page}
        onNavigate={handleNavigate}
        role={role}
        onRoleChange={setRole}
      />
      <main className="flex-1 overflow-auto">
        {page === 'executive' && (
          <ExecutiveDashboard
            properties={properties}
            role={role}
            onSelectProperty={handleSelectProperty}
          />
        )}
        {page === 'comparison' && (
          <PropertyComparison
            properties={properties}
            onSelectProperty={handleSelectProperty}
          />
        )}
        {page === 'detail' && (
          <PropertyDetail
            property={selectedProperty}
            allProperties={properties}
            onBack={() => setPage('comparison')}
            onSelectProperty={handleSelectProperty}
          />
        )}
        {page === 'documents' && (
          <AIDocumentSummary
            onSelectProperty={handleSelectProperty}
          />
        )}
      </main>
    </div>
  )
}
