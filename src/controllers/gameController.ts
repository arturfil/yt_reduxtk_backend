import { Request, Response } from "express";
import Game from "../models/Game";

export const getAllGames = async (req: Request, res: Response) => {
    const games = await Game.find();
    try {
        return res.status(200).json(games);
    } catch (error) {
        return res.status(500).json({err: error})
    }
}

export const createGame = async (req: Request, res: Response) => {
    const gameToCreate = await Game.create(req.body);
    try {
        return res.status(201).json(gameToCreate);
    } catch (error) {
        return res.status(500).json({msg: "Couldn't create the game"})
    }
}