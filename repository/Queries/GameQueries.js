import mongoose from "mongoose";
import pkg from 'lodash'
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
                name:name
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
