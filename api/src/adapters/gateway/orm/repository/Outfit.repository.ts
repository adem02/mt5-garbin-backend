import { OutfitRepositoryInterface } from '../../../../useCases/gateway/OutfitRepository.interface';
import { PaginationFilters } from '../../../../entities/types/PaginationFilters';
import { PaginatedEntities } from '../../../../entities/PaginatedEntities';
import { UserOutfitResponseInterface } from '../../../../entities/types/Outfit.types';
import { Outfit } from '../../../../entities/Outfit';
import { Repository } from 'typeorm';
import { OutfitEntity } from '../entity/Outfit.entity';
import DataSource from '../../../../frameworks/db/data-source';
import { ApiError, ApiErrorCode } from '../../../../entities/error';
import { OutfitOrmMapper } from '../mapper/OutfitOrm.mapper';
import { OutfitPlanEntity } from '../entity/OutfitPlan.entity';
import { injectable } from 'tsyringe';

@injectable()
export class OutfitRepository implements OutfitRepositoryInterface {
    private readonly outfitRepository: Repository<OutfitEntity>;
    private readonly outfitPlanRepository: Repository<OutfitPlanEntity>;

    constructor(private outfitOrmMapper: OutfitOrmMapper) {
        this.outfitRepository = DataSource.getRepository(OutfitEntity);
        this.outfitPlanRepository = DataSource.getRepository(OutfitPlanEntity);
    }

    async getByUuid(uuid: string): Promise<Outfit> {
        const outfitEntity = await this.outfitRepository.findOne({
            where: { uuid },
            relations: {
                mainTop: { category: true, subCategory: true },
                subTop: { category: true, subCategory: true },
                bottom: { category: true, subCategory: true },
                shoes: { category: true, subCategory: true },
            },
        });

        if (outfitEntity === null) {
            throw new ApiError(ApiErrorCode.NotFound, 'outfit/not-found', 'Outfit not found');
        }

        return this.outfitOrmMapper.toDomainEntity(outfitEntity);
    }

    async create(outfit: Outfit): Promise<void> {
        const outfitOrmEntity = await this.outfitOrmMapper.toOrmEntity(outfit);

        await this.outfitRepository.insert(outfitOrmEntity);
    }

    async update(outfit: Outfit): Promise<void> {
        const outfitOrmEntity = await this.outfitOrmMapper.toOrmEntity(outfit);

        await this.outfitRepository.save(outfitOrmEntity);
    }

    async deleteByUuid(uuid: string): Promise<void> {
        await this.outfitRepository.delete({ uuid });
    }

    async findByUserUuid(
        userUuid: string,
        filters: PaginationFilters,
    ): Promise<PaginatedEntities<UserOutfitResponseInterface>> {
        const take = filters.itemsPerPage;
        const skip = (filters.page - 1) * filters.itemsPerPage;

        const outfitsEntities = await this.outfitRepository
            .createQueryBuilder('outfit')
            .leftJoinAndSelect('outfit.mainTop', 'mainTop')
            .leftJoinAndSelect('outfit.subTop', 'subTop')
            .leftJoinAndSelect('outfit.bottom', 'bottom')
            .leftJoinAndSelect('outfit.shoes', 'shoes')
            .select([
                'outfit.uuid',
                'outfit.name',
                'outfit.createdAt',
                'mainTop.name',
                'mainTop.imageUrl',
                'subTop.name',
                'subTop.imageUrl',
                'bottom.name',
                'bottom.imageUrl',
                'shoes.name',
                'shoes.imageUrl',
            ])
            .where('outfit.userUuid = :userUuid', { userUuid })
            .orderBy('outfit.createdAt', 'DESC')
            .take(take)
            .skip(skip)
            .getMany();

        const totalItems = await this.outfitRepository.count({
            where: { userUuid },
        });

        const userOutfits = outfitsEntities.map<UserOutfitResponseInterface>((outfitEntity) => {
            return {
                uuid: outfitEntity.uuid,
                name: outfitEntity.name,
                garments: {
                    mainTop: outfitEntity.mainTop
                        ? {
                              name: outfitEntity.mainTop.name,
                              imageUrl: outfitEntity.mainTop.imageUrl,
                          }
                        : undefined,
                    subTop: outfitEntity.subTop
                        ? { name: outfitEntity.subTop.name, imageUrl: outfitEntity.subTop.imageUrl }
                        : undefined,
                    bottom: outfitEntity.bottom
                        ? { name: outfitEntity.bottom.name, imageUrl: outfitEntity.bottom.imageUrl }
                        : undefined,
                    shoes: outfitEntity.shoes
                        ? { name: outfitEntity.shoes.name, imageUrl: outfitEntity.shoes.imageUrl }
                        : undefined,
                },
            };
        });

        return new PaginatedEntities<UserOutfitResponseInterface>(userOutfits, totalItems);
    }
}
