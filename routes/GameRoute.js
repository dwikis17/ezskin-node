import express from 'express';
import GameController from "../controller/GameController.js";


const { fetchGames, fetchGameDetailByname } = GameController
const GameRoute = express.Router();

GameRoute.get('/', fetchGames )
GameRoute.get('/:name', fetchGameDetailByname )

export default GameRoute;