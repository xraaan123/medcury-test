import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import taskRoutes from "./routes/tasks";
import authRoutes from "./routes/auth";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
