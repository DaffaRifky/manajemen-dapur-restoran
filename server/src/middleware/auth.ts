import type { Request, Response, NextFunction } from "express";
import { prisma, supabaseAdmin } from "../lib/client";

declare global {
  namespace Express {
    interface Request {
      auth?: { userId: string; restaurantId: number; role: "Owner" | "Waiter" | "Chef" | "Cashier" };
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Missing token" });

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) return res.status(401).json({ message: "Invalid token" });

  const user = await prisma.user.findUnique({ where: { id: data.user.id } });
  if (!user) return res.status(403).json({ message: "No restaurant for this user" });

  req.auth = { userId: user.id, restaurantId: user.restaurantId, role: user.role };
  next();
}