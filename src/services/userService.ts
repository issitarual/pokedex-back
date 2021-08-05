import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import User from "../entities/User";

export interface SignUp {
  email: string;
  password: string;
  confirmPassword: string
}

import { userSchema } from "../schemas/userSchemas";

export async function findUserById (email: string) {
  const users = await getRepository(User).findOne({
    where: { 
      email: email
    }
  });
  return users;
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
