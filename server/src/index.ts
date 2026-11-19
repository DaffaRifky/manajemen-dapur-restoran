import express, {  type Request, type Response } from "express";
import { prisma} from './lib/client';
import { authRouter } from "./routes/auth";

const app = express();

const PORT = 5000;
app.use(express.json());
app.use("/api/auth", authRouter);

app.get("/" , async (req: Request, res: Response) => {
  const user = await prisma.user.findMany();
  const restaurant = await prisma.restaurant.findMany();
  res.json({ user, restaurant });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});