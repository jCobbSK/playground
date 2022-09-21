import { getWords } from "../services/wordService";
import { Router } from "express";

const apiRouter = Router();

apiRouter.get("/words", (req, res) => {
  res.json(getWords());
});

// Add api routes

export default apiRouter;
