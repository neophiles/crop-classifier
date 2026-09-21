from pathlib import Path
import joblib
from app.models import Input

MODEL_PATH = Path(__file__).resolve().parents[2] / "model" / "random_forest.pkl"
MODEL = joblib.load(MODEL_PATH)

def predict_crop(input_data: Input) -> str:
    features = [[
        input_data.nitrogen,
        input_data.phosphorus,
        input_data.potassium,
        input_data.temperature_c,
        input_data.humidity_percent,
        input_data.ph,
        input_data.rainfall_mm,
    ]]

    return str(MODEL.predict(features)[0])