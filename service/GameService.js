import GameRepository from "../repository/GameRepository.js";
const { findAllGames, findGameDetailByName } =GameRepository
class GameService {
    static getAllGames = async (searchKeyword) => {
        console.log('msk game service')
        return findAllGames(searchKeyword)
    }

    static getGameDetailById = async (searchKeyword) => {
        return findGameDetailByName(searchKeyword)
    }
}

export default GameService;