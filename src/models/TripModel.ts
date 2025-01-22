import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const TripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  destination: {
    type: String,
    required: true,
    trim: true,
  },
  information: {
    type: String,
    required: true,
    trim: true,
  },
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Trip = mongoose.model("Trip", TripSchema);
const Expense = mongoose.model("Expense", ExpenseSchema);

export { Trip, Expense };
