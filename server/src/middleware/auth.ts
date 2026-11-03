import type { Request, Response, NextFunction } from 'express'
import { supabaseAdmin, prisma } from '../lib/client'
import type { Role, User } from '../../generated/prisma/client'

declare global { namespace Express { interface Request { me?: User } } }

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  const { data, error } = await supabaseAdmin.auth.getUser(token)
  if (error || !data.user) return res.status(401).json({ error: 'Unauthorized' })

  const me = await prisma.user.findUnique({ where: { id: data.user.id } })
  if (!me) return res.status(403).json({ error: 'No profile' })

  req.me = me
  next()
}

export const requireRole = (...roles: Role[]) =>
  (req: Request, res: Response, next: NextFunction) =>
    roles.includes(req.me!.role) ? next() : res.status(403).json({ error: 'Forbidden' })