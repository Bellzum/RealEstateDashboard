import { useState, useMemo } from 'react'
import type { Page, Role, RawProperty } from './types'
import { rawProperties } from './data/mockData'
import { computeProperties } from './utils/calculations'
import Sidebar from './components/Sidebar'
import ExecutiveDashboard from './pages/ExecutiveDashboard'
import PropertyComparison from './pages/PropertyComparison'
import PropertyDetail from './pages/PropertyDetail'
import AIDocumentSummary from './pages/AIDocumentSummary'

export interface UploadState {
  fileName: string
  rowCount: number
  uploadedAt: string
}

export default function App() {
  const [page, setPage] = useState<Page>('executive')
  const [role, setRole] = useState<Role>('C-Level')
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('P001')
  const [customProperties, setCustomProperties] = useState<RawProperty[] | null>(null)
  const [uploadState, setUploadState] = useState<UploadState | null>(null)

  const properties = useMemo(
    () => computeProperties(customProperties ?? rawProperties),
    [customProperties],
  )

  const handleDataLoad = (data: RawProperty[], fileName: string, rowCount: number) => {
    setCustomProperties(data)
    setUploadState({ fileName, rowCount, uploadedAt: new Date().toLocaleTimeString() })
    if (data.length > 0) setSelectedPropertyId(data[0].property_id)
  }

  const handleDataReset = () => {
    setCustomProperties(null)
    setUploadState(null)
    setSelectedPropertyId('P001')
  }

  const selectedProperty =
    properties.find((p) => p.property_id === selectedPropertyId) ?? properties[0]

  const handleSelectProperty = (id: string) => {
    setSelectedPropertyId(id)
    setPage('detail')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        currentPage={page}
        onNavigate={setPage}
        role={role}
        onRoleChange={setRole}
      />
      <main className="flex-1 overflow-auto">
        {page === 'executive' && (
          <ExecutiveDashboard
            properties={properties}
            role={role}
            uploadState={uploadState}
            onSelectProperty={handleSelectProperty}
            onDataLoad={handleDataLoad}
            onDataReset={handleDataReset}
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
          <AIDocumentSummary onSelectProperty={handleSelectProperty} />
        )}
      </main>
    </div>
  )
}
