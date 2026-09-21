from sqlmodel import SQLModel, Field, Relationship
from uuid import UUID, uuid4


# BASE MODELS

class InputBase(SQLModel):
  nitrogen: int
  phosphorus: int
  potassium: int
  temperature_c: float
  humidity_percent: float
  ph: float
  rainfall_mm: float
  area_ha: float

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