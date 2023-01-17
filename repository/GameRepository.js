import {findAllGames, findGamesByName} from "./Queries/GameQueries.js";
import Game from './../model/Game.js'
import lodash from 'lodash'
import mongodb from 'mongodb'

const {ObjectId} = mongodb
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

        static findGameById = async (id) => {
            return Game.findOne({_id:ObjectId(id)})
        }

        static createNewGame = async ( payload ) => {
            return Game.create(payload)
        }

        static updateGameById = async (payload, _id) => {
            return Game.updateOne({_id: ObjectId(_id)}, {
                $set:{
                    name: payload.name,
                    description: payload.description,
                    vouchers: payload.vouchers
                }
            })
        }

        static updateGameImages = async (id, type, image, originalname) => {
            return Game.updateOne({_id: ObjectId(id)}, {
                $set:{
                    [type] : image,
                    [`${type}OriginalName`] : originalname
                }
            })
        }
}

export default GameRepository   