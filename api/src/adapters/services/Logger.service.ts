import { LoggerInterface } from '../../entities/logger/Logger.interface';
import Logger from '../../frameworks/logs/logger';

export class LoggerService implements LoggerInterface {
    error(message: string, context: any[] = []): void {
        Logger.error(message, context);
    }
    warn(message: string, context: any[] = []): void {
        Logger.warn(message, context);
    }
    info(message: string, context: any[] = []): void {
        Logger.info(message, context);
    }
    http(message: string, context: any[] = []): void {
        Logger.http(message, context);
    }
    debug(message: string, context: any[] = []): void {
        Logger.debug(message, context);
    }
}
