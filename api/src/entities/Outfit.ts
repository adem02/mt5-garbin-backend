import { GarmentInterface } from './types/Garment.interface';
import { OutfitValidationRule } from './types/Outfit.types';
import { ApiError, ApiErrorCode } from './error';

export class Outfit {
    private validationRules: Array<OutfitValidationRule>;

    constructor(
        public readonly uuid: string,
        public name: string,
        public readonly userUuid: string,
        public readonly createdAt: Date,
        private _mainTop: GarmentInterface | null,
        private _subTop: GarmentInterface | null,
        private _bottom: GarmentInterface | null,
        private _shoes: GarmentInterface | null,
        public readonly updatedAt?: Date | null,
    ) {
        this.validationRules = [
            this.validateAtLeastOneGarment.bind(this),
            this.validateShoes.bind(this),
            this.validateTopAndBottom.bind(this),
        ];

        this.validate();
    }

    private validate(): void {
        this.validationRules.forEach((rule) => rule());
    }

    private validateAtLeastOneGarment(): void {
        if (!this.hasAtLeastOneGarment()) {
            throw new ApiError(
                ApiErrorCode.BadRequest,
                'outfit/invalid',
                'At least one garment must be provided',
            );
        }
    }

    private validateShoes(): void {
        if (!this.hasShoes()) {
            throw new ApiError(ApiErrorCode.BadRequest, 'outfit/invalid', 'Shoes must be provided');
        }
    }

    private validateTopAndBottom(): void {
        if (this.hasBottomAndNotTop() || this.hasTopAndNotBottom()) {
            throw new ApiError(
                ApiErrorCode.BadRequest,
                'outfit/invalid',
                'Top and bottom must be provided together',
            );
        }
    }

    private hasAtLeastOneGarment(): boolean {
        return (
            this._mainTop !== null ||
            this._subTop !== null ||
            this._bottom !== null ||
            this._shoes !== null
        );
    }

    private hasTopAndNotBottom(): boolean {
        return this._subTop !== null && this._bottom === null;
    }

    private hasBottomAndNotTop(): boolean {
        return this._bottom !== null && this._subTop === null;
    }

    private hasShoes(): boolean {
        return this._shoes !== null;
    }

    get mainTop(): GarmentInterface | null {
        return this._mainTop;
    }

    get subTop(): GarmentInterface | null {
        return this._subTop;
    }

    get bottom(): GarmentInterface | null {
        return this._bottom;
    }

    get shoes(): GarmentInterface | null {
        return this._shoes;
    }

    public update(params: {
        name: string | null;
        mainTop: GarmentInterface | null;
        subTop: GarmentInterface | null;
        bottom: GarmentInterface | null;
        shoes: GarmentInterface | null;
    }): void {
        this.name = params.name ?? this.name;
        this._mainTop = params.mainTop ?? this._mainTop;
        this._subTop = params.subTop ?? this._subTop;
        this._bottom = params.bottom ?? this._bottom;
        this._shoes = params.shoes ?? this._shoes;

        this.validate();
    }
}
