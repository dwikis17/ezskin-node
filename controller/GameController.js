import Game from "../model/Game.js";

class GameController {
    static fetchGames = async (req, res ,next) => {
        const data = await Game.find({})

        res.json({data})
    }
}

export default GameController