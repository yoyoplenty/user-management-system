import * as crypto from 'crypto';
import { promisify } from 'util';

import { UnprocessableEntityException, Injectable } from '@nestjs/common';

const scrypt = promisify(crypto.scrypt);

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const salt: string = crypto.randomBytes(8).toString('hex');
    const hash: Buffer = (await scrypt(password, salt, 32)) as Buffer;
    return salt + '.' + hash.toString('hex');
  }

  async checkPassword(providedPassword: string, dbPassword: string): Promise<void> {
    const [salt, storedHash] = dbPassword.split('.');

    const hash: Buffer = (await scrypt(providedPassword, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) throw new UnprocessableEntityException('incorrect initial password provided');

    return;
  }
}
