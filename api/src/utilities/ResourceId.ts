import { v4 as uuidv4, validate } from 'uuid';

export class ResourceId {
    static generateUuid(): string {
        return uuidv4();
    }

    static validateUuid(uuid: string): boolean {
        return validate(uuid);
    }
}
