import mongoose from "mongoose";
import pkg from 'lodash'
import mongodb from 'mongodb'

const {ObjectId} = mongodb
const {isEmpty} = pkg;


const handleSearchGames = (searchKeyword) => {
    if(!isEmpty(searchKeyword)){
        return [
            {
                $match:{
                    name:{$regex:`${searchKeyword}`, $options:'i'}
                }
            }
        ]
    }
    return []
}
export const findAllGames = (searchKeyword) => {
    return [
        {
            $sort: {
                _id:-1
            }
        },
        {
            $project:{
                name:1,
                image:1
            }
        },
        ...handleSearchGames(searchKeyword)
    ]
}

export const findGamesByName = (name) => {
    return [
        {
            $match:{
                $or: [
                    {name:name},
                ]
            }
        },
        {
            $lookup:{
                from:'denomination',
                localField:'vouchers',
                foreignField:'_id',
                as:'vouchers'
            }
            
        }
    ]
}
