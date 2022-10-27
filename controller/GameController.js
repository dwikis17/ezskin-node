import Game from "../model/Game.js";

class GameController {
    static fetchGames = async (req, res ,next) => {
        const data = await Game.find({})

        res.json({data})
    }

    static fetchGameByName= async (req, res, next) => {
        const gameDetails = await Game.find({altName:req.params.name})
        console.log(gameDetails)
        res.json(gameDetails[0]);
    }
}

export default GameController;