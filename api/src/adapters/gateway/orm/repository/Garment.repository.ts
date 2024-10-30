import { GarmentRepositoryInterface } from '../../../../useCases/gateway/GarmentRepository.interface';
import { GarmentInterface } from '../../../../entities/types/Garment.interface';
import { injectable } from 'tsyringe';
import { Like, Repository } from 'typeorm';
import { GarmentEntity } from '../entity/Garment.entity';
import DataSource from '../../../../frameworks/db/data-source';
import { GarmentOrmMapper } from '../mapper/GarmentOrm.mapper';
import { PaginatedGarments } from '../../../../entities/PaginatedGarments';
import { PaginationFilters } from '../../../../entities/types/PaginationFilters';
import { GarmentCategoryLabelType } from '../../../../entities/types/GarmentCategory.types';
import { ApiError, ApiErrorCode } from '../../../../entities/error';

@injectable()
export class GarmentRepository implements GarmentRepositoryInterface {
    private readonly garmentRepository: Repository<GarmentEntity>;
    constructor(private readonly garmentOrmMapper: GarmentOrmMapper) {
        this.garmentRepository = DataSource.getRepository(GarmentEntity);
    }

    async create(garment: GarmentInterface): Promise<void> {
        const garmentOrmEntity = await this.garmentOrmMapper.toOrmEntity(garment);

        await this.garmentRepository.save(garmentOrmEntity);
    }

    async findGarmentsByUserUuid(
        uuid: string,
        filters: PaginationFilters = { itemsPerPage: 10, page: 1 },
    ): Promise<PaginatedGarments> {
        const take = filters.itemsPerPage;
        const skip = (filters.page - 1) * filters.itemsPerPage;

        const garments = await this.garmentRepository.find({
            where: { userUuid: uuid },
            order: { createdAt: 'DESC' },
            take,
            skip,
            relations: ['category', 'subCategory'],
        });

        const totalItems = await this.garmentRepository.count({
            where: { userUuid: uuid },
            take,
            skip,
        });

        const domainGarments = await this.garmentOrmMapper.toCollectionDomain(garments);

        return new PaginatedGarments(domainGarments, totalItems);
    }

    async findGarmentsByUserUuidAndCategory(
        uuid: string,
        category: GarmentCategoryLabelType,
        filters: PaginationFilters = { itemsPerPage: 10, page: 1 },
    ): Promise<PaginatedGarments> {
        const take = filters.itemsPerPage;
        const skip = (filters.page - 1) * filters.itemsPerPage;

        const garments = await this.garmentRepository.find({
            where: { userUuid: uuid, category: { name: category.toString().toLowerCase() } },
            order: { createdAt: 'DESC' },
            take,
            skip,
            relations: ['category', 'subCategory'],
        });

        const totalItems = await this.garmentRepository.count({
            where: { userUuid: uuid, category: { name: category.toString().toLowerCase() } },
            take,
            skip,
        });

        const domainGarments = await this.garmentOrmMapper.toCollectionDomain(garments);

        return new PaginatedGarments(domainGarments, totalItems);
    }

    async getByUuid(uuid: string): Promise<GarmentInterface> {
        const garment = await this.garmentRepository.findOne({
            where: { uuid },
            relations: ['category', 'subCategory'],
        });

        if (!garment) {
            throw new ApiError(ApiErrorCode.NotFound, 'garment/not-found', 'Garment not found');
        }

        return this.garmentOrmMapper.toDomainEntity(garment);
    }

    async update(garment: GarmentInterface): Promise<void> {
        const garmentOrmEntity = await this.garmentOrmMapper.toOrmEntity(garment);

        await this.garmentRepository.save(garmentOrmEntity);
    }

    async delete(uuid: string): Promise<void> {
        await this.garmentRepository.delete({ uuid });
    }

    async searchUserGarmentsByName(
        userUuid: string,
        searchTerm: string,
        filters: PaginationFilters = { itemsPerPage: 10, page: 1 },
    ): Promise<PaginatedGarments> {
        const take = filters.itemsPerPage;
        const skip = (filters.page - 1) * filters.itemsPerPage;

        const garments = await this.garmentRepository
            .createQueryBuilder('garment')
            .leftJoinAndSelect('garment.category', 'category')
            .leftJoinAndSelect('garment.subCategory', 'subCategory')
            .where('garment.userUuid = :userUuid', { userUuid })
            .andWhere('LOWER(garment.name) LIKE :searchTerm', {
                searchTerm: `%${searchTerm.toLowerCase()}%`,
            })
            .orderBy('garment.createdAt', 'DESC')
            .take(take)
            .skip(skip)
            .getMany();

        const totalItems = await this.garmentRepository.count({
            where: {
                userUuid,
                name: Like(`%${searchTerm}%`),
            },
        });

        const domainGarments = await this.garmentOrmMapper.toCollectionDomain(garments);

        return new PaginatedGarments(domainGarments, totalItems);
    }
}
