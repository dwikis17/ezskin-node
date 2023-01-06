import GameRepository from "../repository/GameRepository.js";
const { findAllGames, findGameDetailByName, 
    createNewGame, updateGameById, findGameById } =GameRepository
class GameService {
    static getAllGames = async (searchKeyword) => {
        return findAllGames(searchKeyword)
    }

    static getGameDetailByName = async (searchKeyword) => {
        return findGameDetailByName(searchKeyword)
    }

    static getGameDetailById = async (id) => {
        return findGameById(id)
    }

    static updateGame = async (payload, id) => {
        return updateGameById(payload, id);
    }

    static createNewGame = async (payload) => {
        const finalPayload = {
            ...payload,
            image: 'noImage.jpg'
        }
        return createNewGame(finalPayload)
    }
}

export default GameService;