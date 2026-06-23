import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8000;
const mongoUri = 'mongodb://127.0.0.1:27017/octofit';

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'OctoFit Tracker backend is running on port 8000.' });
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB at', mongoUri);
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
