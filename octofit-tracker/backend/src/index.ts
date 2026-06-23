import { createApp, startServer } from './server';
import { connectDatabase } from './config/database';

async function main() {
  try {
    await connectDatabase();
    const app = createApp();
    startServer(app);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();
