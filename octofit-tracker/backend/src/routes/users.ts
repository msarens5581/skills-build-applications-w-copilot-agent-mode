import { Router, Request, Response } from 'express';
import User from '../models/user';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const users = await User.find().select('name email role joinedAt').lean();
  res.json({ users });
});

export default router;
