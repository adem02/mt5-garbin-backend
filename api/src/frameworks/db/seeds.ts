import DataSource from './data-source';
import { UserEntity } from '../../adapters/gateway/orm/entity/User.entity';
import { inject, injectable } from 'tsyringe';
import { Logger } from '../../utilities/constants';
import { LoggerInterface } from '../../entities/logger/Logger.interface';
import { ResourceId } from '../../utilities/ResourceId';
import { PasswordManager } from '../../adapters/gateway/PasswordManager';
import { UserRoleEnum } from '../../entities/enum/UserRole.enum';
import { GarmentEntity } from '../../adapters/gateway/orm/entity/Garment.entity';
import { GarmentCategory } from '../../adapters/gateway/orm/entity/GarmentCategory.entity';
import { GarmentSubCategory } from '../../adapters/gateway/orm/entity/GarmentSubCategory.entity';
import { GarmentSizeType } from '../../entities/types/GarmentSize.types';
import { GarmentCategoryLabelType } from '../../entities/types/GarmentCategory.types';
import { OutfitEntity } from '../../adapters/gateway/orm/entity/Outfit.entity';
import { OutfitPlanEntity } from '../../adapters/gateway/orm/entity/OutfitPlan.entity';

@injectable()
export class Seeder {
    private readonly seeds: Array<() => void> = [];
    private userUuids: Record<'jordan' | 'soufian' | 'hassan' | 'ahmed', any> = {
        jordan: 'a40c5808-69b3-4fe1-b955-d92c8274fdb2',
        soufian: '9854c8c7-abc3-4939-985f-28023ee9793a',
        hassan: 'dec0168b-2428-4dc8-a366-56d74a850d32',
        ahmed: '37bb965f-443c-4b63-978e-4a3b27ddc958',
    };

    constructor(@inject(Logger) private logger: LoggerInterface) {
        this.seeds = [
            this.seedUsers.bind(this),
            this.seedGarments.bind(this),
            this.seedOutfits.bind(this),
            this.seedOutfitPlans.bind(this),
        ];
    }

    async runSeeds(): Promise<void> {
        for (const seed of this.seeds) {
            await seed();
        }
    }

    async seedUsers(): Promise<void> {
        const userRepository = DataSource.getRepository<UserEntity>(UserEntity);

        const count = await userRepository.count();

        if (count > 0) {
            this.logger.debug('Users already seeded, skipping...');
            return;
        }

        const hashedPassword = await new PasswordManager().hash('_Garbin123');

        const usersInfos = [
            {
                username: 'test-jordan',
                email: 'test-jordan@email.com',
                uuid: this.userUuids.jordan,
            },
            {
                username: 'test-soufian',
                email: 'test-soufian@email.com',
                uuid: this.userUuids.soufian,
            },
            {
                username: 'test-hassan',
                email: 'test-hassan@email.com',
                uuid: this.userUuids.hassan,
            },
            { username: 'test-ahmed', email: 'test-ahmed@email.com', uuid: this.userUuids.ahmed },
        ];

        const users = usersInfos.map(
            (userInfo) =>
                new UserEntity(
                    userInfo.uuid,
                    userInfo.username,
                    userInfo.email,
                    hashedPassword,
                    UserRoleEnum.USER,
                    new Date(),
                    new Date(),
                ),
        );

        await userRepository.insert(users);
        this.logger.debug('Users seeded successfully');
    }

    async seedGarments(): Promise<void> {
        const garmentRepository = DataSource.getRepository<GarmentEntity>(GarmentEntity);
        const garmentCategoryRepository =
            DataSource.getRepository<GarmentCategory>(GarmentCategory);
        const garmentSubCategoryRepository =
            DataSource.getRepository<GarmentSubCategory>(GarmentSubCategory);

        const count = await garmentRepository.count();
        if (count > 0) {
            this.logger.debug('Garments already seeded, skipping...');
            return;
        }

        const categories = await garmentCategoryRepository.find();
        const subCategories = await garmentSubCategoryRepository.find({ relations: ['category'] });

        const usersUuids = [
            this.userUuids.jordan,
            this.userUuids.soufian,
            this.userUuids.hassan,
            this.userUuids.ahmed,
        ];

        const garmentsData = usersUuids.map((userUuid) =>
            this.generateGarmentsForUser(userUuid, categories, subCategories),
        );

        for (const garments of garmentsData) {
            await garmentRepository.insert(garments);
        }

        this.logger.debug('Garments seeded successfully');
    }

