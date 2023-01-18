import express from 'express';
import GameController from "../controller/GameController.js";
import multer from 'multer'
import { verifyToken } from '../Middleware/Verify.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg') //Appending .jpg
    }
  })
  
  const upload = multer({ storage: storage });

const { fetchGames, fetchGameDetailByname, 
  createGames, uploadImage, updateGameById, fetchGameById, fetchGameForAdmin , updateGameStatus} = GameController
const GameRoute = express.Router();

GameRoute.get('/', fetchGames )
GameRoute.get('/games',verifyToken, fetchGameForAdmin )
GameRoute.put('/update-status',verifyToken, updateGameStatus )
GameRoute.post('/',createGames )
GameRoute.put('/:id', updateGameById )
GameRoute.put('/image/upload/:id/:type', upload.single('file'), uploadImage )
GameRoute.get('/:name', fetchGameDetailByname )
GameRoute.get('/game-detail/:id', fetchGameById )
export default GameRoute;