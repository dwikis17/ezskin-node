import jwt, { decode } from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
    console.log(req.headers)
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1]

    if(token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
        if(err) return res.sendStatus(403)
        req.email = decodedToken.email
        next();
    })
}