import mongoose, { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'team_member'], required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]  // Reference to reviews submitted by the user
});

const User = models.User || model('User', userSchema);

export default User;