    private generateGarmentsForUser(
        userUuid: string,
        categories: GarmentCategory[],
        subCategories: GarmentSubCategory[],
    ): GarmentEntity[] {
        const garments: GarmentEntity[] = [];
        const garmentNamesIndexedBySubCategoryName: Record<string, string[]> = {
            dress: ['Ma robe de soirée', 'Ma robe d’été', 'Ma robe élégante', 'Ma robe casual'],
            jacket: ['Ma veste pluie', 'Ma veste sport', 'Ma veste élégante', 'Ma veste en cuir'],
            coat: [
                'Mon manteau hiver',
                'Mon manteau mi-saison',
                'Mon manteau élégant',
                'Mon manteau casual',
            ],
            bomber: [
                'Mon bomber luxe',
                'Mon bomber détente',
                'Mon bomber sport',
                'Mon bomber casual',
            ],
            vest: ['Mon gilet tricot', 'Mon gilet sport', 'Mon gilet habillé', 'Mon gilet casual'],
            sweater: [
                'Mon pull en laine',
                'Mon pull col roulé',
                'Mon pull léger',
                'Mon pull habillé',
            ],
            sweatshirt: [
                'Mon sweat décontracté',
                'Mon sweat à capuche',
                'Mon sweat de sport',
                'Mon sweat oversize',
            ],
            down_jacket: [
                'Ma doudoune légère',
                'Ma doudoune longue',
                'Ma doudoune élégante',
                'Ma doudoune sport',
            ],
            shirt: [
                'Ma chemise sortie',
                'Ma chemise luxe',
                'Ma chemise entretien',
                'Ma chemise casual',
            ],
            't-shirt': [
                'Mon t-shirt basique',
                'Mon t-shirt ajusté',
                'Mon t-shirt oversize',
                'Mon t-shirt sport',
            ],
            polo: ['Mon polo classe', 'Mon polo sport', 'Mon polo casual', 'Mon polo détente'],
            tank_top: [
                'Mon débardeur sport',
                'Mon débardeur casual',
                'Mon débardeur d’été',
                'Mon débardeur élégant',
            ],
            short_sleeve_shirt: [
                'Ma chemise manches courtes',
                'Ma chemise manches longues',
                'Ma chemise casual',
                'Ma chemise habillée',
            ],
            sport_top: [
                'Mon top sport',
                'Mon top élégant',
                'Mon top décontracté',
                'Mon top soirée',
            ],
            sleeveless_top: [
                'Mon top sans manches',
                'Mon top chic',
                'Mon top décontracté',
                'Mon top casual',
            ],
            pants: [
                'Mon pantalon slim',
                'Mon pantalon droit',
                'Mon pantalon cargo',
                'Mon pantalon décontracté',
            ],
            skirt: ['Ma jupe longue', 'Ma jupe courte', 'Ma jupe plissée', 'Ma jupe en jean'],
            shorts: ['Mon short sport', 'Mon short casual', 'Mon short en jean', 'Mon short cargo'],
            leggings: [
                'Mon legging sport',
                'Mon legging détente',
                'Mon legging compressif',
                'Mon legging casual',
            ],
            jeans: ['Mon jeans skinny', 'Mon jeans droit', 'Mon jeans délavé', 'Mon jeans bootcut'],
            bermuda_shorts: [
                'Mon bermuda sport',
                'Mon bermuda plage',
                'Mon bermuda casual',
                'Mon bermuda chic',
            ],
            jogging_pants: [
                'Mon jogging sport',
                'Mon jogging détente',
                'Mon jogging chic',
                'Mon jogging casual',
            ],
            overalls: [
                'Ma salopette casual',
                'Ma salopette chic',
                'Ma salopette utilitaire',
                'Ma salopette jean',
            ],
            cargo_pants: [
                'Mon pantalon cargo utilitaire',
                'Mon cargo détente',
                'Mon cargo sport',
                'Mon cargo élégant',
            ],
            sneakers: [
                'Mes baskets confort',
                'Mes baskets légères',
                'Mes baskets sport',
                'Mes baskets casual',
            ],
            sandals: [
                'Mes sandales plage',
                'Mes sandales habillées',
                'Mes sandales sport',
                'Mes sandales détente',
            ],
            boots: ['Mes bottes cuir', 'Mes bottes pluie', 'Mes bottes neige', 'Mes bottes casual'],
            dress_shoes: [
                'Mes chaussures habillées',
                'Mes chaussures soirée',
                'Mes chaussures élégantes',
                'Mes chaussures décontractées',
            ],
            loafers: [
                'Mes mocassins chic',
                'Mes mocassins détente',
                'Mes mocassins sport',
                'Mes mocassins habillés',
            ],
            espadrilles: [
                'Mes espadrilles plage',
                'Mes espadrilles casual',
                'Mes espadrilles chic',
                'Mes espadrilles sport',
            ],
            'flip-flops': [
                'Mes tongs plage',
                'Mes tongs piscine',
                'Mes tongs casual',
                'Mes tongs sport',
            ],
            ankle_boots: [
                'Mes bottines chic',
                'Mes bottines casual',
                'Mes bottines cuir',
                'Mes bottines sport',
            ],
            sports_shoes: [
                'Mes chaussures sport',
                'Mes chaussures running',
                'Mes chaussures de trail',
                'Mes chaussures fitness',
            ],
            hiking_shoes: [
                'Mes chaussures randonnée',
                'Mes chaussures montagne',
                'Mes chaussures outdoor',
                'Mes chaussures trail',
            ],
            flats: [
                'Mes ballerines élégantes',
                'Mes ballerines casual',
                'Mes ballerines de soirée',
                'Mes ballerines détente',
            ],
        };
        const brandNames = ['Nike', 'Adidas', 'Zara', 'Uniqlo', 'H&M'];
        const garmentsSizeIndexedByCategory: {
            category: GarmentCategoryLabelType;
            sizes: Array<GarmentSizeType>;
        }[] = [
            { category: 'MAIN_TOP', sizes: ['S', 'M', 'L', 'XL'] },
            { category: 'SUB_TOP', sizes: ['S', 'M', 'L', 'XL'] },
            {
                category: 'BOTTOM',
                sizes: [
                    { waist: 39, length: 41 },
                    { waist: 40, length: 42 },
                    { waist: 41, length: 43 },
                    { waist: 42, length: 44 },
                    { waist: 43, length: 45 },
                    { waist: 44, length: 46 },
                    { waist: 45, length: 47 },
                ],
            },
            { category: 'SHOES', sizes: [38, 39, 40, 41, 42, 43, 44] },
        ];

        for (let i = 0; i < 20; i++) {
            const randomCategory = this.getRandomItem(categories);
            const randomSubCategory = this.getRandomItem(
                subCategories.filter((sc) => sc.category.id === randomCategory.id),
            );
            const garmentNames =
                garmentNamesIndexedBySubCategoryName[randomSubCategory.name.toLowerCase()];
            const randomGarmentName = this.getRandomItem(garmentNames);
            const randomBrand = this.getRandomItem(brandNames);
            const garmentSize = garmentsSizeIndexedByCategory.find(
                (g) => g.category.toLowerCase() === randomCategory.name.toLowerCase(),
            );
            const garmentSizeAccordingToCategory = garmentSize
                ? this.getRandomItem<GarmentSizeType>(garmentSize.sizes)
                : null;
            const colors = [
                'red',
                'blue',
                'green',
                'yellow',
                'black',
                'white',
                'purple',
                'orange',
                'pink',
                'brown',
            ];
            const shuffleArray = (array: string[]): string[] =>
                array.sort(() => 0.5 - Math.random());
            const someColors = shuffleArray(colors).slice(0, Math.floor(Math.random() * 3) + 1);

            garments.push(
                new GarmentEntity(
                    ResourceId.generateUuid(),
                    randomGarmentName,
                    userUuid,
                    randomCategory,
                    randomSubCategory,
                    `https://example.com/image_${i}.jpg`,
                    new Date(),
                    garmentSizeAccordingToCategory,
                    randomBrand,
                    someColors,
                    new Date(),
                ),
            );
        }

        return garments;
    }

