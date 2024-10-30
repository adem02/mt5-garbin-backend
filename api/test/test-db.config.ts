import AppDataSource from '../src/frameworks/db/data-source';
import { GarmentCategory } from '../src/adapters/gateway/orm/entity/GarmentCategory.entity';
import { GarmentSubCategory } from '../src/adapters/gateway/orm/entity/GarmentSubCategory.entity';

export class TestDbConfig {
    static async Reset(): Promise<void> {
        if (AppDataSource.isInitialized) {
            await TestDbConfig.Close();
        }

        if (process.env.NODE_ENV === 'test') {
            console.log('Resetting data source');
            console.log(`We are in ${process.env.NODE_ENV} mode`);
            await AppDataSource.initialize();
            await AppDataSource.synchronize();

            await TestDbConfig.InsertInitialData();
            return;
        }

        throw new Error('Cannot reset database in non-test environment');
    }

    static async Close(): Promise<void> {
        console.log('Closing data source');
        await AppDataSource.destroy();
    }

    static async ClearDatabase(): Promise<void> {
        console.log('Clearing the database');
        const connection = AppDataSource;

        const nonClearableEntities = ['GarmentCategory', 'GarmentSubCategory'];

        const orderedEntities = [
            'OutfitPlanEntity', // Doit être supprimé en premier car il dépend de OutfitEntity
            'OutfitEntity', // Doit être supprimé avant GarmentEntity car il dépend de Garment
            'GarmentEntity', // Doit être supprimé avant UserEntity car il est associé à un utilisateur
            'UserEntity', // Peut être supprimé en dernier
        ];

        for (const entityName of orderedEntities) {
            if (nonClearableEntities.includes(entityName)) {
                continue;
            }

            const repository = connection.getRepository(entityName);

            try {
                await repository.createQueryBuilder().delete().execute();
            } catch (error) {
                console.log(`Error clearing data from ${entityName}: `, error);
            }
        }
    }

    static async InsertInitialData(): Promise<void> {
        const categoryRepository = AppDataSource.getRepository(GarmentCategory);
        const subCategoryRepository = AppDataSource.getRepository(GarmentSubCategory);

        const categories = [
            { id: 3, name: 'bottom' },
            { id: 1, name: 'main_top' },
            { id: 4, name: 'shoes' },
            { id: 2, name: 'sub_top' },
        ];

        const subCategories = [
            { id: 1, name: 'dress', category: { id: 1 } },
            { id: 2, name: 'jacket', category: { id: 1 } },
            { id: 3, name: 'coat', category: { id: 1 } },
            { id: 4, name: 'bomber', category: { id: 1 } },
            { id: 5, name: 'vest', category: { id: 1 } },
            { id: 6, name: 'sweater', category: { id: 1 } },
            { id: 7, name: 'sweatshirt', category: { id: 1 } },
            { id: 8, name: 'down_jacket', category: { id: 1 } },
            { id: 9, name: 'shirt', category: { id: 2 } },
            { id: 10, name: 't-shirt', category: { id: 2 } },
            { id: 11, name: 'polo', category: { id: 2 } },
            { id: 12, name: 'tank_top', category: { id: 2 } },
            { id: 13, name: 'short_sleeve_shirt', category: { id: 2 } },
            { id: 14, name: 'sport_top', category: { id: 2 } },
            { id: 15, name: 'sleeveless_top', category: { id: 2 } },
            { id: 16, name: 'pants', category: { id: 3 } },
            { id: 17, name: 'skirt', category: { id: 3 } },
            { id: 18, name: 'shorts', category: { id: 3 } },
            { id: 19, name: 'leggings', category: { id: 3 } },
            { id: 20, name: 'jeans', category: { id: 3 } },
            { id: 21, name: 'bermuda_shorts', category: { id: 3 } },
            { id: 22, name: 'jogging_pants', category: { id: 3 } },
            { id: 23, name: 'overalls', category: { id: 3 } },
            { id: 24, name: 'cargo_pants', category: { id: 3 } },
            { id: 25, name: 'sneakers', category: { id: 4 } },
            { id: 26, name: 'sandals', category: { id: 4 } },
            { id: 27, name: 'boots', category: { id: 4 } },
            { id: 28, name: 'dress_shoes', category: { id: 4 } },
            { id: 29, name: 'loafers', category: { id: 4 } },
            { id: 30, name: 'espadrilles', category: { id: 4 } },
            { id: 31, name: 'flip-flops', category: { id: 4 } },
            { id: 32, name: 'ankle_boots', category: { id: 4 } },
            { id: 33, name: 'sports_shoes', category: { id: 4 } },
            { id: 34, name: 'hiking_shoes', category: { id: 4 } },
            { id: 35, name: 'flats', category: { id: 4 } },
        ];

        // check if data if already inserted
        const checkCategory = await categoryRepository.find();
        const checkSubCategory = await subCategoryRepository.find();

        if (checkCategory.length > 0 && checkSubCategory.length > 0) {
            return;
        }

        await categoryRepository.save(categories);

        await subCategoryRepository.save(subCategories);

        console.log('Initial data inserted');
    }
}
