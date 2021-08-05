import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../entities/User";
import { userSchema } from "../schemas/userSchemas";
import Session from "../entities/Session";

export interface SignUp extends SignIn{
  confirmPassword: string
}

export interface SignIn {
  email: string;
  password: string;
}

export async function findUserByEmail (email: string) {
  const user = await getRepository(User).findOne({
    where: { 
      email: email
    }
  });
  return user;
}

export async function newUser ({email, password, confirmPassword}: SignUp) {
   const value = userSchema.validate({
    email: email,
    password: password,
    repeat_password: confirmPassword
  })

  if(value.error) return false;

  const user = {
    email,
    password: bcrypt.hashSync(password,12)
  }

  await getRepository(User).insert(user);
  
  return true;
}

export async function verifyPassword (databasePassword: string, password: string) {
 return bcrypt.compareSync(password, databasePassword);
}

export async function login (id: number) {
  const token = jwt.sign({id}, 'secret');
  const session = {
    userId: id,
    token: token
  }

  await getRepository(Session).insert(session);
  
  return {token: token};
}