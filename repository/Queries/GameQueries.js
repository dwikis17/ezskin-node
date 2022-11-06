import mongoose from "mongoose";
import pkg from 'lodash'
const {isEmpty} = pkg;

const handleSearchKeyword = (searchKeyword) => {
    if(!isEmpty(searchKeyword)){
        return  [
            {$match:{
                name:new RegExp(searchKeyword, 'i')
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
                altName:1,
                image:1
            }
        },
        ...handleSearchKeyword(searchKeyword)
    ]

}