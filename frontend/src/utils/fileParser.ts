import * as XLSX from 'xlsx'
import type { RawProperty } from '../types'

export interface ParseResult {
  data: RawProperty[]
  errors: string[]
  fileName: string
  rowCount: number
}

// Required columns — must all be present in the uploaded file
const REQUIRED_COLS: (keyof RawProperty)[] = [
  'property_name',
  'area',
  'property_type',
  'floor_area_m2',
  'building_age',
  'competitor_rent_per_m2',
  'occupancy_rate',
  'risk_score',
]

function toNum(v: unknown, fallback = 0): number {
  const n = Number(v)
  return isNaN(n) ? fallback : n
}

function toStr(v: unknown, fallback = ''): string {
  return v != null && String(v).trim() !== '' ? String(v).trim() : fallback
}

function validateRow(row: Record<string, unknown>, index: number): string | null {
  if (!toStr(row.property_name)) return `Row ${index}: property_name is required`
  if (toNum(row.floor_area_m2) <= 0) return `Row ${index} (${row.property_name}): floor_area_m2 must be > 0`
  if (toNum(row.competitor_rent_per_m2) <= 0) return `Row ${index} (${row.property_name}): competitor_rent_per_m2 must be > 0`
  const occ = toNum(row.occupancy_rate)
  if (occ <= 0 || occ > 1) return `Row ${index} (${row.property_name}): occupancy_rate must be between 0 and 1 (e.g. 0.95 for 95%)`
  const risk = toNum(row.risk_score)
  if (risk < 0 || risk > 10) return `Row ${index} (${row.property_name}): risk_score must be 0–10`
  return null
}

function checkHeaders(keys: string[]): string[] {
  const missing = REQUIRED_COLS.filter((col) => !keys.includes(col))
  return missing.map((c) => `Missing required column: "${c}"`)
}

export async function parsePropertyFile(file: File): Promise<ParseResult> {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const buffer = e.target?.result as ArrayBuffer
        const workbook = XLSX.read(buffer, { type: 'array' })
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
          defval: '',       // empty cells → ''
          raw: false,       // keep everything as strings first, we'll convert
        })

        if (rows.length === 0) {
          return resolve({ data: [], errors: ['File is empty — no data rows found.'], fileName: file.name, rowCount: 0 })
        }

        // Check required columns
        const headerErrors = checkHeaders(Object.keys(rows[0]))
        if (headerErrors.length > 0) {
          return resolve({ data: [], errors: headerErrors, fileName: file.name, rowCount: 0 })
        }

        const errors: string[] = []
        const data: RawProperty[] = []

        rows.forEach((row, i) => {
          const rowNum = i + 2  // +2 because row 1 = headers
          const validationError = validateRow(row, rowNum)
          if (validationError) {
            errors.push(validationError)
            return
          }

          data.push({
            property_id:   toStr(row.property_id) || `P${String(i + 1).padStart(3, '0')}`,
            property_name: toStr(row.property_name),
            area:          toStr(row.area, 'Unknown'),
            property_type: toStr(row.property_type, 'Other'),
            floor_area_m2:                  toNum(row.floor_area_m2),
            building_age:                   toNum(row.building_age),
            walking_minutes_to_station:     toNum(row.walking_minutes_to_station),
            current_rent_per_m2:            toNum(row.current_rent_per_m2),
            competitor_rent_per_m2:         toNum(row.competitor_rent_per_m2),
            occupancy_rate:                 toNum(row.occupancy_rate),
            renovation_cost:                toNum(row.renovation_cost),
            expected_rent_increase_percent: toNum(row.expected_rent_increase_percent),
            foot_traffic_score:             toNum(row.foot_traffic_score),
            office_nearby_score:            toNum(row.office_nearby_score),
            event_score:                    toNum(row.event_score),
            risk_score:                     toNum(row.risk_score),
          })
        })

        resolve({ data, errors, fileName: file.name, rowCount: data.length })
      } catch {
        resolve({
          data: [],
          errors: ['Could not read file. Make sure it is a valid .xlsx or .csv file.'],
          fileName: file.name,
          rowCount: 0,
        })
      }
    }

    reader.onerror = () =>
      resolve({ data: [], errors: ['File read failed.'], fileName: file.name, rowCount: 0 })

    reader.readAsArrayBuffer(file)
  })
}

