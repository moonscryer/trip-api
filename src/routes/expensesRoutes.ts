import express from "express";
const router = express.Router();
import {
  createExpense,
  deleteExpense,
  getExpensesPerTrip,
  updateExpense,
} from "../controllers/expensesController";
/**
 * @swagger
 * /expenses/{tripId}:
 *   get:
 *     summary: Get all expenses for a trip
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of expenses for the trip
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 *   post:
 *     summary: Create a new expense for a trip
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: tripId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - amount
 *             properties:
 *               description:
 *                 type: string
 *               amount:
 *                 type: number
 *                 minimum: 0
 *     responses:
 *       201:
 *         description: Expense created successfully
 *
 * /expenses/{expenseId}:
 *   put:
 *     summary: Update an expense
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: expenseId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               amount:
 *                 type: number
 *                 minimum: 0
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *   delete:
 *     summary: Delete an expense
 *     tags: [Expenses]
 *     parameters:
 *       - in: path
 *         name: expenseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 */
router
  .get("/:tripId", getExpensesPerTrip)
  .post("/:tripId", createExpense)
  .put("/:expenseId", updateExpense)
  .delete("/:expenseId", deleteExpense);
export default router;
