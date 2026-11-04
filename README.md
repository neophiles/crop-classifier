# Crop Classification & Yield Assessment Web App

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind 4, DaisyUI
- **Backend:** FastAPI, Python, SQLModel, Uvicorn
- **Data:** NumPy, Pandas, Matplotlib, Seaborn
- **Machine Learning:** NumPy, Pandas, Scikit-learn, Pandas, NumPy
- **Data:** Tabular soil chemistry and weather records (`indonesia_dataset.csv`)

---

## Project Structure

```text
crop-classifier/
├── backend/              # FastAPI REST API
│   ├── main.py           # App root
│   ├── pyproject.toml
│   └── requirements.txt
├── frontend/             # React + Vite client
│   ├── src/              # UI components and pages
│   └── package.json
├── model/                # Core ML model inference package
│   ├── src/model/        # Model loader and prediction logic
│   └── requirements.txt
├── notebooks/            # Data exploration and model benchmarking
│   ├── data/             # Dataset files
│   ├── EDA.ipynb         # Exploratory Data Analysis
│   └── model_trained_on_chosen_crops.ipynb
└── README.md
```

---

## Getting Started

### Prerequisites
- [Python 3.x](https://www.python.org/downloads/)
- [uv](https://docs.astral.sh/uv/getting-started/installation/#standalone-installer)
- [Node.js, npm](https://nodejs.org/en/download)

---

### 1. Backend Setup

From the root directory `crop-classifier`:

```bash
# Navigate to the backend directory
cd backend

# Sync uv environment and dependencies
uv sync

# Run virtual environment if not already
source .venv/Scripts/activate # Git Bash
.venv\Scripts\Activate.ps1 # Powershell

# Start the FastAPI dev server
uv run fastapi dev
```

API: `http://127.0.0.1:8000`.  
Docs: `http://127.0.0.1:8000/docs`.

---

### 2. Frontend Setup

In a new terminal window:

```bash
# Navigate to the frontend directory
cd frontend

# Install packages
npm i

# Start the Vite dev server
npm run dev
```

Client: `http://localhost:5173`.

---

## Environmental Parameters Used

| Parameter | Description | Source |
| :--- | :--- | :--- |
| **N** | Nitrogen content in soil | User Soil Test Input |
| **P** | Phosphorus content in soil | User Soil Test Input |
| **K** | Potassium content in soil | User Soil Test Input |
| **pH** | Soil pH level (acidity/alkalinity) | User Soil Test Input |
| **Temperature** | Local temperature (°C) | Weather API / Manual Input |
| **Humidity** | Relative air humidity (%) | Weather API / Manual Input |
| **Rainfall** | Seasonal precipitation (mm) | Weather API / Manual Input |
