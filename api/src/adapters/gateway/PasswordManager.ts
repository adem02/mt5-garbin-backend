import * as bcrypt from 'bcrypt';
import { PasswordManagerInterface } from '../../useCases/gateway/PasswordManager.interface';

export class PasswordManager implements PasswordManagerInterface {
    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
