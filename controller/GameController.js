import lodash from 'lodash';
import Game from '../model/Game.js';
import GameService from '../service/GameService.js';

const { first } = lodash;
const { getAllGames, getGameDetailById } = GameService;
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

    try {
      const gameDetails = await getGameDetailById(params)
      res.status(200).send(gameDetails)
    } catch (error) {
      next(error)
    }
  };
}

export default GameController;
