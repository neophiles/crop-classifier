from fastapi import FastAPI
from sqlmodel import select
from sqlalchemy.orm import joinedload
from app.database import create_db_and_tables, SessionDep
from app.models import InputBase, Input, InputRead
from app.predictor import predict_crop
from app.optimizer import generate_crop_optimization

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
def predict(input_data: InputBase, session: SessionDep) -> InputRead:
  input = Input.model_validate(input_data)
  predicted_crop_label = predict_crop(input)

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