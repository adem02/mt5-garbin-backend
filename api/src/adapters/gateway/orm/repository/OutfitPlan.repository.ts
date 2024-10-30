import { OutfitPlanRepositoryInterface } from '../../../../useCases/gateway/OutfitPlanRepository.interface';
import { OutfitPlan } from '../../../../entities/OutfitPlan';
import { injectable } from 'tsyringe';
import { OutfitPlanOrmMapper } from '../mapper/OutfitPlanOrm.mapper';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { OutfitPlanEntity } from '../entity/OutfitPlan.entity';
import DataSource from '../../../../frameworks/db/data-source';
import { ApiError, ApiErrorCode } from '../../../../entities/error';

@injectable()
export class OutfitPlanRepository implements OutfitPlanRepositoryInterface {
    private readonly outfitPlanRepository: Repository<OutfitPlanEntity>;

    constructor(private outfitOrmMapper: OutfitPlanOrmMapper) {
        this.outfitPlanRepository = DataSource.getRepository(OutfitPlanEntity);
    }

    async create(outfitPlan: OutfitPlan): Promise<void> {
        const outfitPlanOrmEntity = await this.outfitOrmMapper.toOrmEntity(outfitPlan);

        await this.outfitPlanRepository.insert(outfitPlanOrmEntity);
    }

    async deleteByUuid(uuid: string): Promise<void> {
        await this.outfitPlanRepository.delete({ uuid });
    }

    async findIncomingByOutfitUuid(outfitUuid: string): Promise<OutfitPlan[]> {
        const incomingOutfitPlans = await this.outfitPlanRepository.find({
            where: {
                outfit: {
                    uuid: outfitUuid,
                },
                date: MoreThan(new Date()),
            },
            relations: {
                outfit: true,
            },
            take: 7,
        });

        return this.outfitOrmMapper.toCollectionDomain(incomingOutfitPlans);
    }

    async findOutfitPlanHistoryByOutfitUuid(outfitUuid: string): Promise<OutfitPlan[]> {
        const outfitPlanHistory = await this.outfitPlanRepository.find({
            where: {
                outfit: {
                    uuid: outfitUuid,
                },
                date: LessThan(new Date()),
            },
            relations: {
                outfit: true,
            },
        });

        return this.outfitOrmMapper.toCollectionDomain(outfitPlanHistory);
    }

    async getByUuid(uuid: string): Promise<OutfitPlan> {
        const outfitPlanEntity = await this.outfitPlanRepository.findOne({
            where: {
                uuid,
            },
            relations: {
                outfit: true,
            },
        });

        if (outfitPlanEntity === null) {
            throw new ApiError(
                ApiErrorCode.NotFound,
                'outfit-plan/not-found',
                'Outfit plan not found',
            );
        }

        return this.outfitOrmMapper.toDomainEntity(outfitPlanEntity);
    }

    async getOutfitPlanHistoryCountByOutfitUuid(outfitUuid: string): Promise<number> {
        return this.outfitPlanRepository.count({
            where: {
                outfit: {
                    uuid: outfitUuid,
                },
                date: LessThan(new Date()),
            },
        });
    }

    async update(outfitPlan: OutfitPlan): Promise<void> {
        const outfitPlanOrmEntity = await this.outfitOrmMapper.toOrmEntity(outfitPlan);

        await this.outfitPlanRepository.save(outfitPlanOrmEntity);
    }
}
