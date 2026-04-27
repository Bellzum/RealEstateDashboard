export interface RawProperty {
  property_id: string
  property_name: string
  area: string
  property_type: string
  floor_area_m2: number
  building_age: number
  walking_minutes_to_station: number
  current_rent_per_m2: number
  competitor_rent_per_m2: number
  occupancy_rate: number          // 0.0–1.0
  renovation_cost: number         // JPY
  expected_rent_increase_percent: number  // 0.0–1.0
  foot_traffic_score: number      // 0–10
  office_nearby_score: number     // 0–10
  event_score: number             // 0–10
  risk_score: number              // 0–10
}

export interface Property extends RawProperty {
  predicted_rent_per_m2: number
  monthly_revenue: number
  yearly_revenue: number
  renovation_roi: number
  opportunity_score: number
  yearly_revenue_score: number
  location_score: number
  renovation_score: number
  recommendation: string
  rec_color: 'green' | 'blue' | 'yellow' | 'orange' | 'red'
  rec_label: string
}

export type Role = 'C-Level' | 'Business Manager' | 'Project Manager'
export type Page = 'executive' | 'comparison' | 'detail' | 'documents'

export interface MockDocument {
  doc_id: string
  property_id: string
  property_name: string
  doc_name: string
  doc_type: 'Lease Contract' | 'Rent Roll' | 'Inspection Report'
  upload_date: string
  fields: {
    label: string
    value: string
    confidence: number
  }[]
  ai_summary: string
  risk_level: 'Low' | 'Medium' | 'High'
  recommended_action: string
}
