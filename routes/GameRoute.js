import express from 'express';
import GameController from "../controller/GameController.js";


const { fetchGames, fetchGameByName } = GameController
const GameRoute = express.Router();

GameRoute.get('/', fetchGames )
GameRoute.get('/:name', fetchGameByName )

export default GameRoute;