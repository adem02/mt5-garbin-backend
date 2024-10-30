import 'reflect-metadata';
import { GetApiInfoUseCase } from '../../../src/useCases/ApiInfo/GetApiInfo/GetApiInfo.useCase';
import { ApiInfoRepositoryInterface } from '../../../src/useCases/gateway/ApiInfoRepositoryInterface';
import { LoggerInterface } from '../../../src/entities/logger/Logger.interface';

describe('Unit: Get Api Info use case.', () => {
    let useCase: GetApiInfoUseCase;
    let apiInfoRepositoryMock: Partial<ApiInfoRepositoryInterface>;
    let loggerMock: Partial<LoggerInterface>;

    beforeEach(() => {
        apiInfoRepositoryMock = {
            getApiInfo: jest.fn(async () => {
                return {
                    version: '1.0.0',
                    description: 'This is a test API',
                    name: 'Test API',
                };
            }),
        };
        loggerMock = {
            debug: jest.fn(),
        };

        useCase = new GetApiInfoUseCase(
            apiInfoRepositoryMock as ApiInfoRepositoryInterface,
            loggerMock as LoggerInterface,
        );
    });

    it('should execute use case successfully', async () => {
        const response = await useCase.execute();

        expect(apiInfoRepositoryMock.getApiInfo).toHaveBeenCalled();
        expect(loggerMock.debug).toHaveBeenCalledWith('GetApiInfoUseCase.execute');
        expect(response).toEqual({
            version: '1.0.0',
            description: 'This is a test API',
            name: 'Test API',
        });
    });
});
