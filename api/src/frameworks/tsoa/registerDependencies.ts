import { container } from 'tsyringe';
import { ApiInfoRepository } from '../../adapters/gateway/orm/repository/ApiInfoRepository';
import {
    ApiInfoRepository as ApiInfoRepositoryInterface,
    Logger,
    PasswordManager as PasswordManagerToken,
    UserRepository as UserRepositoryToken,
    JwtManager as JwtManagerToken,
    GarmentRepositoryToken,
    StorageStrategyToken,
    StorageManagerToken,
    OutfitRepositoryToken,
    OutfitPlanRepositoryToken,
} from '../../utilities/constants/di.constants';
import { LoggerService } from '../../adapters/services/Logger.service';
import { LoggerInterface } from '../../entities/logger/Logger.interface';
import { UserRepository } from '../../adapters/gateway/orm/repository/User.repository';
import { PasswordManager } from '../../adapters/gateway/PasswordManager';
import { JwtManager } from '../../adapters/gateway/JwtManager';
import { GarmentRepository } from '../../adapters/gateway/orm/repository/Garment.repository';
import { FirebaseStorageStrategy } from '../../adapters/gateway/storage/FirebaseStorage.strategy';
import { CloudinaryStorageStrategy } from '../../adapters/gateway/storage/CloudinaryStorage.strategy';
import { StorageManager } from '../../adapters/gateway/storage/StorageManager';
import { OutfitRepository } from '../../adapters/gateway/orm/repository/Outfit.repository';
import { OutfitPlanRepository } from '../../adapters/gateway/orm/repository/OutfitPlan.repository';

container.register(ApiInfoRepositoryInterface, { useClass: ApiInfoRepository });
container.registerSingleton<LoggerInterface>(Logger, LoggerService);
container.registerSingleton(UserRepositoryToken, UserRepository);
container.registerSingleton(PasswordManagerToken, PasswordManager);
container.registerSingleton(JwtManagerToken, JwtManager);
container.registerSingleton(GarmentRepositoryToken, GarmentRepository);
container.registerSingleton(OutfitRepositoryToken, OutfitRepository);
container.registerSingleton(OutfitPlanRepositoryToken, OutfitPlanRepository);
container.registerSingleton(StorageManagerToken, StorageManager);
((): void => {
    if (process.env.NODE_ENV !== 'development') {
        container.registerSingleton(StorageStrategyToken, CloudinaryStorageStrategy);
    } else {
        container.registerSingleton(StorageStrategyToken, FirebaseStorageStrategy);
    }
})();
