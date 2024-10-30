import { Outfit } from '../../../../entities/Outfit';
import { OutfitEntity } from '../entity/Outfit.entity';
import { Repository } from 'typeorm';
import { GarmentEntity } from '../entity/Garment.entity';
import DataSource from '../../../../frameworks/db/data-source';
import { GarmentOrmMapper } from './GarmentOrm.mapper';
import { injectable } from 'tsyringe';

@injectable()
export class OutfitOrmMapper {
    private garmentOrmRepository: Repository<GarmentEntity>;

    constructor(private garmentOrmMapper: GarmentOrmMapper) {
        this.garmentOrmRepository = DataSource.getRepository(GarmentEntity);
    }

    async toOrmEntity(outfit: Outfit): Promise<OutfitEntity> {
        const mainTopEntity = outfit.mainTop
            ? await this.garmentOrmRepository.findOneBy({ uuid: outfit.mainTop.uuid })
            : null;
        const subTopEntity = outfit.subTop
            ? await this.garmentOrmRepository.findOneBy({ uuid: outfit.subTop.uuid })
            : null;
        const bottomEntity = outfit.bottom
            ? await this.garmentOrmRepository.findOneBy({ uuid: outfit.bottom.uuid })
            : null;
        const shoesEntity = await this.garmentOrmRepository.findOneBy({ uuid: outfit.shoes!.uuid });

        return new OutfitEntity(
            outfit.uuid,
            outfit.userUuid,
            outfit.name,
            outfit.createdAt,
            mainTopEntity,
            subTopEntity,
            bottomEntity,
            shoesEntity,
            outfit.updatedAt,
        );
    }

    async toDomainEntity(outfitEntity: OutfitEntity): Promise<Outfit> {
        const { mainTop, subTop, bottom, shoes } = outfitEntity;

        return new Outfit(
            outfitEntity.uuid,
            outfitEntity.name,
            outfitEntity.userUuid,
            outfitEntity.createdAt,
            mainTop ? await this.garmentOrmMapper.toDomainEntity(mainTop) : null,
            subTop ? await this.garmentOrmMapper.toDomainEntity(subTop) : null,
            bottom ? await this.garmentOrmMapper.toDomainEntity(bottom) : null,
            shoes ? await this.garmentOrmMapper.toDomainEntity(shoes) : null,
            outfitEntity.updatedAt,
        );
    }

    async toCollectionDomain(outfitEntities: OutfitEntity[]): Promise<Outfit[]> {
        return Promise.all(
            outfitEntities.map(async (outfitEntity) => this.toDomainEntity(outfitEntity)),
        );
    }
}
