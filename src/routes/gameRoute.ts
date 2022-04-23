import { Router } from 'express';
import { createGame, getAllGames } from '../controllers/gameController';
const router:Router = Router();

router.get("/", getAllGames);
router.post("/game", createGame);

export default router;