import express, { type Express, type Request, type Response } from 'express';
import { prisma } from '../lib/prisma';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import cors from 'cors';

const app: Express = express();

const restaurant = await prisma.restaurant.findMany({
    where: {
        id: 3
    },
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