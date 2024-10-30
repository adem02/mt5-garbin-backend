/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ApiInfoController } from './../../adapters/controllers/ApiInfo.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UpdateUserPasswordController } from './../../adapters/controllers/user/UpdateUserPassword/UpdateUserPassword.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RegisterUserController } from './../../adapters/controllers/user/RegisterUser/RegisterUser.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LoginUserController } from './../../adapters/controllers/user/LoginUser/LoginUser.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UpdateOutfitPlanController } from './../../adapters/controllers/outfitPlan/UpdateOutfitPlan/UpdateOutfitPlan.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PlanOutfitController } from './../../adapters/controllers/outfitPlan/PlanOutfit/PlanOutfit.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GetIncomingByOutfitUuidController } from './../../adapters/controllers/outfitPlan/GetIncomingByOutfitUuid/GetIncomingByOutfitUuid.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DeleteOutfitPlanByUuidController } from './../../adapters/controllers/outfitPlan/DeleteOutfitPlanByUuid/DeleteOutfitPlanByUuid.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UpdateOutfitController } from './../../adapters/controllers/outfit/UpdateOutfit/UpdateOutfit.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GetUserOutfitsController } from './../../adapters/controllers/outfit/GetUserOutfits/GetUserOutfits.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GetUserOutfitDetailsController } from './../../adapters/controllers/outfit/GetUserOutfitDetails/GetUserOutfitDetails.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GetOutfitViewController } from './../../adapters/controllers/outfit/GetOutfitView/GetOutfitView.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DeleteOutfitByUuidController } from './../../adapters/controllers/outfit/DeleteOutfitByUuid/DeleteOutfitByUuid.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CreateOutfitController } from './../../adapters/controllers/outfit/CreateOutfit/CreateOutfit.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UpdateGarmentController } from './../../adapters/controllers/garment/UpdateGarment/UpdateGarment.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SearchUserGarmentsByNameController } from './../../adapters/controllers/garment/SearchUserGarmentsByName/SearchUserGarmentsByName.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GetUserGarmentsByCategoryController } from './../../adapters/controllers/garment/GetUserGarmentsByCategory/GetUserGarmentsByCategory.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GetUserGarmentsController } from './../../adapters/controllers/garment/GetUserGarments/GetUserGarments.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DeleteGarmentByUuidController } from './../../adapters/controllers/garment/DeleteGarmentByUuid/DeleteGarmentByUuid.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CreateGarmentController } from './../../adapters/controllers/garment/CreateGarment/CreateGarment.controller';
import { expressAuthentication } from './authentication';
// @ts-ignore - no great way to install types from subpackage
import { iocContainer } from './iocContainer';
import type { IocContainer, IocContainerFactory } from '@tsoa/runtime';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';
const multer = require('multer');


