import express from "express";
import cors from "cors";

import "express-async-errors";

import BaseRouter from "./routes/api";

// **** Init express **** //

const app = express();

// **** Set basic express settings **** //

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// **** Add API routes **** //

// Add APIs
app.use("/api", BaseRouter);

export default app;
