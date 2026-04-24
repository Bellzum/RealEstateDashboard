# PropIQ — Real Estate Price, Rent & Revenue Intelligence Dashboard

> Version: MVP Concept v1.0 | Date: 2026-04-24 | Author: Product Architecture Team

---

## What is PropIQ?

PropIQ is an AI-powered real estate intelligence platform built for business leaders, investors, and property owners who need to move beyond gut-feel decisions and into data-driven revenue strategy.

It answers the three questions every real estate decision-maker actually cares about:

1. **What is this property worth right now?**
2. **How much revenue can I generate from it?**
3. **What should I do next — buy, hold, renovate, lease, or sell?**

PropIQ does this by combining property master data, location intelligence, market benchmarks, renovation scenarios, event impact data, and AI-extracted insights from unstructured documents (PDFs, Excel rent rolls, images, voice notes) into a unified dashboard designed for each user role.

---

## Deliverables Index

| # | Document | File |
|---|----------|------|
| 1 | Product Concept Summary | [docs/01_product_concept.md](docs/01_product_concept.md) |
| 2 | User Group Analysis | [docs/02_user_group_analysis.md](docs/02_user_group_analysis.md) |
| 3 | Data Schema | [docs/03_data_schema.md](docs/03_data_schema.md) |
| 4 | Mock Data Design | [docs/04_mock_data_design.md](docs/04_mock_data_design.md) |
| 5 | Dashboard Page Design | [docs/05_dashboard_pages.md](docs/05_dashboard_pages.md) |
| 6 | KPI List | [docs/06_kpi_list.md](docs/06_kpi_list.md) |
| 7 | AI Feature List | [docs/07_ai_features.md](docs/07_ai_features.md) |
| 8 | MVP Scope | [docs/08_mvp_scope.md](docs/08_mvp_scope.md) |
| 9 | Future Version Scope | [docs/09_future_scope.md](docs/09_future_scope.md) |
| 10 | User Stories | [docs/10_user_stories.md](docs/10_user_stories.md) |
| 11 | UI Layout Spec | [docs/11_ui_layout.md](docs/11_ui_layout.md) |
| 12 | API Endpoints | [docs/12_api_endpoints.md](docs/12_api_endpoints.md) |
| 13 | Database Tables | [docs/13_database_tables.md](docs/13_database_tables.md) |
| 14 | Prediction Logic | [docs/14_prediction_logic.md](docs/14_prediction_logic.md) |
| 15 | AI Prompt Templates | [docs/15_prompt_templates.md](docs/15_prompt_templates.md) |
| 16 | Risks & Limitations | [docs/16_risks_limitations.md](docs/16_risks_limitations.md) |
| 17 | Model Validation Guide | [docs/17_model_validation.md](docs/17_model_validation.md) |

## Code Artifacts

| Artifact | File |
|----------|------|
| Mock Data (50+ properties) | [data/mock_properties.json](data/mock_properties.json) |
| PostgreSQL Schema | [src/database/schema.sql](src/database/schema.sql) |
| FastAPI Backend | [src/api/main.py](src/api/main.py) |
| ML Prediction Module | [src/models/predictor.py](src/models/predictor.py) |
| React App Shell | [src/frontend/App.tsx](src/frontend/App.tsx) |
| Executive Dashboard Page | [src/frontend/pages/ExecutivePage.tsx](src/frontend/pages/ExecutivePage.tsx) |
| Property Valuation Page | [src/frontend/pages/ValuationPage.tsx](src/frontend/pages/ValuationPage.tsx) |
| Revenue Simulation Page | [src/frontend/pages/RevenuePage.tsx](src/frontend/pages/RevenuePage.tsx) |

---

## Tech Stack (MVP)

```
Frontend:    Next.js 14 (App Router) + TypeScript
Charts:      Recharts + ECharts
Maps:        Leaflet + OpenStreetMap (free tier MVP)
Backend:     FastAPI (Python 3.11)
Database:    PostgreSQL 16 + PostGIS
Cache:       Redis
File Store:  AWS S3 (or local MinIO for dev)
AI/ML:       scikit-learn, LightGBM, OpenAI GPT-4o, Whisper, Tesseract OCR
Auth:        NextAuth.js + JWT
Deploy:      Docker Compose (dev) → AWS ECS (prod)
```

---

## Quick Start (Development)

```bash
# 1. Clone and enter project
git clone https://github.com/your-org/propiq
cd propiq

# 2. Start services
docker compose up -d

# 3. Load mock data
python scripts/seed_mock_data.py

# 4. Start frontend
cd src/frontend && npm install && npm run dev

# 5. API docs
open http://localhost:8000/docs
```
