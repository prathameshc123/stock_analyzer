import express from "express";
import dotenv from "dotenv";
import pool from "./config/db.js";               // DB pool
import userRoutes from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js"
import priceRoutes from "./routes/priceRoutes.js"
import holdingRoutes from "./routes/holdingRoutes.js"
import errorMiddleware from "./utils/errorMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json()); // parse JSON body

// Test DB connection at startup
pool.connect()
  .then((client) => {
    console.log("✅ Connected to PostgreSQL");
    client.release(); // release client back to pool
  })
  .catch((err) => {
    console.error("❌ Error connecting to PostgreSQL:", err);
  });

// Routes
app.use("/api/users", userRoutes);


app.use("/api/companies", companyRoutes);
app.use("/api/portfolio", portfolioRoutes);

app.use("/api/transactions",transactionRoutes);
app.use("/api/prices",priceRoutes);
app.use("/api/holdings",holdingRoutes);
// Error Middleware
app.use(errorMiddleware);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