// Generate and download a fresh .xlsx template from the current mock data
export function downloadTemplate(): void {
  const headers = [
    'property_id', 'property_name', 'area', 'property_type',
    'floor_area_m2', 'building_age', 'walking_minutes_to_station',
    'current_rent_per_m2', 'competitor_rent_per_m2', 'occupancy_rate',
    'renovation_cost', 'expected_rent_increase_percent',
    'foot_traffic_score', 'office_nearby_score', 'event_score', 'risk_score',
  ]

  // Column format guide row (shown as row 2, parsers should skip rows starting with #)
  const guide = [
    '# ID', '# Name', '# Area/city', '# Type',
    '# m²', '# years', '# minutes',
    '# ¥/m²/mo', '# ¥/m²/mo', '# 0.0–1.0 (e.g. 0.95)',
    '# JPY total', '# 0.0–1.0 (e.g. 0.12)',
    '# 0–10', '# 0–10', '# 0–10', '# 0–10',
  ]

  const sampleRows = [
    ['P001','Shibuya Mark Office','Shibuya','Office',3200,8,4,3800,4200,0.965,5000000,0.125,9.2,9.5,6.5,2.1],
    ['P002','Shinjuku Tower Apt','Shinjuku','Apartment',5800,12,6,3100,3400,0.885,10000000,0.125,8.9,8.5,7.0,3.4],
    ['P003','Nakameguro Riverside Retail','Meguro','Retail',1800,5,3,2800,3100,1.000,5000000,0.180,8.8,5.0,8.5,1.8],
    ['P004','Kawasaki Logistics Hub','Kawasaki','Warehouse',12000,15,12,1100,1250,0.950,30000000,0.100,5.2,4.0,2.0,3.0],
    ['P005','Roppongi Hills Mixed-Use','Roppongi','Mixed-use',8500,18,5,2800,3800,0.780,60000000,0.285,8.5,8.0,9.5,5.2],
    ['P006','Ebisu South Event Venue','Ebisu','Venue',1400,3,5,4200,4500,0.910,3000000,0.100,8.3,6.0,8.0,2.8],
    ['P007','Omiya Office Center','Saitama','Office',4500,22,7,900,1200,0.720,8000000,0.150,7.2,7.5,4.0,6.8],
    ['P008','Kawasaki Station Retail','Kawasaki','Retail',950,7,2,2800,3200,1.000,3000000,0.100,9.0,7.0,5.0,2.5],
    // blank rows for user to fill in
    [], [], [], [], [],
  ]

  const wb = XLSX.utils.book_new()

  // Sheet 1: Data (headers + guide row + sample data)
  const dataSheet = XLSX.utils.aoa_to_sheet([headers, guide, ...sampleRows])

  // Style the header row width
  dataSheet['!cols'] = headers.map(() => ({ wch: 22 }))

  XLSX.utils.book_append_sheet(wb, dataSheet, 'Properties')

  // Sheet 2: Column Guide
  const guideData = [
    ['Column', 'Type', 'Required', 'Description', 'Example'],
    ['property_id', 'Text', 'No (auto)', 'Unique ID — auto-generated if blank', 'P001'],
    ['property_name', 'Text', 'YES', 'Full property name', 'Shibuya Mark Office'],
    ['area', 'Text', 'YES', 'District or city name', 'Shibuya'],
    ['property_type', 'Text', 'YES', 'Office / Apartment / Retail / Warehouse / Mixed-use / Hotel / Venue', 'Office'],
    ['floor_area_m2', 'Number', 'YES', 'Total leasable floor area in square meters', '3200'],
    ['building_age', 'Number', 'YES', 'Building age in years', '8'],
    ['walking_minutes_to_station', 'Number', 'No', 'Walk time to nearest train station (minutes)', '4'],
    ['current_rent_per_m2', 'Number', 'No', 'Current rent per m² per month (JPY)', '3800'],
    ['competitor_rent_per_m2', 'Number', 'YES', 'Nearby competitor average rent per m² (JPY)', '4200'],
    ['occupancy_rate', 'Decimal 0–1', 'YES', 'Current occupancy as a decimal (95% = 0.95)', '0.965'],
    ['renovation_cost', 'Number', 'No', 'Estimated total renovation cost (JPY)', '5000000'],
    ['expected_rent_increase_percent', 'Decimal 0–1', 'No', 'Expected rent uplift after renovation (12% = 0.12)', '0.125'],
    ['foot_traffic_score', 'Number 0–10', 'No', 'Pedestrian foot traffic score (10 = busiest)', '9.2'],
    ['office_nearby_score', 'Number 0–10', 'No', 'Proximity to business districts (10 = closest)', '9.5'],
    ['event_score', 'Number 0–10', 'No', 'Local event and tourism activity score', '6.5'],
    ['risk_score', 'Number 0–10', 'YES', 'Overall risk rating (10 = highest risk)', '2.1'],
  ]
  const guideSheet = XLSX.utils.aoa_to_sheet(guideData)
  guideSheet['!cols'] = [{ wch: 32 }, { wch: 16 }, { wch: 10 }, { wch: 55 }, { wch: 20 }]
  XLSX.utils.book_append_sheet(wb, guideSheet, 'Column Guide')

  XLSX.writeFile(wb, 'PropAI_Property_Template.xlsx')
}
