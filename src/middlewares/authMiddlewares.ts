import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService"

export default async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization'];
    const token = authorization.split("Bearer ")[1];
    
    if(!token) return res.sendStatus(401);

    const validSession = await authService.validateSession(token);
    if (!validSession) {
      return res.sendStatus(401);
    }
    else{
      res.locals.id = validSession.userId;  
      next();
    }
  }