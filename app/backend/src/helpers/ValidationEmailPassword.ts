import ErrorException from './ErrorException';

export default class Validation {
  public static validateEmail(email: string): boolean {
    if (email === '') {
      throw new ErrorException(400, 'All fields must be filled');
    }
    return true;
  }

  public static validatePassword(password: string): boolean {
    if (password === '') {
      throw new ErrorException(400, 'All fields must be filled');
    }
    return true;
  }

  public static validateIfCorrectEmail(user: object | null): boolean {
    if (!user) {
      throw new ErrorException(401, 'Incorrect email or password');
    }
    return true;
  }

  public static validateIfCorrectPassword(compare: boolean): boolean {
    if (!compare) {
      throw new ErrorException(401, 'Incorrect email or password');
    }
    return true;
  }
}
