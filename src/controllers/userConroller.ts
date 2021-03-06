import { NextFunction, Request, Response } from "express";

import * as userService from "../services/userService";

export async function signUp (req: Request, res: Response, next: NextFunction) {
  const {email, password, confirmPassword}: userService.SignUp = req.body;
  if(!email || !password || !confirmPassword) return res.sendStatus(400);

  try{
      const user = await userService.findUserByEmail(email);
      if(user) return res.sendStatus(409);
    
      const userInfo = {
        email,
        password,
        confirmPassword
      }
      const created = await userService.newUser(userInfo);
      if(!created)return res.sendStatus(400);
    
      res.sendStatus(201);
  }
  catch(e){
    next(e);
  }
}

export async function singIn (req: Request, res: Response, next: NextFunction) {
  const { email, password }: { email: string; password: string} = req.body;
  if(!email || !password) return res.sendStatus(400);

  try{
    const validateUser = await userService.findUserByEmail(email);
    if(!validateUser) return res.sendStatus(400);
  
    const validatePassword = await userService.verifyPassword(validateUser.password, password)
    if(!validatePassword) return res.sendStatus(401);
  
    const token = await userService.login(validateUser.id);
    res.send(token);
  }
  catch(e){
    next(e);
  }
}