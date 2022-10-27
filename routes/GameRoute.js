import express from 'express';
import GameController from "../controller/GameController.js";


const { fetchGames, fetchGameById } = GameController
const GameRoute = express.Router();

GameRoute.get('/', fetchGames )
GameRoute.get('/:id', fetchGameById )

export default GameRoute;