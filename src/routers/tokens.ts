import { Router } from 'express';
import * as tokensHandler from '../handlers/tokens';  

const router = Router();

router.post('/mint', async (req, res, next) => {
  try {
    res.send(await tokensHandler.handleMintATOToken(req.body.amount, req.body.to));
  } catch (err) {
    next(err);
  }
});

export default router