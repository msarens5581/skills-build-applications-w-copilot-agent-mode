import { Router, Request, Response } from 'express';
import Workout from '../models/workout';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const workouts = await Workout.find().lean();
  res.json({ workouts });
});

export default router;
