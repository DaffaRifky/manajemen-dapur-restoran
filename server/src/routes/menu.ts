import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { prisma, supabaseAdmin, supabaseAnon } from "../lib/client";
import { requireAuth } from "../middleware/auth";

export const authRouter = Router();

authRouter.post("/menu-chategory", async (req: Request, res: Response) => {
    const newMenuChategory
})

authRouter.post("/menu-item", async (req: Request, res: Response) => {

})
