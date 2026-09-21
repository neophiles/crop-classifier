from scipy.optimize import linprog
from app.lookup_tables import CROP_NPK_TARGETS, YIELD_AND_PRICES, FERTILIZERS_NPK_RATIOS_AND_PRICES as FERTILIZERS
from app.models import Input, Output

def generate_crop_optimization(
  input_data: Input,
  predicted_crop: str,
) -> Output:
  crop_key = predicted_crop.lower()

  # 1. Task 1: Nutrient Deficit Calculation
  targets = CROP_NPK_TARGETS.get(crop_key)

  deficit_N = max(0, targets["N"] - input_data.nitrogen)
  deficit_P = max(0, targets["P"] - input_data.phosphorus)
  deficit_K = max(0, targets["K"] - input_data.potassium)

  # 2. Task 2: Linear Programming (Cost Minimization)[cite: 3]
  # Objective function: Minimize cost -> (price_urea * x1) + (price_dap * x2) + (price_mop * x3)
  minimized_cost = [
    FERTILIZERS["urea"]["price"],
    FERTILIZERS["dap"]["price"],
    FERTILIZERS["mop"]["price"]
  ]

  A_ub = [
    [-FERTILIZERS["urea"]["N_ratio"], -FERTILIZERS["dap"]["N_ratio"], -FERTILIZERS["mop"]["N_ratio"]],
    [-FERTILIZERS["urea"]["P_ratio"], -FERTILIZERS["dap"]["P_ratio"], -FERTILIZERS["mop"]["P_ratio"]],
    [-FERTILIZERS["urea"]["K_ratio"], -FERTILIZERS["dap"]["K_ratio"], -FERTILIZERS["mop"]["K_ratio"]]
  ]
  b_ub = [-deficit_N, -deficit_P, -deficit_K]

  # Non-negativity bounds for x1, x2, x3
  bounds = [(0, None), (0, None), (0, None)]

  # Solve linear programming problem
  result = linprog(minimized_cost, A_ub=A_ub, b_ub=b_ub, bounds=bounds, method='highs')

  print("Linear Programming Result:", result)

  optimal_cost_per_hectare = result.fun if result.success else 0.0

  # 3. Task 3: Financial Calculations
  financials = YIELD_AND_PRICES.get(crop_key)

  total_cost = optimal_cost_per_hectare * input_data.area_ha
  total_yield_mt = financials["baseline_yield_mt_ha"] * input_data.area_ha

  # Convert MT to kg for revenue calculation (1 MT = 1000 kg)
  total_yield_kg = total_yield_mt * 1000
  gross_revenue = total_yield_kg * financials["farmgate_price_php_kg"]
  
  net_profit = gross_revenue - total_cost

  return Output(
    recommended_crop=predicted_crop,
    deficit_n_kg_ha=deficit_N,
    deficit_p_kg_ha=deficit_P,
    deficit_k_kg_ha=deficit_K,
    urea_kg_ha=round(result.x[0], 2),
    dap_kg_ha=round(result.x[1], 2),
    mop_kg_ha=round(result.x[2], 2),
    total_cost_php=round(total_cost, 2),
    total_yield_mt=round(total_yield_mt, 4),
    gross_revenue_php=round(gross_revenue, 2),
    net_profit_php=round(net_profit, 2)
  )