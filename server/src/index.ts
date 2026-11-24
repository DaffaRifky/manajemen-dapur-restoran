import express, {  type Request, type Response } from "express";
import { authRouter } from "./routes/auth";

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});