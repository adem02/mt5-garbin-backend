import 'reflect-metadata';
import { CreateGarmentRequest } from '../../../../src/useCases/Garment/CreateGarment/CreateGarment.request';
import { GarmentRepositoryInterface } from '../../../../src/useCases/gateway/GarmentRepository.interface';
import { CreateGarment } from '../../../../src/useCases/Garment/CreateGarment/CreateGarment.useCase';
import { GarmentFactory } from '../../../../src/entities/factory/GarmentFactory';
import { StorageManagerInterface } from '../../../../src/useCases/gateway/StorageManager.interface';
import { GarmentInterface } from '../../../../src/entities/types/Garment.interface';

describe('Unit: Create garment use case', () => {
    let useCaseMock: CreateGarment;
    let garmentRepositoryMock: Partial<GarmentRepositoryInterface>;
    let storageManagerMock: Partial<StorageManagerInterface>;
    let request: CreateGarmentRequest;

    beforeEach(() => {
        garmentRepositoryMock = {
            create: jest.fn(async (_garment: GarmentInterface) => {}),
        };

        storageManagerMock = {
            upload: jest.fn(async (_file: Buffer, _filePath: string) => 'imageUrl'),
        };

        request = {
            userUuid: 'userUuid',
            name: 'name',
            categoryLabel: 'MAIN_TOP',
            image: Buffer.from('image'),
            imageFilePath: 'imageFilePath',
            subCategoryLabel: 'Dress',
        };

        useCaseMock = new CreateGarment(
            garmentRepositoryMock as GarmentRepositoryInterface,
            storageManagerMock as StorageManagerInterface,
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new garment successfully', async () => {
        await useCaseMock.execute(request);

        const garment = GarmentFactory.createGarmentFromCategory({
            uuid: expect.any(String),
            userUuid: request.userUuid,
            name: request.name,
            categoryLabel: request.categoryLabel,
            subCategoryLabel: request.subCategoryLabel,
            imageUrl: 'imageUrl',
            createdAt: expect.any(Date),
        });

        expect(storageManagerMock.upload).toHaveBeenCalledWith(
            request.image,
            request.imageFilePath,
        );
        expect(garmentRepositoryMock.create).toHaveBeenCalledWith(garment);
    });
});
