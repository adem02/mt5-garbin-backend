import { inject, injectable } from 'tsyringe';
import { StorageStrategyInterface } from './StorageStrategy.interface';
import { Logger, StorageStrategyToken } from '../../../utilities/constants';
import { StorageManagerInterface } from '../../../useCases/gateway/StorageManager.interface';
import { RemoveBgService } from '../../services/RemoveBg.service';
import { LoggerInterface } from '../../../entities/logger/Logger.interface';

@injectable()
export class StorageManager implements StorageManagerInterface {
    constructor(
        @inject(StorageStrategyToken) private readonly storage: StorageStrategyInterface,
        @inject(Logger) private readonly logger: LoggerInterface,
        private readonly removeBgService: RemoveBgService,
    ) {}

    async upload(file: Buffer, filePath: string): Promise<string> {
        try {
            file = await this.removeBgService.removeBackground(file, filePath);
        } catch (error: any) {
            this.logger.error('Failed to remove background', error);
        }

        return this.storage.upload(file, filePath);
    }
}
