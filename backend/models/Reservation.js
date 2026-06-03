import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
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
    date: {
      type: Date,
      required: [true, 'Please provide a reservation date'],
    },
    time: {
      type: String,
      required: [true, 'Please provide a reservation time'],
    },
    guests: {
      type: Number,
      required: [true, 'Please provide number of guests'],
      min: 1,
      max: 10,
    },
    requests: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    confirmationToken: {
      type: String,
    },
    notificationSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Reservation', reservationSchema);
