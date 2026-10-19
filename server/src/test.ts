import express, { type Express, type Request, type Response } from 'express';
import { prisma } from '../lib/prisma';

const app: Express = express();

const restaurant = await prisma.restaurant.findMany({
    where: {
        id: 3
    }
})

app.get('/', (req: Request, res: Response) => {
  res.send(restaurant);
});

app.listen(5432);