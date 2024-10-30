import { Controller, Get, Route, SuccessResponse } from 'tsoa';
import { GetApiInfoUseCase } from '../../useCases/ApiInfo/GetApiInfo/GetApiInfo.useCase';
import { injectable } from 'tsyringe';
import { ApiInfoResponse } from '../../entities/ApiInfo';

@injectable()
@Route('info')
export class ApiInfoController extends Controller {
    constructor(private readonly getApiInfoUseCase: GetApiInfoUseCase) {
        super();
    }

    @Get()
    @SuccessResponse(200, 'OK')
    public async getApiInfo(): Promise<ApiInfoResponse> {
        return this.getApiInfoUseCase.execute();
    }
}
