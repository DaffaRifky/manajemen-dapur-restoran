import express, { type Express, type Request, type Response } from 'express';
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import cors from 'cors';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });

const app: Express = express();

const restaurant = await prisma.restaurant.findMany({
    select: {
        name: true
    }
})

app.get('/', (req: Request, res: Response) => {
  res.send(restaurant);
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});