import { Request, Response } from "express";
import { getRepository } from "typeorm";

import User from "../entities/User";

export interface SignUp {
  email: string;
  password: string;
  confirmPassword: string
}

export async function findUserById (email: string) {
  const users = await getRepository(User).findOne({
    where: { 
      email: email
    }
  });
  console.log(users);
  return users;
}

export async function newUser ({email, password, confirmPassword}: SignUp) {
  const users = await getRepository(User).find({
    select: ["id", "email"]
  });
  
  return users;
}
