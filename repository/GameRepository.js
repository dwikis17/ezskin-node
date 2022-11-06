import {findAllGames} from "./Queries/GameQueries.js";
import Game from './../model/Game.js'
class GameRepository {
        static findAllGames = (searchKeyword) => {
            const query = findAllGames(searchKeyword)

            const game =  Game.aggregate(query)
            return game;

        }
}

export default GameRepository