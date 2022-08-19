import * as bcrypt from 'bcryptjs';

export default class PasswordService {
  static incript(password: string): string {
    const salt = bcrypt.genSaltSync(5);
    const incript = bcrypt.hashSync(password, salt);
    return incript;
  }

  static async compare(password: string, hashedPasswordDb: string): Promise<boolean> {
    const comparePassword = await bcrypt.compare(password, hashedPasswordDb);
    return comparePassword;
  }
}
