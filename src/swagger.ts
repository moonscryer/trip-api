import swaggerJsdoc from "swagger-jsdoc";
import { isProduction } from "./helpers";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Trip Expenses API",
      version: "1.0.0",
      description: "API for managing trips and their associated expenses",
    },
    servers: isProduction
      ? [
          {
            url: "https://trip-api-9ppg.onrender.com/api/v1",
            description: "Production server",
          },
        ]
      : [
          {
            url: "http://localhost:3000/api/v1",
            description: "Development server",
          },
        ],
    components: {
      schemas: {
        Trip: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            destination: { type: "string" },
            information: { type: "string" },
            expenses: {
              type: "array",
              items: { $ref: "#/components/schemas/Expense" },
            },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Expense: {
          type: "object",
          properties: {
            _id: { type: "string" },
            description: { type: "string" },
            amount: { type: "number", minimum: 0 },
            date: { type: "string", format: "date-time" },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
    tags: [
      { name: "Trips", description: "Trip management endpoints" },
      { name: "Expenses", description: "Expense management endpoints" },
    ],
  },
  apis: ["**/*.ts"], // Path to the API routes
};
export const specs = swaggerJsdoc(options);
