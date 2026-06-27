import express from "express";
import cors from "cors";

import charactersRouter from "./routes/characters.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/characters", charactersRouter);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

export default app;
