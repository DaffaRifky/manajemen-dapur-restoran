import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { prisma, supabaseAdmin, supabaseAnon } from "../lib/client";

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const authRouter = Router();

// signup logic
const signupSchema = z.object({
  restaurantName: z.string().min(2).max(100),
  username: z.string().min(3).max(30),
  email: z.email(),
  password: z.string().min(8),
});

authRouter.post("/signup", async (req: Request, res: Response) => {
  const parsed = signupSchema.safeParse(req.body);

  if (!parsed.success) return res.status(400).json({ fieldErrors: z.flattenError(parsed.error) });
  const { restaurantName, username, email, password } = parsed.data;
  const normalizedUsername = username.trim().toLowerCase();
  const normalizedEmail = email.trim().toLowerCase();

  const [existingRestaurant, existingUser, existingEmail] = await Promise.all([
    prisma.restaurant.findUnique({ where: { name: restaurantName.trim() } }),
    prisma.user.findUnique({ where: { username: normalizedUsername } }),
    prisma.user.findUnique({ where: { email: normalizedEmail } }),
  ]);

  const fieldErrors: Record<string, string> = {};

  if (existingRestaurant) fieldErrors.restaurantName = "Restaurant name is already taken";
  if (existingUser) fieldErrors.username = "Username is already taken";
  if (existingEmail) fieldErrors.email = "Email is already registered";

  if (Object.keys(fieldErrors).length > 0) {
    return res.status(409).json({ fieldErrors });
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: normalizedEmail,
    password,
    email_confirm: true,
  });

  if (error) {
    console.error("Supabase signup failed", error);
    return res.status(400).json({ message: "Could not create account." });
  }

  if (!data.user) {
    return res.status(400).json({ message: "Could not create account." });
  }

  // The Auth user and Prisma records use separate systems, so compensate if provisioning fails.
  try {
    const slug = `${slugify(restaurantName)}-${Math.random().toString(36).slice(2, 6)}`;

    const restaurant = await prisma.restaurant.create({
      data: {
        name: restaurantName,
        slug,
        users: {
          create: {
            id: data.user.id,
            username: normalizedUsername,
            email: normalizedEmail,
            role: "Owner" },
        },
      },
    });

    return res.status(201).json({ restaurantId: restaurant.id });

  } catch (e) {
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(data.user.id);

    if (deleteError) {
      console.error("Failed to remove Auth user after restaurant provisioning failed", deleteError);
    }

    console.error("Failed to provision restaurant signup", e);

    return res.status(500).json({ message: "Signup failed" });
  }
});

// login logic
const loginSchema = z.object({
  identifier: z.string().min(1),
  password: z.string().min(1),
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Username/email and password are required." });
  }

  const identifier = parsed.data.identifier.trim();
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: identifier.toLowerCase() },
        { email: identifier.toLowerCase() },
      ],
    },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid username/email or password." });
  }

  const { data, error } = await supabaseAnon.auth.signInWithPassword({
    email: user.email,
    password: parsed.data.password,
  });

  if (error || !data.session) {
    return res.status(401).json({ message: "Invalid username/email or password." });
  }

  if (data.session) {
    console.log("Login successful for user:", user.username);
  }

  return res.json({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  });
});