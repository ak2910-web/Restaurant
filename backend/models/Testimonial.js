import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Please provide testimonial text'],
    },
    author: {
      type: String,
      required: [true, 'Please provide author name'],
    },
    location: {
      type: String,
      required: [true, 'Please provide location'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    email: {
      type: String,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    approved: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Testimonial', testimonialSchema);
