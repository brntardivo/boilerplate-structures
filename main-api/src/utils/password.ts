import bcrypt from 'bcryptjs';

const bcryptConfig = { cost: 10 };

export class Password {
  static hash(password: string | number): string {
    return bcrypt.hashSync(
      password.toString(),
      bcrypt.genSaltSync(bcryptConfig.cost)
    );
  }

  static compare(password: string | number, hashedPassword: string): boolean {
    if (!password || !hashedPassword) return false;
    return bcrypt.compareSync(password.toString(), hashedPassword);
  }
}
