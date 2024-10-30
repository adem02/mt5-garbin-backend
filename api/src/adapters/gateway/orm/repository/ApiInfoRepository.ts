import { ApiInfo } from '../../../../entities/ApiInfo';
import { ApiInfoRepositoryInterface as ApiInfoRepositoryInterface } from '../../../../useCases/gateway/ApiInfoRepositoryInterface';
import { hostname, platform, type } from 'os';

export class ApiInfoRepository implements ApiInfoRepositoryInterface {
    public async getApiInfo(): Promise<ApiInfo> {
        return {
            name: 'Garbin API',
            version: '1.0.0',
            description: 'This is a master 2 end-of-year project called Garbin.',
            hostname: hostname(),
            platform: platform(),
            type: type(),
        };
    }
}
