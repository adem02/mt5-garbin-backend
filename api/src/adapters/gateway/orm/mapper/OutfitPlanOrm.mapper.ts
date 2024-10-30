import { OutfitPlan } from '../../../../entities/OutfitPlan';
import { OutfitEntity } from '../entity/Outfit.entity';
import { OutfitPlanEntity } from '../entity/OutfitPlan.entity';
import { Repository } from 'typeorm';
import DataSource from '../../../../frameworks/db/data-source';
import { ApiError, ApiErrorCode } from '../../../../entities/error';

export class OutfitPlanOrmMapper {
    private outfitOrmRepository: Repository<OutfitEntity>;

    constructor() {
        this.outfitOrmRepository = DataSource.getRepository(OutfitEntity);
    }

    async toOrmEntity(outfitPlan: OutfitPlan): Promise<OutfitPlanEntity> {
        const outfit = await this.outfitOrmRepository.findOneBy({ uuid: outfitPlan.outfitUuid });

        if (outfit === null) {
            throw new ApiError(ApiErrorCode.NotFound, 'outfit/not-found', 'Outfit not found');
        }

        return new OutfitPlanEntity(
            outfitPlan.uuid,
            outfitPlan.name,
            outfitPlan.userUuid,
            outfit,
            outfitPlan.date,
            outfitPlan.createdAt,
            outfitPlan.location,
            outfitPlan.updatedAt,
        );
    }

    async toDomainEntity(outfitPlanEntity: OutfitPlanEntity): Promise<OutfitPlan> {
        return new OutfitPlan(
            outfitPlanEntity.uuid,
            outfitPlanEntity.name,
            outfitPlanEntity.userUuid,
            outfitPlanEntity.outfit.uuid,
            outfitPlanEntity.date,
            outfitPlanEntity.createdAt,
            outfitPlanEntity.location,
            outfitPlanEntity.updatedAt,
        );
    }

    async toCollectionDomain(outfitPlanEntities: OutfitPlanEntity[]): Promise<OutfitPlan[]> {
        return Promise.all(
            outfitPlanEntities.map(async (outfitPlanEntity) =>
                this.toDomainEntity(outfitPlanEntity),
            ),
        );
    }
}
