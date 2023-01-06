import express from 'express';
import GameController from "../controller/GameController.js";
import multer from 'multer'

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
  createGames, uploadImage, updateGameById, fetchGameById } = GameController
const GameRoute = express.Router();

GameRoute.get('/', fetchGames )
GameRoute.post('/',createGames )
GameRoute.put('/:id', updateGameById )
GameRoute.put('/upload', upload.single('file'), uploadImage )
GameRoute.get('/:name', fetchGameDetailByname )
GameRoute.get('/game-detail/:id', fetchGameById )
export default GameRoute;