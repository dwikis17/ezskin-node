import GameRepository from "../repository/GameRepository.js";
const { findAllGames, findGameDetailByName, 
    createNewGame, updateGameById, findGameById, updateGameImages } =GameRepository
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

    static updateGameImage = async (id, type, image, originalname) => {
        return updateGameImages(id,type, image,originalname)
    }
}

export default GameService;