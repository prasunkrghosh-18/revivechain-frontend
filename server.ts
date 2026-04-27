import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // -------------------------------------------------------------
  // MOCK API ENDPOINTS
  // -------------------------------------------------------------

  // 1. AI Pre-Triage Endpoint & Dynamic Routing Logic
  app.post('/api/triage', upload.single('file'), (req, res) => {
    // MOCK AI EVALUATION
    const conditions = ["Pristine", "Damaged", "Broken"];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    // MOCK DYNAMIC ROUTING & CARBON LOGIC
    let destination : string;
    let carbon_saved_kg : number;
    let action : string;
    
    if (condition === "Pristine") {
      destination = "Local Retail Partner (Restock)";
      carbon_saved_kg = 50.5;
      action = "RESTOCK";
    } else if (condition === "Damaged") {
      destination = "Regional Repair Center (Refurbish)";
      carbon_saved_kg = 35.0;
      action = "REFURBISH";
    } else {
      destination = "Local E-Waste Facility (Recycle)";
      carbon_saved_kg = 15.2;
      action = "RECYCLE";
    }
    
    res.json({
      condition,
      destination,
      scope_3_carbon_saved_kg: carbon_saved_kg,
      recommended_action: action,
      item_filename: req.file?.originalname || "unknown_image.jpg"
    });
  });

  // 2. Metrics logic for Admin Dashboard
  app.get('/api/admin/metrics', (req, res) => {
    res.json({
      total_items_processed: 1420,
      total_carbon_saved_kg: 42500.5,
      items_by_action: {
        RESTOCK: 450,
        REFURBISH: 620,
        RECYCLE: 350
      }
    });
  });

  // -------------------------------------------------------------
  // VITE MIDDLEWARE SETUP
  // -------------------------------------------------------------
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Determine __dirname strictly for ESM context in Node versions where it's missing.
    // In many setups process.cwd() is safe if launched from root.
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Support React Router fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
