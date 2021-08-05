import { Request, Response } from "express";

import * as userService from "../services/userService";

export async function signUp (req: Request, res: Response) {
  const {email, password, confirmPassword}: userService.SignUp = req.body;
  if(!email || !password || !confirmPassword) return res.sendStatus(400);

  const user = await userService.findUserById(email);
  if(user) return res.sendStatus(409);
  return res.sendStatus(200);
  const userInfo = {
    email,
    password,
    confirmPassword
  }
  const created = await userService.newUser(userInfo);
  if(!created)return res.sendStatus(400);

  res.sendStatus(201);
}

export async function singIn (req: Request, res: Response) {

}