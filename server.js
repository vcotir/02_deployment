import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import helmet from "helmet";
import { initDatabase } from "./config/database-init.js";
import dreamsRouter from "./routes/dreams.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

/*
Challenge:
  1. Do npm install (the usual install)
  2. Do npm run dev
      - See the app start with nodemon
	3. Stop the server with CTRL+c
  4. Do 'npm ci --omit=dev'
  5. Do 'npm run dev' 
      - You should get an error telling you nodemon is not found.
  6. Do 'npm start'. 
      - The app should start as normal but without nodemon.
*/

// Security headers middleware
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static(join(__dirname, "public")));

// API Routes
app.use("/api/dreams", dreamsRouter);

// Initialize database then start server
initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
  });
