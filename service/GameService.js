import GameRepository from "../repository/GameRepository.js";
const {findAllGames} =GameRepository
class GameService {
    static getAllGames = async (searchKeyword) => {
        const gameData = await findAllGames(searchKeyword)
        return gameData
    }
}

export default GameService;