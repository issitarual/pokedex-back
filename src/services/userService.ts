import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import User from "../entities/User";

export interface SignUp {
  email: string;
  password: string;
  confirmPassword: string
}

import { signInSchema } from "../schemas/signInSchemas";

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
   const value = signInSchema.validate({
    email: email,
    password: password,
    repeat_password: confirmPassword
  })

  if(value.error) {
    console.log(value.error);
    return false;
  };

  const user = {
    email,
    password: bcrypt.hashSync(password,12)
  }

  await getRepository(User).insert(user);
  
  return true;
}
