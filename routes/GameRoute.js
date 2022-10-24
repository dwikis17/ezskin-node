import express from 'express';
import GameController from "../controller/GameController.js";


const { fetchGames } = GameController
const GameRoute = express.Router();

GameRoute.get('/', fetchGames )

export default GameRoute;