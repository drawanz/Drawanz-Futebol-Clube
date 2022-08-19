import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Secret, SignOptions } from 'jsonwebtoken';
import IBodyReq from '../interfaces/IBodyReq';

dotenv.config();

export default class JwtService {
  static sign(email: string, password: string): string {
    const secret: Secret = process.env.JWT_SECRET as string;
    const options: SignOptions = {};
    const token = jwt.sign({ email, password }, secret, options);
    return token;
  }

  static verify(token: string): IBodyReq {
    const secret: Secret = process.env.JWT_SECRET as string;
    const options: SignOptions = {};
    const obj = jwt.verify(token, secret, options);
    return obj as IBodyReq;
  }
}
