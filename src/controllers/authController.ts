import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken';
import User from "../models/User";
import { generateJwt } from "../middlewares/jwtMethods";

export const signUp = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const emailCheck = await User.findOne({email: email});
    if (emailCheck) {
        return res.status(403).json({error: "Couldn't create user"});
    }
    const user = new User(req.body);
    try {
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt);
        user.created_at = new Date();
        user.updated_at = new Date();
        user.save();
        return res.status(201).json({message: "succesful signup"});
    } catch (error) {
        return res.status(500).json({error: "Server error, please try again"});
    }
}

export const loginUser = async (req: Request, res: Response) => {
    // want to check that a user exists
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) return res.status(401).json({error: "check credentials"});
    // make sure that the passwords match -> password123 -> password123
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
        return res.status(403).json({error: "check credentials"});
    }
    // return a jwt.
    const token = await generateJwt(user._id, user.email);
    return res.status(200).json({token});
}

export const getCurrentUser = async (req: Request, res: Response) => {
    const token = req.header("Authorization");
    if (!token) return res.status(404).json({message: "Auth token was not found"});
    try {
        const token_info: Jwt | JwtPayload | string | any = jwt.verify(token, process.env.SECRET_KEY!)
        const user = await User.findOne({email: token_info.email});
        if (!user) return res.status(400).json({error: "user not found"});
        const {email, role, username, ...extraUserData} = user;
        return res.status(200).json({username, email, role});
    } catch (error) {
        return res.status(500).json({error: "couldn't get current user"});
    }
}