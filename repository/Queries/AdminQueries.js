export const findAllAdmin = () => {
   return [
    {
        $project:{
            email:1,
            name:1
        }
    },
    {
        $sort:{
            _id:-1
        }
    }
   ]
}