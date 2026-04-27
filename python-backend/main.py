from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI(title="ReviveChain AI API")

# Aggressive CORS setup for the Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/triage")
async def triage_item(file: UploadFile = File(...)):
    # 1. Mock AI evaluation
    conditions = ["Pristine", "Damaged", "Broken"]
    condition = random.choice(conditions)
    
    # 2. Dynamic routing logic and scope 3 carbon logic
    if condition == "Pristine":
        destination = "Local Retail Partner (Restock)"
        carbon_saved_kg = 50.5
        action = "RESTOCK"
    elif condition == "Damaged":
        destination = "Regional Repair Center (Refurbish)"
        carbon_saved_kg = 35.0
        action = "REFURBISH"
    else:
        destination = "Local E-Waste Facility (Recycle)"
        carbon_saved_kg = 15.2
        action = "RECYCLE"
        
    return {
        "condition": condition,
        "destination": destination,
        "scope_3_carbon_saved_kg": carbon_saved_kg,
        "recommended_action": action,
        "item_filename": file.filename
    }

@app.get("/api/admin/metrics")
async def get_metrics():
    # Mock data for Admin Dashboard
    return {
        "total_items_processed": 1420,
        "total_carbon_saved_kg": 42500.5,
        "items_by_action": {
            "RESTOCK": 450,
            "REFURBISH": 620,
            "RECYCLE": 350
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
