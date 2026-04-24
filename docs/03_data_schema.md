# D3 — Data Schema

All entities follow a consistent pattern:
- UUID primary key
- `created_at` / `updated_at` timestamps
- `data_source` (manual, scraped, ai_extracted, government)
- `confidence_score` (0.0–1.0) where applicable

---

## Entity 1: Property (Core Master)

```
properties
├── property_id          UUID PK
├── property_name        VARCHAR(200)
├── address              VARCHAR(500)
├── district             VARCHAR(100)          -- Shibuya, Shinjuku, etc.
├── city                 VARCHAR(100)
├── prefecture           VARCHAR(50)
├── latitude             DECIMAL(10,7)
├── longitude            DECIMAL(10,7)
├── property_type        ENUM(residential_house, apartment, office,
│                              retail_shop, restaurant, event_venue,
│                              mixed_use, warehouse, hotel)
├── building_age_years   INTEGER
├── construction_year    INTEGER
├── floor_area_m2        DECIMAL(10,2)
├── land_area_m2         DECIMAL(10,2)
├── number_of_floors     INTEGER
├── basement_floors      INTEGER
├── nearest_station      VARCHAR(100)
├── walking_minutes_to_station   INTEGER
├── train_line           VARCHAR(100)
├── parking_available    BOOLEAN
├── parking_spaces       INTEGER
├── current_rent_jpy     BIGINT
├── current_price_jpy    BIGINT
├── occupancy_status     ENUM(occupied, vacant, partial, under_renovation)
├── zoning_type          VARCHAR(100)
├── floor_area_ratio     DECIMAL(5,2)         -- FAR (%)
├── building_coverage_ratio DECIMAL(5,2)      -- BCR (%)
├── earthquake_risk_level ENUM(low, medium, high, very_high)
├── flood_risk_level     ENUM(low, medium, high, very_high)
├── managed_by           VARCHAR(200)
├── data_source          VARCHAR(50)
├── created_at           TIMESTAMP
└── updated_at           TIMESTAMP
```

---

## Entity 2: Location Intelligence

```
location_data
├── location_id          UUID PK
├── property_id          UUID FK → properties
├── distance_to_station_m        INTEGER
├── distance_to_major_office_area_m INTEGER
├── distance_to_shopping_area_m  INTEGER
├── distance_to_school_m         INTEGER
├── distance_to_hospital_m       INTEGER
├── distance_to_competitor_building_m INTEGER
├── nearby_population_500m       INTEGER
├── nearby_population_1km        INTEGER
├── daytime_population_1km       INTEGER
├── nighttime_population_1km     INTEGER
├── household_count_1km          INTEGER
├── avg_household_income_jpy     BIGINT
├── foot_traffic_score           DECIMAL(4,2)  -- 0–10
├── tourist_score                DECIMAL(4,2)  -- 0–10
├── walkability_score            DECIMAL(4,2)  -- 0–10
├── public_transport_score       DECIMAL(4,2)  -- 0–10
├── road_access_score            DECIMAL(4,2)  -- 0–10
├── data_as_of                   DATE
├── data_source                  VARCHAR(50)
└── updated_at                   TIMESTAMP
```

---

## Entity 3: Market Data

```
market_data
├── market_data_id               UUID PK
├── property_id                  UUID FK → properties
├── avg_rent_per_m2_jpy          DECIMAL(10,2)
├── avg_sale_price_per_m2_jpy    DECIMAL(12,2)
├── vacancy_rate_area_pct        DECIMAL(5,2)
├── competitor_avg_rent_jpy      DECIMAL(10,2)
├── competitor_avg_occupancy_pct DECIMAL(5,2)
├── new_building_supply_units    INTEGER        -- next 12 months
├── regional_price_trend_pct     DECIMAL(6,3)   -- YoY %
├── regional_rent_trend_pct      DECIMAL(6,3)
├── price_to_rent_ratio          DECIMAL(8,2)
├── days_on_market_avg           INTEGER
├── transaction_volume_12m       INTEGER
├── data_period                  VARCHAR(20)   -- e.g. "2026-Q1"
├── data_source                  VARCHAR(50)
└── updated_at                   TIMESTAMP
```

