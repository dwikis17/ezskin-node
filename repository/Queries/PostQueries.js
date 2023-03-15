import mongodb from 'mongodb'
const {ObjectId} = mongodb
export const findAll = () => {
    return [
        {
            $lookup:{
                from:'users',
                localField:'author',
                foreignField:'_id',
                as:'user'
            }
        },
        {
            $project:{
                author: {
                    $arrayElemAt : ["$user.name", 0]
                },
                title:1,
                _id:1
            }
        }
    ]
}

export const findById = (id) => {
    return [
      {  $match:{
            _id: ObjectId(id)
        }},
        {
            $lookup:{
                from:'users',
                localField:'author',
                foreignField:'_id',
                as:'author'
            }
        },
        {
            $project:{
                author: {$arrayElemAt: ['$author.name',0]},
                title:1,
                description:1
            }
        }
    ]
}

export const attachNewComment = (commentId,postId) => {
    return [

    ]
}