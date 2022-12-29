import {findAllGames, findGamesByName} from "./Queries/GameQueries.js";
import Game from './../model/Game.js'
import lodash from 'lodash'

const { first } = lodash
class GameRepository {
        static findAllGames = async (searchKeyword) => {
            const query = findAllGames(searchKeyword)
            return Game.aggregate(query)
        }

        static findGameDetailByName = async  (searchKeyword) => {
            const query = findGamesByName(searchKeyword)
            return first(await Game.aggregate(query))
        }
}

export default GameRepository