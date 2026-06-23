import { Router, Request, Response } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const activities = await Activity.find().populate('user', 'name email role').lean();
  res.json({ activities });
});

export default router;
