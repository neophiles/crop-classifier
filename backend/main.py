from fastapi import FastAPI
from sqlmodel import select
from sqlalchemy.orm import joinedload
from app.database import create_db_and_tables, SessionDep
from app.models import Input, InputRead, PredictionRequest
from app.predictor import predict_crop
from app.optimizer import generate_crop_optimization
from app.lookup_tables import CROP_NPK_TARGETS

app = FastAPI()

@app.on_event("startup")
def on_startup():
  create_db_and_tables()

@app.get("/")
def root():
  return {
    "message": "Welcome to Crop Classifier"
  }

@app.get("/health")
def health():
  return {
    "status": "ok"
  }

@app.post("/predict", response_model=InputRead)
def predict(input_data: PredictionRequest, session: SessionDep) -> InputRead:
  if input_data.nitrogen_level is not None:
    classifier_npk = {
      nutrient: sum(targets[nutrient] for targets in CROP_NPK_TARGETS.values()) / len(CROP_NPK_TARGETS)
      for nutrient in ("N", "P", "K")
    }
    input = Input(
      nitrogen=classifier_npk["N"],
      phosphorus=classifier_npk["P"],
      potassium=classifier_npk["K"],
      temperature_c=input_data.temperature_c,
      humidity_percent=input_data.humidity_percent,
      ph=input_data.ph,
      rainfall_mm=input_data.rainfall_mm,
      area_ha=input_data.area_ha,
    )
  else:
    input = Input(
      nitrogen=input_data.nitrogen,
      phosphorus=input_data.phosphorus,
      potassium=input_data.potassium,
      temperature_c=input_data.temperature_c,
      humidity_percent=input_data.humidity_percent,
      ph=input_data.ph,
      rainfall_mm=input_data.rainfall_mm,
      area_ha=input_data.area_ha,
    )

  predicted_crop_label = predict_crop(input)

  if input_data.nitrogen_level is not None:
    targets = CROP_NPK_TARGETS[predicted_crop_label.lower()]
    level_factors = {"Low": 0.25, "Medium": 0.5, "High": 1.0}
    input.nitrogen = targets["N"] * level_factors[input_data.nitrogen_level]
    input.phosphorus = targets["P"] * level_factors[input_data.phosphorus_level]
    input.potassium = targets["K"] * level_factors[input_data.potassium_level]

  output_metrics = generate_crop_optimization(input, predicted_crop_label)

  input.output = output_metrics
  session.add(input)
  session.commit()
  session.refresh(input)
  
  return input

@app.get("/predictions", response_model=list[InputRead])
def get_predictions(session: SessionDep) -> list[InputRead]:
  statement = select(Input).options(joinedload(Input.output))
  predictions = session.exec(statement).all()
  return predictions