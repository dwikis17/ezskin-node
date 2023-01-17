
import Game from '../model/Game.js';
import GameService from '../service/GameService.js';
import fs from 'fs'
const { getAllGames, getGameDetailByName, createNewGame 
  , updateGame, getGameDetailById, updateGameImage} = GameService;
class GameController {
  static fetchGames = async (req, res, next) => {
    const { searchKeyword } = req.query

    try {
      const gameList = await getAllGames(searchKeyword);
      res.status(200).send(gameList);
    } catch (error) {
      next(error);
    }
  };

  static fetchGameDetailByname = async (req, res, next) => {  
    const { name } = req.params;
    const params = name.replace("-", " ")
    console.log(params)
    try {
      const gameDetails = await getGameDetailByName(params)
      res.status(200).send(gameDetails)
    } catch (error) {
      next(error)
    }
  };

  static fetchGameById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const gameDetails = await getGameDetailById(id)
      res.status(200).send(gameDetails)
    } catch (error) {
      next(error)
    }
  }

  static createGames = async (req, res, next) => {
    try{
      const createdGame = await createNewGame(req.body)
      res.status(201).send(createdGame)
    } catch(error){
      next(error)
    }
    
  }

  static uploadImage = async (req,res,next) => {
    const {id, type} = req.params
    const {filename, originalname} = req.file 
    try{
      const updatedImage = await updateGameImage(id, type, filename, originalname)
      res.status(200).json({message:"UPLOAD IMAGE SUCCESS"})
    }catch(error){
      next(error)
    }
   
  }

  static updateGameById = async (req, res, next) => {
    try{
      const updatedData = await updateGame(req.body, req.params)
      res.status(200).send(updatedData)
    }catch(error){
      next(error)
    }
  }
}

export default GameController;
