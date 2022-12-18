import lodash from 'lodash';
import Game from '../model/Game.js';
import GameService from '../service/GameService.js';
import { findAllGames, findGamesByName } from '../repository/Queries/GameQueries.js';

const { first } = lodash;
const { getAllGames } = GameService;
class GameController {
  static fetchGames = async (req, res, next) => {
    const {searchKeyword} = req.query
    try {
      const query = findAllGames(searchKeyword)
      const data = await Game.aggregate(query)
      res.status(200).send(data);
    } catch (error) {
      next(error);
    }
  };

  static fetchGameById = async (req, res, next) => {  
    const {name} = req.params;
    const params = name.replace("-", " ")
    
    const query = findGamesByName(params);

    const gameDetails = await Game.aggregate(query);

    res.json(gameDetails[0]);
  };
}

export default GameController;
