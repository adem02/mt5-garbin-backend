import { ApiInfo } from '../../entities/ApiInfo';

export interface ApiInfoRepositoryInterface {
    getApiInfo(): Promise<ApiInfo>;
}
