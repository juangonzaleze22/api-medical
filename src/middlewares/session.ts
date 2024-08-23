import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";


const checkJwt = (req: Request, res: Response, next: NextFunction) => { 

    try {
        const jwtByUser = req.headers.authorization || null;
        const jwt  = jwtByUser?.split(" ").pop();
        const isUser = verifyToken(`${jwt}`);

        if(!isUser) { 
            res.status(401);
            res.send("jwt_not_valid")
        }else{ 
            next();
        }
    } catch (error) {
        res.status(400);
        res.send("session_not_valid")
    }

}

export {checkJwt}