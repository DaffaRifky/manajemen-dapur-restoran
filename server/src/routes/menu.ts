import express  from "express";
import { prisma } from "../lib/client";

const router = express.Router();

router.post('/', async (req, res) => {
  const { categoryName } = req.body;
  const newCategory = await prisma.menuCategory.create({ data: { categoryName } });
  res.status(201).json(newCategory);
});