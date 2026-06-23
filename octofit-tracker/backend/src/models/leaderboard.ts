import { Schema, model, Document, Types } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  team: Types.ObjectId;
  rank: number;
  points: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  rank: { type: Number, required: true },
  points: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() }
});

export default model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
