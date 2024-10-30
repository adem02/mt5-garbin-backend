import { inject, injectable } from 'tsyringe';
import { GarmentRepositoryToken, OutfitRepositoryToken } from '../../../utilities/constants';
import { OutfitRepositoryInterface } from '../../gateway/OutfitRepository.interface';
import { CreateOutfitRequest } from './CreateOutfit.request';
import { Outfit } from '../../../entities/Outfit';
import { ResourceId } from '../../../utilities/ResourceId';
import { GarmentRepositoryInterface } from '../../gateway/GarmentRepository.interface';
import { CreateOutfitResponse } from './CreateOutfit.response';

@injectable()
export class CreateOutfit {
    constructor(
        @inject(OutfitRepositoryToken) private readonly outfitRepository: OutfitRepositoryInterface,
        @inject(GarmentRepositoryToken)
        private readonly garmentRepository: GarmentRepositoryInterface,
    ) {}

    async execute(request: CreateOutfitRequest): Promise<CreateOutfitResponse> {
        const mainTopGarment = request.mainTopGarmentUuid
            ? await this.garmentRepository.getByUuid(request.mainTopGarmentUuid)
            : null;
        const subTopGarment = request.subTopGarmentUuid
            ? await this.garmentRepository.getByUuid(request.subTopGarmentUuid)
            : null;
        const bottomGarment = request.bottomGarmentUuid
            ? await this.garmentRepository.getByUuid(request.bottomGarmentUuid)
            : null;
        const shoesGarment = request.shoesGarmentUuid
            ? await this.garmentRepository.getByUuid(request.shoesGarmentUuid)
            : null;

        const outfit = new Outfit(
            ResourceId.generateUuid(),
            request.name,
            request.userUuid,
            new Date(),
            mainTopGarment,
            subTopGarment,
            bottomGarment,
            shoesGarment,
        );

        await this.outfitRepository.create(outfit);

        return new CreateOutfitResponse(outfit);
    }
}
