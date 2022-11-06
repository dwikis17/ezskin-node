import Game from "../model/Game.js";
import GameService from "../service/GameService.js";

const { getAllGames } = GameService
class GameController {
    static fetchGames = async (req, res ,next) => {
        console.log(req.query,'query')
        console.log(req.params, 'parasm')
        const {searchKeyword} = req.query
        try{
            const data = await getAllGames(searchKeyword)
            res.status(200).send(data)
        }catch (e){
            next(e)
        }
    }

    static fetchGameById = async (req, res, next) => {

        const gameDetails = await Game.find({altName:req.params.name})

        res.json(gameDetails[0]);
    }
}

export default GameController;