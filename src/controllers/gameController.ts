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

export const getGameById = async (req: Request, res: Response) => {
    const { id} = req.params;
    const singleGame = await Game.findById({_id: id});
    try {
        return res.status(200).json(singleGame);
    } catch (error) {
        return res.status(500).json({err: error});
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

export const updateGame = async (req: Request, res: Response) => {
    const { id } = req.params;
    const gameToUpdate = await Game.findByIdAndUpdate(id, req.body, {new: true})
    try {
        return res.status(202).json(gameToUpdate);
    } catch (error) {
        return res.status(500).json({msg: "Couldn't update the game"});
    }
}

export const deleteGame = async (req: Request, res: Response) => {
    const { id } = req.params;
    await Game.findByIdAndDelete(id);
    try {
        return res.status(203).json({message: "deleted successfully"});
    } catch (error) {
        return res.status(500).json({message: "couldn't delete the game"})
    }
}














