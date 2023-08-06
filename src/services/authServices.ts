import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";



dotenv.config()


export default {

  verifyPassword: async (password: string, hashedPassword: string): Promise<boolean> => {
    return await argon2.verify(hashedPassword, password);
  },

  signJwt: (payload: any) => {
    if (process.env.JWT_SECRET_KEY === undefined) {
      throw new Error();
    }

    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 600 * 600,
    })
    ;
  },
  
  verifyToken: (token: string) => {
    if (process.env.JWT_SECRET_KEY === undefined) {
      throw new Error();
    }

    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  },

};