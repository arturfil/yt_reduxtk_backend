import { Router } from 'express';
import { createGame, deleteGame, getAllGames, getGameById, updateGame } from '../controllers/gameController';
const router:Router = Router();

router.get("/", getAllGames);
router.get("/game/:id", getGameById);
router.post("/game", createGame);
router.put("/game/:id", updateGame);
router.delete("/game/:id", deleteGame);

export default router;