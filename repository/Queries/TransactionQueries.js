import lodash from "lodash"
const {isEmpty} = lodash

const handleSort = (sorter) => {
    if(isEmpty(sorter)){
        console.log('ssss')
        return []
    }
    const sortOrder = sorter.order === 'ascend' ? 1 : -1
    return [
        {
            $sort :{
                [sorter.columnKey]: sortOrder
            }
        }
    ]
}

const handleFilter = (filter) => {
    if(isEmpty(filter)){
        console.log(filter)
        return []
    }

    const match = {};
    for (const key in filter) {
      match[key] = { $in: filter[key] };
    }
    return [{ $match: match }];
}

export const fetchAllTransaction = (sorter, filter) => {
    return [
        {
            $sort:{
                _id:-1
            }
        },
        ...handleSort(sorter),
        ...handleFilter(filter)
    ]
}


export const fetchForChart = (month, year) => [
    {
        $addFields:{
            month: {$month:'$transactionDate'},
            year: {$year:'$transactionDate'}
        }
    },
    {
        $match:{
            month:month,
            year:year,
            status:'Done'
        }
    },
    {
        $group: {
           _id: "$game",
           price: { $sum: { $convert: { input: "$price", to: "double" } } }
        }
     },
     {
        $group: {
           _id: null,
           game: { $push: "$_id" },
           totalTransaction: { $push: "$price" }
        }
     }
]