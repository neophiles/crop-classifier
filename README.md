# Crop Classification & Yield Assessment Web App

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, DaisyUI
- **Backend:** FastAPI, Python, SQLModel, Uvicorn
- **Machine Learning:** Scikit-learn, Pandas, NumPy (Random Forest, Decision Trees, SVM)
- **Data:** Tabular soil chemistry and weather records (`indonesia_dataset.csv`)

---

## Project Structure

```text
crop-classifier/
├── backend/          # FastAPI REST API
│   ├── main.py       # API endpoints
│   └── requirements.txt
├── frontend/         # React + Vite web dashboard
│   ├── src/          # UI components and pages
│   └── package.json
├── model/            # Core ML model inference package
│   ├── src/model/    # Model loader and prediction logic
│   └── requirements.txt
├── notebooks/        # Data exploration and model benchmarking
│   ├── data/         # Dataset files
│   ├── EDA.ipynb     # Exploratory Data Analysis
│   └── model_trained_on_chosen_crops.ipynb
└── README.md
```

---

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js (v18+) and npm

---

### 1. Backend Setup

From the root directory (`crop-classifier`):

```bash
# Create and activate a virtual environment
python -m venv .venv

# On Windows (Git Bash):
source .venv/Scripts/activate

# On Windows (PowerShell):
# .venv\Scripts\Activate.ps1

# Install dependencies
pip install -r model/requirements.txt
pip install "fastapi[standard]" sqlmodel asyncpg alembic

# Start the FastAPI dev server
fastapi dev backend/main.py
```

The API will be live at `http://127.0.0.1:8000`.  
Swagger interactive docs are available at `http://127.0.0.1:8000/docs`.

---

### 2. Frontend Setup

In a new terminal window:

```bash
# Navigate to the frontend directory
cd frontend

# Install packages
npm install

# Start the Vite development server
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## Environmental Parameters Used

| Parameter | Description | Source / Input |
| :--- | :--- | :--- |
| **N** | Nitrogen content in soil | User Soil Test Input |
| **P** | Phosphorus content in soil | User Soil Test Input |
| **K** | Potassium content in soil | User Soil Test Input |
| **pH** | Soil pH level (acidity/alkalinity) | User Soil Test Input |
| **Temperature** | Local temperature (°C) | Weather API / Manual Input |
| **Humidity** | Relative air humidity (%) | Weather API / Manual Input |
| **Rainfall** | Seasonal precipitation (mm) | Weather API / Manual Input |