    async seedOutfits(): Promise<void> {
        const outfitRepository = DataSource.getRepository<OutfitEntity>(OutfitEntity);
        const garmentRepository = DataSource.getRepository<GarmentEntity>(GarmentEntity);

        const count = await outfitRepository.count();
        if (count > 0) {
            this.logger.debug('Outfits already seeded, skipping...');
            return;
        }

        const usersUuids = [
            this.userUuids.jordan,
            this.userUuids.soufian,
            this.userUuids.hassan,
            this.userUuids.ahmed,
        ];

        const garments = await garmentRepository.find({ relations: ['category'] });
        const garmentsByUser = this.getGarmentsByUser(garments);

        const outfitsData = usersUuids.map((userUuid) =>
            this.generateOutfitsForUser(userUuid, garmentsByUser[userUuid]),
        );

        for (const outfits of outfitsData) {
            await outfitRepository.insert(outfits);
        }

        this.logger.debug('Outfits seeded successfully');
    }

    private getGarmentsByUser(
        garments: GarmentEntity[],
    ): Record<string, Record<string, GarmentEntity[]>> {
        const garmentsByUser: Record<string, Record<string, GarmentEntity[]>> = {};

        garments.forEach((garment) => {
            if (!garmentsByUser[garment.userUuid]) {
                garmentsByUser[garment.userUuid] = {
                    main_top: [],
                    sub_top: [],
                    bottom: [],
                    shoes: [],
                };
            }
            const categoryName = garment.category.name.toLowerCase();
            garmentsByUser[garment.userUuid][categoryName]?.push(garment);
        });

        return garmentsByUser;
    }

