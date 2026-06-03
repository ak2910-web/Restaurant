import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: [true, 'Please provide a message'],
    },
    responded: {
      type: Boolean,
      default: false,
    },
    respondedAt: Date,
    response: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Contact', contactSchema);
