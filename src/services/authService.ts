import { getRepository } from "typeorm";
import Session from "../entities/Session";

export async function validateSession(token: string) {
    const userToken = await getRepository(Session).findOne({
        where: { 
          token: token
        }
      });
      return userToken;
}