    private generateOutfitsForUser(
        userUuid: string,
        garments: Record<string, GarmentEntity[]>,
    ): OutfitEntity[] {
        const outfits: OutfitEntity[] = [];

        for (let i = 0; i < 2; i++) {
            const mainTop = this.getRandomItem(garments.main_top);
            const shoes = this.getRandomItem(garments.shoes);

            const outfit = new OutfitEntity(
                ResourceId.generateUuid(),
                userUuid,
                `Outfit MainTop & Shoes ${i + 1}`,
                new Date(),
                mainTop,
                null,
                null,
                shoes,
                new Date(),
            );
            outfits.push(outfit);
        }

        for (let i = 0; i < 3; i++) {
            const subTop = this.getRandomItem(garments.sub_top);
            const bottom = this.getRandomItem(garments.bottom);
            const shoes = this.getRandomItem(garments.shoes);

            const outfit = new OutfitEntity(
                ResourceId.generateUuid(),
                userUuid,
                `Outfit No MainTop ${i + 1}`,
                new Date(),
                null,
                subTop,
                bottom,
                shoes,
                new Date(),
            );
            outfits.push(outfit);
        }

        const mainTop = this.getRandomItem(garments.main_top);
        const subTop = this.getRandomItem(garments.sub_top);
        const bottom = this.getRandomItem(garments.bottom);
        const shoes = this.getRandomItem(garments.shoes);

        const completeOutfit = new OutfitEntity(
            ResourceId.generateUuid(),
            userUuid,
            'Complete Outfit',
            new Date(),
            mainTop,
            subTop,
            bottom,
            shoes,
            new Date(),
        );
        outfits.push(completeOutfit);

        return outfits;
    }

    async seedOutfitPlans(): Promise<void> {
        const outfitPlanRepository = DataSource.getRepository<OutfitPlanEntity>(OutfitPlanEntity);
        const outfitRepository = DataSource.getRepository<OutfitEntity>(OutfitEntity);

        const count = await outfitPlanRepository.count();
        if (count > 0) {
            this.logger.debug('Outfit plans already seeded, skipping...');
            return;
        }

        for (const userUuid of Object.values(this.userUuids)) {
            const userOutfits = await outfitRepository.find({
                where: { userUuid },
                relations: ['mainTop', 'subTop', 'bottom', 'shoes'],
            });
            const outfitPlans: OutfitPlanEntity[] = [];

            userOutfits.forEach((outfit) => {
                if (outfit.mainTop && outfit.subTop && outfit.bottom && outfit.shoes) {
                    for (let i = 1; i <= 2; i++) {
                        outfitPlans.push(this.createOutfitPlan(outfit, -i));
                        outfitPlans.push(this.createOutfitPlan(outfit, i));
                    }
                } else if (!outfit.mainTop && outfit.subTop && outfit.bottom && outfit.shoes) {
                    for (let i = 1; i <= 3; i++) {
                        outfitPlans.push(this.createOutfitPlan(outfit, -i));
                        outfitPlans.push(this.createOutfitPlan(outfit, i));
                    }
                } else if (outfit.mainTop && !outfit.subTop && !outfit.bottom && outfit.shoes) {
                    outfitPlans.push(this.createOutfitPlan(outfit, -1));
                    outfitPlans.push(this.createOutfitPlan(outfit, 1));
                }
            });
            await outfitPlanRepository.insert(outfitPlans);
        }

        this.logger.debug('Outfit plans seeded successfully');
    }

    private createOutfitPlan(outfit: OutfitEntity, dayOffset: number): OutfitPlanEntity {
        const date = new Date();
        const randomDays = Math.floor(Math.random() * 30) + 1;

        if (dayOffset > 0) {
            date.setDate(date.getDate() + randomDays);
        } else {
            date.setDate(date.getDate() - randomDays);
        }

        return new OutfitPlanEntity(
            ResourceId.generateUuid(),
            `Plan ${outfit.name}`,
            outfit.userUuid,
            outfit,
            date,
            new Date(),
            'Plan Location',
        );
    }

    private getRandomItem<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }
}
