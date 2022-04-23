import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";

const app:Application = express();

// middlewares
app.use(express.json());
app.use(cors())

// here we'll import routes;
import gameRoute from './routes/gameRoute';

// here we will declare the routes paths
app.use("/api/games", gameRoute);

export {app}
