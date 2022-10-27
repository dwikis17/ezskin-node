import Game from "../model/Game.js";

class GameController {
    static fetchGames = async (req, res ,next) => {
        const data = await Game.find({})

        res.json({data})
    }

    static fetchGameById = async (req, res, next) => {
        const gameDetails = await Game.find({_id:req.params.id})
        res.json(gameDetails[0]);
    }
}

export default GameController;