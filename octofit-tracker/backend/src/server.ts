import express, { Request, Response, Express } from 'express';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const host = '0.0.0.0';

export const getApiUrl = (): string => {
  if (!codespaceName) {
    return `http://localhost:${port}`;
  }

  return `https://${codespaceName}-8000.app.github.dev`;
};

export function createApp(): Express {
  const app = express();

  app.use(express.json());

  app.get('/', (_req: Request, res: Response) => {
    res.json({
      message: 'OctoFit Tracker backend is running.',
      apiUrl: getApiUrl()
    });
  });

  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/users', usersRouter);
  app.use('/api/teams', teamsRouter);
  app.use('/api/activities', activitiesRouter);
  app.use('/api/leaderboard', leaderboardRouter);
  app.use('/api/workouts', workoutsRouter);

  return app;
}

export function startServer(app: Express): void {
  app.listen(port, host, () => {
    console.log('API base URL:', getApiUrl());
    console.log(`Server listening on http://localhost:${port}`);
  });
}