---

## Entity 4: Transaction History

```
transaction_history
├── transaction_id       UUID PK
├── property_id          UUID FK → properties
├── transaction_date     DATE
├── transaction_type     ENUM(sale, lease, auction, assignment)
├── transaction_price_jpy BIGINT
├── price_per_m2_jpy     DECIMAL(12,2)
├── buyer_type           ENUM(individual, corporation, fund, government)
├── data_source          VARCHAR(50)
└── created_at           TIMESTAMP
```

---

## Entity 5: Revenue & Financial Data

```
revenue_data
├── revenue_id           UUID PK
├── property_id          UUID FK → properties
├── period_month         DATE                  -- first day of month
├── gross_monthly_rent_jpy     BIGINT
├── service_fee_jpy      BIGINT
├── common_area_fee_jpy  BIGINT
├── maintenance_cost_jpy BIGINT
├── management_cost_jpy  BIGINT
├── insurance_cost_jpy   BIGINT
├── property_tax_jpy     BIGINT
├── other_cost_jpy       BIGINT
├── total_cost_jpy       BIGINT
├── net_operating_income_jpy   BIGINT
├── occupancy_rate_pct   DECIMAL(5,2)
├── vacancy_loss_jpy     BIGINT
├── data_source          VARCHAR(50)
└── created_at           TIMESTAMP
```

---

## Entity 6: Renovation Data

```
renovation_scenarios
├── renovation_id        UUID PK
├── property_id          UUID FK → properties
├── renovation_name      VARCHAR(200)
├── renovation_type      ENUM(interior, exterior, mechanical, structural,
│                              accessibility, energy_efficiency, full)
├── estimated_cost_jpy   BIGINT
├── min_cost_jpy         BIGINT
├── max_cost_jpy         BIGINT
├── expected_rent_increase_pct  DECIMAL(5,2)
├── expected_occupancy_increase_pct DECIMAL(5,2)
├── expected_price_increase_pct DECIMAL(5,2)
├── payback_months       INTEGER
├── before_annual_noi_jpy BIGINT
├── after_annual_noi_jpy BIGINT
├── roi_pct              DECIMAL(6,3)
├── priority_rank        INTEGER               -- 1=highest priority
├── status               ENUM(proposed, approved, in_progress, completed)
├── created_by           VARCHAR(100)
└── created_at           TIMESTAMP
```

---

## Entity 7: Event & Area Activity

```
area_events
├── event_id             UUID PK
├── property_id          UUID FK → properties  -- NULL = area-wide event
├── event_name           VARCHAR(200)
├── event_type           ENUM(festival, concert, conference, construction,
│                              infrastructure, development, disaster, other)
├── event_start_date     DATE
├── event_end_date       DATE
├── expected_visitors    INTEGER
├── impact_on_retail_pct DECIMAL(6,3)          -- % revenue change
├── impact_on_short_term_rent_pct DECIMAL(6,3)
├── impact_radius_m      INTEGER
├── source_url           VARCHAR(500)
├── data_source          VARCHAR(50)
└── created_at           TIMESTAMP
```

---

## Entity 8: AI Predictions (Model Output)

```
property_predictions
├── prediction_id        UUID PK
├── property_id          UUID FK → properties
├── model_version        VARCHAR(50)
├── predicted_at         TIMESTAMP
├── price_prediction_jpy BIGINT
├── price_low_jpy        BIGINT               -- 80% CI lower
├── price_high_jpy       BIGINT               -- 80% CI upper
├── rent_prediction_jpy  BIGINT               -- per month
├── rent_low_jpy         BIGINT
├── rent_high_jpy        BIGINT
├── revenue_base_annual_jpy BIGINT
├── revenue_bull_annual_jpy BIGINT
├── revenue_bear_annual_jpy BIGINT
├── noi_prediction_jpy   BIGINT
├── cap_rate_pct         DECIMAL(6,3)
├── gross_yield_pct      DECIMAL(6,3)
├── roi_pct              DECIMAL(6,3)
├── payback_years        DECIMAL(5,1)
├── occupancy_rate_pct   DECIMAL(5,2)
├── vacancy_risk_score   DECIMAL(4,2)         -- 0–10 (10=highest risk)
├── risk_score           DECIMAL(4,2)         -- overall 0–10
├── investment_score     DECIMAL(4,2)         -- 0–10 (10=best)
├── confidence_score     DECIMAL(4,3)         -- 0.0–1.0
├── recommended_action   ENUM(buy, hold, renovate, lease, sell, investigate)
├── top_positive_factors JSONB                -- list of strings
├── top_negative_factors JSONB                -- list of strings
├── feature_importance   JSONB                -- model SHAP values
└── model_notes          TEXT
```

