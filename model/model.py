from pathlib import Path
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler


REPOSITORY_ROOT = Path(__file__).resolve().parent.parent
DATA_PATH = REPOSITORY_ROOT / "data" / "indonesia_dataset.csv"
FALLBACK_DATA_PATH = REPOSITORY_ROOT / "notebooks" / "data" / "indonesia_dataset.csv"
MODEL_PATH = Path(__file__).resolve().parent / "random_forest.pkl"


# These are crops in the lookup tables
SELECTED_CROPS = [
  "rice",
  "maize",
  "cassava",
  "brinjal",
  "mungbean",
  "sugarcane",
]

FEATURE_COLUMNS = [
  "N",
  "P",
  "K",
  "temperature",
  "humidity",
  "ph",
  "rainfall",
]


def train_model() -> Pipeline:
  data_path = DATA_PATH if DATA_PATH.exists() else FALLBACK_DATA_PATH
  if not data_path.exists():
    raise FileNotFoundError(f"Dataset not found at {DATA_PATH}")

  data = pd.read_csv(data_path)
  missing_columns = set(FEATURE_COLUMNS + ["label"]) - set(data.columns)
  if missing_columns:
    raise ValueError(f"Dataset is missing columns: {sorted(missing_columns)}")

  # missing_crops = sorted(set(SELECTED_CROPS) - set(data["label"].unique()))
  # if missing_crops:
  #   raise ValueError(
  #       f"Cannot train the requested model. Missing crops in the dataset: {missing_crops}"
  #   )

  selected_data = data[data["label"].isin(SELECTED_CROPS)]
  pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("model", RandomForestClassifier(random_state=42)),
  ])
  pipeline.fit(selected_data[FEATURE_COLUMNS], selected_data["label"])
  return pipeline


def main() -> None:
  model = train_model()
  joblib.dump(model, MODEL_PATH)
  print(f"Model exported to {MODEL_PATH}")


if __name__ == "__main__":
  main()