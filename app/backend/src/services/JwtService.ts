import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Secret, SignOptions } from 'jsonwebtoken';

dotenv.config();

export default class JwtService {
  static sign(obj: string | object): string {
    const secret: Secret = process.env.JWT_SECRET as string;
    const options: SignOptions = {};
    const token = jwt.sign(obj, secret, options);
    return token;
  }
}
