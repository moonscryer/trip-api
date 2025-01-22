import { Expense, Trip } from "../models/TripModel";
import { Request, Response } from "express";

type createTypes = {
  description: string;
  amount: number;
};

export const getExpensesPerTrip = async (req: Request, res: Response) => {
  try {
    const { tripId } = req.params;
    const trips = await Trip.findById(tripId).populate("expenses");
    if (!trips) {
      res.status(404).json({ message: "Trip not found" });
      return;
    }
    const expenses = trips.expenses;
    res.status(200).json(expenses);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const createExpense = async (req: Request, res: Response) => {
  try {
    // description, amount in body
    const { tripId } = req.params;
    const { description, amount }: createTypes = req.body;

    const expense = await Expense.create({ description, amount });
    await Trip.findByIdAndUpdate(tripId, {
      $push: { expenses: expense._id },
    });

    res.status(201).json(expense);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.params;
    const { description, amount }: createTypes = req.body;
    const expense = await Expense.findByIdAndUpdate(
      expenseId,
      { description, amount },
      { new: true }
    );
    res.status(200).json(expense);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findByIdAndDelete(expenseId);
    const trip = await Trip.find({ expenses: expenseId });
    await Trip.findByIdAndUpdate(trip[0]._id, {
      $pull: { expenses: expenseId },
    });
    res.status(200).json(expense);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
