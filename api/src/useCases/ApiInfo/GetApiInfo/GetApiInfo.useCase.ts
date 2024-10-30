import { ApiInfoRepositoryInterface } from '../../gateway/ApiInfoRepositoryInterface';
import { inject, injectable } from 'tsyringe';
import { ApiInfoRepository, Logger } from '../../../utilities/constants';
import { LoggerInterface } from '../../../entities/logger/Logger.interface';
import { ApiInfoResponse } from '../../../entities/ApiInfo';

@injectable()
export class GetApiInfoUseCase {
    constructor(
        @inject(ApiInfoRepository) private readonly repository: ApiInfoRepositoryInterface,
        @inject(Logger) private readonly logger: LoggerInterface,
    ) {}

    public async execute(): Promise<ApiInfoResponse> {
        this.logger.debug('GetApiInfoUseCase.execute');

        return await this.repository.getApiInfo();
    }
}
