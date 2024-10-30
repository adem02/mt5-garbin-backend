import { inject, injectable } from 'tsyringe';
import { UpdateOutfitRequest } from './UpdateOutfit.request';
import { GarmentRepositoryToken, OutfitRepositoryToken } from '../../../utilities/constants';
import { OutfitRepositoryInterface } from '../../gateway/OutfitRepository.interface';
import { GarmentRepositoryInterface } from '../../gateway/GarmentRepository.interface';
import { MainTopGarment } from '../../../entities/MainTopGarment';
import { SubTopGarment } from '../../../entities/SubTopGarment';
import { BottomGarment } from '../../../entities/BottomGarment';
import { Shoes } from '../../../entities/Shoes';
import { ApiError, ApiErrorCode } from '../../../entities/error';

@injectable()
export class UpdateOutfit {
    constructor(
        @inject(OutfitRepositoryToken) private outfitRepository: OutfitRepositoryInterface,
        @inject(GarmentRepositoryToken) private garmentRepository: GarmentRepositoryInterface,
    ) {}

    async execute(request: UpdateOutfitRequest): Promise<void> {
        if (
            !request.name &&
            !request.bottomGarmentUuid &&
            !request.mainTopGarmentUuid &&
            !request.shoesGarmentUuid &&
            !request.subTopGarmentUuid
        ) {
            throw new ApiError(
                ApiErrorCode.BadRequest,
                'outfit/no-data-to-update',
                'At least updated one field must be provided',
            );
        }

        const outfitToUpdate = await this.outfitRepository.getByUuid(request.uuid);

        if (request.userUuid !== outfitToUpdate.userUuid) {
            throw new ApiError(
                ApiErrorCode.Forbidden,
                'outfit/unauthorized-action',
                'Outfit does not belong to user',
            );
        }

        const garmentsToUpdateOutfit = await this.getUpdatedGarmentsForOutfit({
            newMainTopUuid: request.mainTopGarmentUuid,
            newShoesUuid: request.shoesGarmentUuid,
            newBottomUuid: request.bottomGarmentUuid,
            newSubTopUuid: request.subTopGarmentUuid,
        });

        Object.values(garmentsToUpdateOutfit).forEach((garment) => {
            if (garment && garment.userUuid !== request.userUuid) {
                throw new ApiError(
                    ApiErrorCode.Forbidden,
                    'garment/unauthorized-action',
                    'Garment does not belong to user',
                );
            }
        });

        outfitToUpdate.update({ name: request.name || null, ...garmentsToUpdateOutfit });

        await this.outfitRepository.update(outfitToUpdate);
    }

    private async getUpdatedGarmentsForOutfit(garmentsUuids: {
        newMainTopUuid?: string;
        newSubTopUuid?: string;
        newBottomUuid?: string;
        newShoesUuid?: string;
    }): Promise<{
        mainTop: MainTopGarment | null;
        subTop: SubTopGarment | null;
        bottom: BottomGarment | null;
        shoes: Shoes | null;
    }> {
        const { newMainTopUuid, newSubTopUuid, newBottomUuid, newShoesUuid } = garmentsUuids;

        const mainTopGarment: MainTopGarment | null = newMainTopUuid
            ? ((await this.garmentRepository.getByUuid(newMainTopUuid)) as MainTopGarment)
            : null;
        const subTopGarment: SubTopGarment | null = newSubTopUuid
            ? ((await this.garmentRepository.getByUuid(newSubTopUuid)) as SubTopGarment)
            : null;
        const bottomGarment: BottomGarment | null = newBottomUuid
            ? ((await this.garmentRepository.getByUuid(newBottomUuid)) as BottomGarment)
            : null;
        const shoesGarment: Shoes | null = newShoesUuid
            ? ((await this.garmentRepository.getByUuid(newShoesUuid)) as Shoes)
            : null;

        return {
            mainTop: mainTopGarment,
            subTop: subTopGarment,
            bottom: bottomGarment,
            shoes: shoesGarment,
        };
    }
}
