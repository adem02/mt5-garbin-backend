import { injectable } from 'tsyringe';
import { Controller, Get, Route, Tags } from 'tsoa';
import { GetOutfitView } from '../../../../useCases/Outfit/GetOutfitView/GetOutfitView.useCase';
import { GetOutfitViewOutputDto } from './GetOutfitView.dto';
import { GetOutfitViewRequest } from '../../../../useCases/Outfit/GetOutfitView/GetOutfitView.request';

@Route('outfits')
@injectable()
export class GetOutfitViewController extends Controller {
    constructor(private readonly useCase: GetOutfitView) {
        super();
    }

    @Tags('Outfit')
    @Get('{uuid}/view')
    async getOutfitView(uuid: string): Promise<GetOutfitViewOutputDto> {
        const request: GetOutfitViewRequest = { uuid };

        const response = await this.useCase.execute(request);

        return new GetOutfitViewOutputDto(response);
    }
}
