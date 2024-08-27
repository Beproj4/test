import mongoose, { Schema, model, models } from 'mongoose';

const reviewSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the product being reviewed
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },       // Reference to the user who submitted the review
  changes: {
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    image: { type: String },
  },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' } // Reference to the admin who reviewed the request
});

const Review = models.Review || model('Review', reviewSchema);

export default Review;
