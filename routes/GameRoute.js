import express from 'express';
import GameController from "../controller/GameController.js";


const { fetchGames, fetchGameById } = GameController
const GameRoute = express.Router();

GameRoute.get('/', fetchGames )
GameRoute.get('/:name', fetchGameById )

export default GameRoute;