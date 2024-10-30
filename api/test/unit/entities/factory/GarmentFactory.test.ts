import { GarmentInterface } from '../../../../src/entities/types/Garment.interface';
import { GarmentFactory } from '../../../../src/entities/factory/GarmentFactory';
import { MainTopGarment } from '../../../../src/entities/MainTopGarment';
import { SubTopGarment } from '../../../../src/entities/SubTopGarment';
import { BottomGarment } from '../../../../src/entities/BottomGarment';
import { Shoes } from '../../../../src/entities/Shoes';
import { TopGarmentSizeType } from '../../../../src/entities/types/GarmentSize.types';
import {
    GarmentCategoryLabelType,
    GarmentSubCategoryByCategoryLabelType,
} from '../../../../src/entities/types/GarmentCategory.types';

const createGarmentParams = (): GarmentInterface => ({
    uuid: '123',
    userUuid: '12f68812-c6c8-4076-ac76-425dc40dad7f',
    name: 'Test Garment',
    categoryLabel: 'MAIN_TOP',
    imageUrl: 'image.jpg',
    subCategoryLabel: 'Dress',
    createdAt: new Date(),
});

describe('Unit: Garment Factory', () => {
    let params: GarmentInterface;
    let topGarmentSize: TopGarmentSizeType;

    beforeEach(() => {
        params = createGarmentParams();
        topGarmentSize = 'L';
    });

    it.each([
        ['MAIN_TOP', MainTopGarment, 'Dress'],
        ['SUB_TOP', SubTopGarment, 'Shirt'],
        ['BOTTOM', BottomGarment, 'Jogging_pants'],
        ['SHOES', Shoes, 'Sneakers'],
    ])(
        'should create a %s garment successfully',
        (categoryLabel, GarmentClass, subCategoryLabel) => {
            const garment = GarmentFactory.createGarmentFromCategory({
                ...params,
                size: { value: topGarmentSize },
                categoryLabel: categoryLabel as GarmentCategoryLabelType,
                subCategoryLabel: subCategoryLabel as GarmentSubCategoryByCategoryLabelType,
            });

            expect(garment).toBeInstanceOf(GarmentClass);
            expect(garment.uuid).toBe('123');
        },
    );

    it('should throw an error if sub category is not valid for specified category', () => {
        expect(() => {
            GarmentFactory.createGarmentFromCategory({
                ...params,
                categoryLabel: 'BOTTOM',
                subCategoryLabel: 'Sneakers',
                size: {
                    value: 'M',
                },
            });
        }).toThrow('Sub category is not valid for BOTTOM');
    });
    it('should throw an error if category is not valid', () => {
        const bottomParams: GarmentInterface = {
            ...params,
            categoryLabel: 'BOTTOM',
            subCategoryLabel: 'Jogging_pants',
        };
        const subTopParams: GarmentInterface = {
            ...params,
            categoryLabel: 'SUB_TOP',
            subCategoryLabel: 'Shirt',
        };

        expect(() => BottomGarment.create(params)).toThrow('Category is not BOTTOM');
        expect(() => SubTopGarment.create(bottomParams)).toThrow('Category is not SUB_TOP');
        expect(() => MainTopGarment.create(subTopParams)).toThrow('Category is not MAIN_TOP');
    });
});
