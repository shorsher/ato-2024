import { Router } from "express";
import * as storageHandler from "../handlers/storage";

const router = Router();

router.get("/", async (_, res, next) => {
  try {
    res.send(await storageHandler.handleQueryStorage());
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.send(await storageHandler.handleSetStorage(req.body.value));
  } catch (err) {
    next(err);
  }
});

export default router;