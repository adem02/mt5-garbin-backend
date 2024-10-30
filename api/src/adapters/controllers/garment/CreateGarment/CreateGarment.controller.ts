import {
    Controller,
    FormField,
    Post,
    Request,
    Route,
    Security,
    SuccessResponse,
    Tags,
    UploadedFile,
} from 'tsoa';
import { Request as ExpressRequest } from 'express';
import { injectable } from 'tsyringe';
import { CreateGarment } from '../../../../useCases/Garment/CreateGarment/CreateGarment.useCase';
import { CreateGarmentInputDto, CreateGarmentOutputDto } from './CreateGarment.dto';
import { Validator } from '../../../services/Validator.service';
import { CreateGarmentRequest } from '../../../../useCases/Garment/CreateGarment/CreateGarment.request';
import {
    GarmentCategoryLabelType,
    GarmentSubCategoryByCategoryLabelType,
} from '../../../../entities/types/GarmentCategory.types';
import { GarmentSizeType } from '../../../../entities/types/GarmentSize.types';
import { StorageManager } from '../../../gateway/storage/StorageManager';
import { ApiError, ApiErrorCode } from '../../../../entities/error';

@Route('garments')
@Security('jwt')
@injectable()
export class CreateGarmentController extends Controller {
    constructor(
        private readonly useCase: CreateGarment,
        private readonly storage: StorageManager,
    ) {
        super();
    }

    @Tags('Garment')
    @Post()
    @SuccessResponse('201')
    async createGarment(
        @Request() req: ExpressRequest,
        @FormField() name: string,
        @FormField() categoryLabel: GarmentCategoryLabelType,
        @FormField() subCategoryLabel: GarmentSubCategoryByCategoryLabelType,
        @UploadedFile() image: Express.Multer.File,
        @FormField() colors?: string | null,
        @FormField() size?: GarmentSizeType | null,
        @FormField() brand?: string | null,
    ): Promise<CreateGarmentOutputDto> {
        if (!image) {
            throw new ApiError(ApiErrorCode.BadRequest, 'validation/failed', 'Image is required');
        }

        const userUuid = req.res?.locals.userUuid as string;

        const colorsArray = colors ? JSON.parse(colors) : colors === null ? null : undefined;

        const body: CreateGarmentInputDto = {
            name,
            categoryLabel,
            subCategoryLabel,
            colors: colorsArray,
            size,
            brand,
        };

        await Validator.validate({
            data: body,
            validationClass: CreateGarmentInputDto,
        });

        const imageName = `images/${Date.now()}_${image.originalname}` as string;

        const request: CreateGarmentRequest = {
            userUuid,
            name: body.name,
            categoryLabel: body.categoryLabel as GarmentCategoryLabelType,
            subCategoryLabel: body.subCategoryLabel as GarmentSubCategoryByCategoryLabelType,
            image: image.buffer,
            imageFilePath: imageName,
            colors: body.colors,
            size: body.size ? { value: body.size } : body.size === null ? null : undefined,
            brand: body.brand,
        };

        const response = await this.useCase.execute(request);

        return new CreateGarmentOutputDto(response);
    }
}
