import { prisma }from "./lib/client";
import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();

app.use(express.json());

const tenant = await prisma.tenant.findMany({
  select: {
    tenantName: true
  }
})

const menuItem = await prisma.menuItem.findMany({
  select: {
    menuName: true,
    isAvailable: true
  }
})

app.get('/', (req: Request, res: Response) => {
  res.send({tenant, menuItem});
});

app.post('/post', (req: Request, res: Response) => {

})

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});