const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Readonly_ApiInfo_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string","required":true},"version":{"dataType":"string","required":true},"description":{"dataType":"string","required":true},"hostname":{"dataType":"string"},"platform":{"dataType":"string"},"type":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiInfoResponse": {
        "dataType": "refAlias",
        "type": {"ref":"Readonly_ApiInfo_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateUserPasswordInputDto": {
        "dataType": "refObject",
        "properties": {
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RegisterUserOutputDto": {
        "dataType": "refObject",
        "properties": {
            "user": {"dataType":"nestedObjectLiteral","nestedProperties":{"role":{"dataType":"string","required":true},"email":{"dataType":"string","required":true},"username":{"dataType":"string","required":true},"uuid":{"dataType":"string","required":true}},"required":true},
            "accessToken": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RegisterUserInputDto": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginUserOutputDto": {
        "dataType": "refObject",
        "properties": {
            "user": {"dataType":"nestedObjectLiteral","nestedProperties":{"role":{"dataType":"string","required":true},"email":{"dataType":"string","required":true},"username":{"dataType":"string","required":true},"uuid":{"dataType":"string","required":true}},"required":true},
            "accessToken": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LoginUserInputDto": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateOutfitPlanInputDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "date": {"dataType":"string"},
            "location": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlanOutfitOutputDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "outfitUuid": {"dataType":"string","required":true},
            "date": {"dataType":"datetime","required":true},
            "location": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlanOutfitInputDto": {
        "dataType": "refObject",
        "properties": {
            "date": {"dataType":"string","required":true},
            "location": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetIncomingByOutfitUuidOutputDto": {
        "dataType": "refObject",
        "properties": {
            "incomingPlans": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"location":{"dataType":"string","required":true},"date":{"dataType":"datetime","required":true},"eventName":{"dataType":"string","required":true},"uuid":{"dataType":"string","required":true}}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateOutfitInputDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "mainTopGarmentUuid": {"dataType":"string"},
            "subTopGarmentUuid": {"dataType":"string"},
            "bottomGarmentUuid": {"dataType":"string"},
            "shoesGarmentUuid": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetUserOutfitsOutputDto": {
        "dataType": "refObject",
        "properties": {
            "outfits": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"garments":{"dataType":"nestedObjectLiteral","nestedProperties":{"shoes":{"dataType":"nestedObjectLiteral","nestedProperties":{"imageUrl":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},"subTop":{"dataType":"nestedObjectLiteral","nestedProperties":{"imageUrl":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},"bottom":{"dataType":"nestedObjectLiteral","nestedProperties":{"imageUrl":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},"mainTop":{"dataType":"nestedObjectLiteral","nestedProperties":{"imageUrl":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}}},"required":true},"name":{"dataType":"string","required":true},"uuid":{"dataType":"string","required":true}}},"required":true},
            "totalItems": {"dataType":"double","required":true},
            "itemsPerPage": {"dataType":"double","required":true},
            "page": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetUserOutfitDetailsOutputDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "garments": {"dataType":"nestedObjectLiteral","nestedProperties":{"shoes":{"dataType":"nestedObjectLiteral","nestedProperties":{"imageUrl":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},"subTop":{"dataType":"nestedObjectLiteral","nestedProperties":{"imageUrl":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},"bottom":{"dataType":"nestedObjectLiteral","nestedProperties":{"imageUrl":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},"mainTop":{"dataType":"nestedObjectLiteral","nestedProperties":{"imageUrl":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}}},"required":true},
            "history": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"location":{"dataType":"string","required":true},"date":{"dataType":"datetime","required":true},"name":{"dataType":"string","required":true}}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetOutfitViewOutputDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "garments": {"dataType":"nestedObjectLiteral","nestedProperties":{"shoes":{"dataType":"nestedObjectLiteral","nestedProperties":{"imageUrl":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},"subTop":{"dataType":"nestedObjectLiteral","nestedProperties":{"imageUrl":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},"bottom":{"dataType":"nestedObjectLiteral","nestedProperties":{"imageUrl":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},"mainTop":{"dataType":"nestedObjectLiteral","nestedProperties":{"imageUrl":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}}},"required":true},
            "creator": {"dataType":"nestedObjectLiteral","nestedProperties":{"lastname":{"dataType":"string"},"firstname":{"dataType":"string"},"username":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateOutfitOutputDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "garments": {"dataType":"nestedObjectLiteral","nestedProperties":{"shoes":{"dataType":"nestedObjectLiteral","nestedProperties":{"imageUrl":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},"bottom":{"dataType":"nestedObjectLiteral","nestedProperties":{"imageUrl":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},"subTop":{"dataType":"nestedObjectLiteral","nestedProperties":{"imageUrl":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},"mainTop":{"dataType":"nestedObjectLiteral","nestedProperties":{"imageUrl":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateOutfitInputDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "mainTopUuid": {"dataType":"string"},
            "subTopUuid": {"dataType":"string"},
            "bottomUuid": {"dataType":"string"},
            "shoesUuid": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TopGarmentSizeType": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["XS"]},{"dataType":"enum","enums":["S"]},{"dataType":"enum","enums":["M"]},{"dataType":"enum","enums":["L"]},{"dataType":"enum","enums":["XL"]},{"dataType":"enum","enums":["XXL"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BottomGarmentSizeType": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"length":{"dataType":"double","required":true},"waist":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ShoeGarmentSizeType": {
        "dataType": "refAlias",
        "type": {"dataType":"double","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GarmentSizeType": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"TopGarmentSizeType"},{"ref":"BottomGarmentSizeType"},{"ref":"ShoeGarmentSizeType"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateGarmentInputDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "colors": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"string"}},{"dataType":"enum","enums":[null]}]},
            "size": {"dataType":"union","subSchemas":[{"ref":"GarmentSizeType"},{"dataType":"enum","enums":[null]}]},
            "brand": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GarmentCategoryLabelType": {
        "dataType": "refAlias",
        "type": {"dataType":"enum","enums":["BOTTOM","MAIN_TOP","SHOES","SUB_TOP"],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GarmentSubCategoryByCategoryLabelType": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["Dress"]},{"dataType":"enum","enums":["Jacket"]},{"dataType":"enum","enums":["Coat"]},{"dataType":"enum","enums":["Bomber"]},{"dataType":"enum","enums":["Vest"]},{"dataType":"enum","enums":["Sweater"]},{"dataType":"enum","enums":["Sweatshirt"]},{"dataType":"enum","enums":["Down_jacket"]},{"dataType":"enum","enums":["Shirt"]},{"dataType":"enum","enums":["T-shirt"]},{"dataType":"enum","enums":["Polo"]},{"dataType":"enum","enums":["Tank_top"]},{"dataType":"enum","enums":["Short_sleeve_shirt"]},{"dataType":"enum","enums":["Sport_top"]},{"dataType":"enum","enums":["Sleeveless_top"]},{"dataType":"enum","enums":["Pants"]},{"dataType":"enum","enums":["Skirt"]},{"dataType":"enum","enums":["Shorts"]},{"dataType":"enum","enums":["Leggings"]},{"dataType":"enum","enums":["Jeans"]},{"dataType":"enum","enums":["Bermuda_shorts"]},{"dataType":"enum","enums":["Jogging_pants"]},{"dataType":"enum","enums":["Overalls"]},{"dataType":"enum","enums":["Cargo_pants"]},{"dataType":"enum","enums":["Sneakers"]},{"dataType":"enum","enums":["Sandals"]},{"dataType":"enum","enums":["Boots"]},{"dataType":"enum","enums":["Dress_shoes"]},{"dataType":"enum","enums":["Loafers"]},{"dataType":"enum","enums":["Espadrilles"]},{"dataType":"enum","enums":["Flip-flops"]},{"dataType":"enum","enums":["Ankle_boots"]},{"dataType":"enum","enums":["Sports_shoes"]},{"dataType":"enum","enums":["Hiking_shoes"]},{"dataType":"enum","enums":["Flats"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GarmentSizeInterface": {
        "dataType": "refObject",
        "properties": {
            "value": {"ref":"GarmentSizeType","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GarmentInterface": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "userUuid": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "categoryLabel": {"ref":"GarmentCategoryLabelType","required":true},
            "subCategoryLabel": {"ref":"GarmentSubCategoryByCategoryLabelType","required":true},
            "imageUrl": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "colors": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"string"}},{"dataType":"enum","enums":[null]}]},
            "size": {"dataType":"union","subSchemas":[{"ref":"GarmentSizeInterface"},{"dataType":"enum","enums":[null]}]},
            "brand": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SearchUserGarmentsByNameOutputDto": {
        "dataType": "refObject",
        "properties": {
            "garments": {"dataType":"array","array":{"dataType":"refObject","ref":"GarmentInterface"},"required":true},
            "totalItems": {"dataType":"double","required":true},
            "itemsPerPage": {"dataType":"double","required":true},
            "currentPage": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetUserGarmentsByCategoryOutputDto": {
        "dataType": "refObject",
        "properties": {
            "garments": {"dataType":"array","array":{"dataType":"refObject","ref":"GarmentInterface"},"required":true},
            "totalItems": {"dataType":"double","required":true},
            "itemsPerPage": {"dataType":"double","required":true},
            "currentPage": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetUserGarmentsOutputDto": {
        "dataType": "refObject",
        "properties": {
            "garments": {"dataType":"array","array":{"dataType":"refObject","ref":"GarmentInterface"},"required":true},
            "totalItems": {"dataType":"double","required":true},
            "itemsPerPage": {"dataType":"double","required":true},
            "currentPage": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateGarmentOutputDto": {
        "dataType": "refObject",
        "properties": {
            "uuid": {"dataType":"string","required":true},
            "userUuid": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "categoryLabel": {"dataType":"string","required":true},
            "subCategoryLabel": {"dataType":"string","required":true},
            "imageUrl": {"dataType":"string","required":true},
            "colors": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"string"}},{"dataType":"enum","enums":[null]}]},
            "size": {"dataType":"union","subSchemas":[{"ref":"GarmentSizeType"},{"dataType":"enum","enums":[null]}]},
            "brand": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router,opts?:{multer?:ReturnType<typeof multer>}) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################

    const upload = opts?.multer ||  multer({"limits":{"fileSize":8388608}});

    
        app.get('/api/info',
            ...(fetchMiddlewares<RequestHandler>(ApiInfoController)),
            ...(fetchMiddlewares<RequestHandler>(ApiInfoController.prototype.getApiInfo)),

            async function ApiInfoController_getApiInfo(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ApiInfoController>(ApiInfoController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getApiInfo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/api/auth/change-password',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UpdateUserPasswordController)),
            ...(fetchMiddlewares<RequestHandler>(UpdateUserPasswordController.prototype.updateUserPassword)),

            async function UpdateUserPasswordController_updateUserPassword(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    body: {"in":"body","name":"body","required":true,"ref":"UpdateUserPasswordInputDto"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UpdateUserPasswordController>(UpdateUserPasswordController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'updateUserPassword',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/register',
            ...(fetchMiddlewares<RequestHandler>(RegisterUserController)),
            ...(fetchMiddlewares<RequestHandler>(RegisterUserController.prototype.registerUser)),

            async function RegisterUserController_registerUser(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    body: {"in":"body","name":"body","required":true,"ref":"RegisterUserInputDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<RegisterUserController>(RegisterUserController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'registerUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/login',
            ...(fetchMiddlewares<RequestHandler>(LoginUserController)),
            ...(fetchMiddlewares<RequestHandler>(LoginUserController.prototype.login)),

            async function LoginUserController_login(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    body: {"in":"body","name":"body","required":true,"ref":"LoginUserInputDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<LoginUserController>(LoginUserController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/outfit-plans/:uuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UpdateOutfitPlanController)),
            ...(fetchMiddlewares<RequestHandler>(UpdateOutfitPlanController.prototype.execute)),

            async function UpdateOutfitPlanController_execute(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    uuid: {"in":"path","name":"uuid","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"UpdateOutfitPlanInputDto"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UpdateOutfitPlanController>(UpdateOutfitPlanController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'execute',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/outfit-plans/:outfitUuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PlanOutfitController)),
            ...(fetchMiddlewares<RequestHandler>(PlanOutfitController.prototype.planOutfit)),

            async function PlanOutfitController_planOutfit(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    outfitUuid: {"in":"path","name":"outfitUuid","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"PlanOutfitInputDto"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<PlanOutfitController>(PlanOutfitController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'planOutfit',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/outfit-plans/:outfitUuid/incoming',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GetIncomingByOutfitUuidController)),
            ...(fetchMiddlewares<RequestHandler>(GetIncomingByOutfitUuidController.prototype.getIncomingByOutfitUuid)),

            async function GetIncomingByOutfitUuidController_getIncomingByOutfitUuid(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    outfitUuid: {"in":"path","name":"outfitUuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<GetIncomingByOutfitUuidController>(GetIncomingByOutfitUuidController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getIncomingByOutfitUuid',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/outfit-plans/:uuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(DeleteOutfitPlanByUuidController)),
            ...(fetchMiddlewares<RequestHandler>(DeleteOutfitPlanByUuidController.prototype.deleteOutfitPlanByUuid)),

            async function DeleteOutfitPlanByUuidController_deleteOutfitPlanByUuid(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    uuid: {"in":"path","name":"uuid","required":true,"dataType":"string"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<DeleteOutfitPlanByUuidController>(DeleteOutfitPlanByUuidController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'deleteOutfitPlanByUuid',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/outfits/:uuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UpdateOutfitController)),
            ...(fetchMiddlewares<RequestHandler>(UpdateOutfitController.prototype.updateOutfit)),

            async function UpdateOutfitController_updateOutfit(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    uuid: {"in":"path","name":"uuid","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"UpdateOutfitInputDto"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UpdateOutfitController>(UpdateOutfitController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'updateOutfit',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/outfits',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GetUserOutfitsController)),
            ...(fetchMiddlewares<RequestHandler>(GetUserOutfitsController.prototype.getUserOutfits)),

            async function GetUserOutfitsController_getUserOutfits(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    page: {"default":1,"in":"query","name":"page","dataType":"double"},
                    limit: {"default":10,"in":"query","name":"limit","dataType":"double"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<GetUserOutfitsController>(GetUserOutfitsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getUserOutfits',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/outfits/:uuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GetUserOutfitDetailsController)),
            ...(fetchMiddlewares<RequestHandler>(GetUserOutfitDetailsController.prototype.getUserOutfitDetails)),

            async function GetUserOutfitDetailsController_getUserOutfitDetails(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    uuid: {"in":"path","name":"uuid","required":true,"dataType":"string"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<GetUserOutfitDetailsController>(GetUserOutfitDetailsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getUserOutfitDetails',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/outfits/:uuid/view',
            ...(fetchMiddlewares<RequestHandler>(GetOutfitViewController)),
            ...(fetchMiddlewares<RequestHandler>(GetOutfitViewController.prototype.getOutfitView)),

            async function GetOutfitViewController_getOutfitView(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    uuid: {"in":"path","name":"uuid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<GetOutfitViewController>(GetOutfitViewController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getOutfitView',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/outfits/:uuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(DeleteOutfitByUuidController)),
            ...(fetchMiddlewares<RequestHandler>(DeleteOutfitByUuidController.prototype.deleteByUuid)),

            async function DeleteOutfitByUuidController_deleteByUuid(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    uuid: {"in":"path","name":"uuid","required":true,"dataType":"string"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<DeleteOutfitByUuidController>(DeleteOutfitByUuidController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'deleteByUuid',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/outfits',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(CreateOutfitController)),
            ...(fetchMiddlewares<RequestHandler>(CreateOutfitController.prototype.createOutfit)),

            async function CreateOutfitController_createOutfit(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    body: {"in":"body","name":"body","required":true,"ref":"CreateOutfitInputDto"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CreateOutfitController>(CreateOutfitController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'createOutfit',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/garments/:uuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UpdateGarmentController)),
            ...(fetchMiddlewares<RequestHandler>(UpdateGarmentController.prototype.updateGarment)),

            async function UpdateGarmentController_updateGarment(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    uuid: {"in":"path","name":"uuid","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"UpdateGarmentInputDto"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UpdateGarmentController>(UpdateGarmentController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'updateGarment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/garments/search',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(SearchUserGarmentsByNameController)),
            ...(fetchMiddlewares<RequestHandler>(SearchUserGarmentsByNameController.prototype.searchUserGarmentsByName)),

            async function SearchUserGarmentsByNameController_searchUserGarmentsByName(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    name: {"in":"query","name":"name","required":true,"dataType":"string"},
                    page: {"default":1,"in":"query","name":"page","dataType":"double"},
                    limit: {"default":10,"in":"query","name":"limit","dataType":"double"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<SearchUserGarmentsByNameController>(SearchUserGarmentsByNameController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'searchUserGarmentsByName',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/garments/:category',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GetUserGarmentsByCategoryController)),
            ...(fetchMiddlewares<RequestHandler>(GetUserGarmentsByCategoryController.prototype.getUserGarmentsByCategory)),

            async function GetUserGarmentsByCategoryController_getUserGarmentsByCategory(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    page: {"default":1,"in":"query","name":"page","dataType":"double"},
                    limit: {"default":10,"in":"query","name":"limit","dataType":"double"},
                    category: {"in":"path","name":"category","required":true,"ref":"GarmentCategoryLabelType"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<GetUserGarmentsByCategoryController>(GetUserGarmentsByCategoryController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getUserGarmentsByCategory',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/garments',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(GetUserGarmentsController)),
            ...(fetchMiddlewares<RequestHandler>(GetUserGarmentsController.prototype.getUserGarments)),

            async function GetUserGarmentsController_getUserGarments(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    page: {"default":1,"in":"query","name":"page","dataType":"double"},
                    limit: {"default":10,"in":"query","name":"limit","dataType":"double"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<GetUserGarmentsController>(GetUserGarmentsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getUserGarments',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/garments/:uuid',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(DeleteGarmentByUuidController)),
            ...(fetchMiddlewares<RequestHandler>(DeleteGarmentByUuidController.prototype.deleteGarmentByUuid)),

            async function DeleteGarmentByUuidController_deleteGarmentByUuid(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    uuid: {"in":"path","name":"uuid","required":true,"dataType":"string"},
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<DeleteGarmentByUuidController>(DeleteGarmentByUuidController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'deleteGarmentByUuid',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/garments',
            authenticateMiddleware([{"jwt":[]}]),
            upload.fields([{"name":"image","maxCount":1,"multiple":false}]),
            ...(fetchMiddlewares<RequestHandler>(CreateGarmentController)),
            ...(fetchMiddlewares<RequestHandler>(CreateGarmentController.prototype.createGarment)),

            async function CreateGarmentController_createGarment(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    name: {"in":"formData","name":"name","required":true,"dataType":"string"},
                    categoryLabel: {"in":"formData","name":"categoryLabel","required":true,"dataType":"string"},
                    subCategoryLabel: {"in":"formData","name":"subCategoryLabel","required":true,"dataType":"string"},
                    image: {"in":"formData","name":"image","required":true,"dataType":"file"},
                    colors: {"in":"formData","name":"colors","dataType":"string"},
                    size: {"in":"formData","name":"size","dataType":"string"},
                    brand: {"in":"formData","name":"brand","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CreateGarmentController>(CreateGarmentController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'createGarment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
