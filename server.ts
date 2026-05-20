import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON
  app.use(express.json());

  // JSON Database file path for view counters
  const dbPath = path.join(process.cwd(), "views-db.json");

  // Helper functions to load and save view counts
  interface ViewsDB {
    [articleId: string]: number;
  }

  function loadViews(): ViewsDB {
    try {
      if (fs.existsSync(dbPath)) {
        const data = fs.readFileSync(dbPath, "utf-8");
        return JSON.parse(data);
      }
    } catch (error) {
      console.error("Error reading views database:", error);
    }
    // Return standard initial historic baselines if database file does not exist
    return {
      "tesouro-direto-2026": 2489,
      "regra-50-30-20-placar": 3812,
      "previdencia-pgbl-vgbl": 1754,
      "como-sair-das-dividas": 4122
    };
  }

  function saveViews(db: ViewsDB): void {
    try {
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
    } catch (error) {
      console.error("Error writing views database:", error);
    }
  }

  // --- API Routes ---

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Get views count for all articles
  app.get("/api/views", (req, res) => {
    const db = loadViews();
    res.json(db);
  });

  // Get views count for a single article
  app.get("/api/views/:articleId", (req, res) => {
    const { articleId } = req.params;
    const db = loadViews();
    const count = db[articleId] || 0;
    res.json({ articleId, views: count });
  });

  // Increment views count for a specific article
  app.post("/api/views/:articleId/increment", (req, res) => {
    const { articleId } = req.params;
    const db = loadViews();
    
    if (db[articleId] === undefined) {
      db[articleId] = 0;
    }
    
    db[articleId] += 1;
    saveViews(db);
    
    res.json({ articleId, views: db[articleId] });
  });

  // --- Vite Dev Middleware and Production Static Server ---

  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
});