---

## Entity 9: Documents (Unstructured Input)

```
documents
├── document_id          UUID PK
├── property_id          UUID FK → properties  -- NULL if not yet linked
├── document_name        VARCHAR(300)
├── document_type        ENUM(pdf_contract, excel_rent_roll, photo,
│                              inspection_image, interview_transcript,
│                              voice_note, meeting_minutes,
│                              renovation_quote, invoice, lease, other)
├── file_path            VARCHAR(500)          -- S3 key
├── file_size_bytes      BIGINT
├── mime_type            VARCHAR(100)
├── upload_status        ENUM(pending, processing, completed, failed)
├── extraction_status    ENUM(pending, processing, completed, failed)
├── uploaded_by          VARCHAR(100)
├── created_at           TIMESTAMP
└── updated_at           TIMESTAMP
```

---

## Entity 10: AI Extraction Results

```
document_extractions
├── extraction_id        UUID PK
├── document_id          UUID FK → documents
├── property_id          UUID FK → properties
├── extraction_type      ENUM(contract_terms, rent_roll, image_analysis,
│                              transcription, news_signal, general)
├── extracted_fields     JSONB                 -- key-value pairs
├── summary_text         TEXT                  -- AI-generated summary
├── confidence_score     DECIMAL(4,3)
├── model_used           VARCHAR(100)          -- gpt-4o, whisper, etc.
├── needs_review         BOOLEAN               -- flagged for human review
├── reviewed_by          VARCHAR(100)
├── reviewed_at          TIMESTAMP
└── created_at           TIMESTAMP
```

---

## Entity 11: Competitor Properties

```
competitor_properties
├── competitor_id        UUID PK
├── reference_property_id UUID FK → properties  -- our property
├── competitor_name      VARCHAR(200)
├── address              VARCHAR(500)
├── latitude             DECIMAL(10,7)
├── longitude            DECIMAL(10,7)
├── distance_m           INTEGER
├── property_type        VARCHAR(50)
├── floor_area_m2        DECIMAL(10,2)
├── asking_rent_jpy      BIGINT
├── rent_per_m2_jpy      DECIMAL(10,2)
├── occupancy_pct        DECIMAL(5,2)
├── building_age_years   INTEGER
├── data_source          VARCHAR(50)
└── updated_at           TIMESTAMP
```

---

## Entity 12: Government & Public Data

```
government_data
├── gov_data_id          UUID PK
├── district             VARCHAR(100)
├── year                 INTEGER
├── official_land_price_per_m2_jpy  BIGINT
├── residential_land_price_per_m2_jpy BIGINT
├── commercial_land_price_per_m2_jpy BIGINT
├── population           INTEGER
├── household_count      INTEGER
├── business_count       INTEGER
├── tourist_arrivals     INTEGER
├── data_source          VARCHAR(100)          -- e.g. "MLIT", "Tokyo Metro"
└── updated_at           TIMESTAMP
```

---

## Relationships Summary

```
properties (1) ──── (1) location_data
properties (1) ──── (1) market_data
properties (1) ──── (N) transaction_history
properties (1) ──── (N) revenue_data
properties (1) ──── (N) renovation_scenarios
properties (1) ──── (N) area_events
properties (1) ──── (N) property_predictions
properties (1) ──── (N) documents
properties (1) ──── (N) competitor_properties
documents   (1) ──── (N) document_extractions
districts   (1) ──── (N) government_data
```
