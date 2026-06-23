import { connectDatabase, disconnectDatabase } from '../config/database';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Workout from '../models/workout';

/**
 * Seed the octofit_db database with test data.
 */
async function seed() {
  await connectDatabase();
  console.log('Connected to MongoDB at', mongoUri);

  await User.deleteMany({});
  await Team.deleteMany({});
  await Activity.deleteMany({});
  await Leaderboard.deleteMany({});
  await Workout.deleteMany({});

  const users = await User.create([
    { name: 'Avery Johnson', email: 'avery.johnson@example.com', role: 'athlete' },
    { name: 'Jordan Kim', email: 'jordan.kim@example.com', role: 'coach' },
    { name: 'Mia Patel', email: 'mia.patel@example.com', role: 'athlete' }
  ]);

  const teams = await Team.create([
    { name: 'Octo Sprinters', description: 'High-energy running team', members: [users[0]._id, users[2]._id] },
    { name: 'Fitness Phantoms', description: 'Strength and endurance squad', members: [users[1]._id] }
  ]);

  await Activity.create([
    { user: users[0]._id, type: 'run', durationMinutes: 35, caloriesBurned: 420 },
    { user: users[0]._id, type: 'cycling', durationMinutes: 45, caloriesBurned: 520 },
    { user: users[2]._id, type: 'yoga', durationMinutes: 50, caloriesBurned: 210 }
  ]);

  await Leaderboard.create([
    { team: teams[0]._id, rank: 1, points: 1420 },
    { team: teams[1]._id, rank: 2, points: 1180 }
  ]);

  await Workout.create([
    { name: 'Cardio Blast', description: 'A fast-paced circuit for cardio endurance.', durationMinutes: 30, difficulty: 'intermediate' },
    { name: 'Strength Flow', description: 'Resistance training with a focus on form and tempo.', durationMinutes: 45, difficulty: 'advanced' },
    { name: 'Recovery Stretch', description: 'Mobility and flexibility session for post-workout recovery.', durationMinutes: 25, difficulty: 'beginner' }
  ]);

  console.log('Seed the octofit_db database with test data: completed successfully');
  await disconnectDatabase();
}

seed().catch((error) => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
