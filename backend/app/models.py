from typing import Literal
from pydantic import model_validator
from sqlmodel import SQLModel, Field, Relationship
from uuid import UUID, uuid4


# BASE MODELS

class InputBase(SQLModel):
  nitrogen: float
  phosphorus: float
  potassium: float
  temperature_c: float
  humidity_percent: float
  ph: float
  rainfall_mm: float
  area_ha: float

class PredictionRequest(SQLModel):
  nitrogen: float | None = None
  phosphorus: float | None = None
  potassium: float | None = None
  nitrogen_level: Literal["Low", "Medium", "High"] | None = None
  phosphorus_level: Literal["Low", "Medium", "High"] | None = None
  potassium_level: Literal["Low", "Medium", "High"] | None = None
  temperature_c: float
  humidity_percent: float
  ph: float
  rainfall_mm: float
  area_ha: float

  @model_validator(mode="after")
  def validate_npk_input(self):
    levels = (self.nitrogen_level, self.phosphorus_level, self.potassium_level)
    numeric_values = (self.nitrogen, self.phosphorus, self.potassium)

    if any(level is not None for level in levels):
      if not all(level is not None for level in levels):
        raise ValueError("Provide Low, Medium, or High for all three NPK levels.")
    elif not all(value is not None for value in numeric_values):
      raise ValueError("Provide either all three numeric NPK values or all three NPK levels.")

    return self

class OutputBase(SQLModel):
  recommended_crop: str
  
  deficit_n_kg_ha: float
  deficit_p_kg_ha: float
  deficit_k_kg_ha: float

  urea_kg_ha: float
  dap_kg_ha: float
  mop_kg_ha: float

  total_cost_php: float
  total_yield_mt: float
  gross_revenue_php: float
  net_profit_php: float


# READ DTOs

class OutputRead(OutputBase):
  id: UUID

class InputRead(InputBase):
  id: UUID
  output_id: UUID | None
  output: OutputRead | None = None


# ACTUAL DATABASE TABLES

class Output(OutputBase, table=True):
  id: UUID = Field(default_factory=uuid4, primary_key=True)
  input: "Input" = Relationship(back_populates="output")

class Input(InputBase, table=True):
  id: UUID = Field(default_factory=uuid4, primary_key=True)
  output_id: UUID | None = Field(default=None, unique=True, foreign_key="output.id")
  output: Output | None = Relationship(back_populates="input")