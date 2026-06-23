import { Router, Request, Response } from 'express';
import Team from '../models/team';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const teams = await Team.find().populate('members', 'name email role').lean();
  res.json({ teams });
});

export default router;
