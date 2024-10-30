import { StorageStrategyInterface } from './StorageStrategy.interface';
import { v2 as cloudinary } from 'cloudinary';
import { inject, injectable } from 'tsyringe';
import { Logger } from '../../../utilities/constants';
import { LoggerInterface } from '../../../entities/logger/Logger.interface';
import { ApiError, ApiErrorCode } from '../../../entities/error';

@injectable()
export class CloudinaryStorageStrategy implements StorageStrategyInterface {
    constructor(@inject(Logger) private readonly logger: LoggerInterface) {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        });

        cloudinary.api
            .ping()
            .then(() => {
                this.logger.info('Cloudinary a été configuré et connecté correctement.');
            })
            .catch((error) => {
                this.logger.error('Erreur lors de la connexion à Cloudinary:', error);
            });
    }

    upload(file: Buffer, filePath: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    { public_id: filePath, access_mode: 'authenticated' },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else if (result) {
                            resolve(result.secure_url);
                        } else {
                            reject(
                                new ApiError(
                                    ApiErrorCode.InternalError,
                                    'storage/failed-to-upload',
                                    'Failed to upload image',
                                ),
                            );
                        }
                    },
                )
                .end(file);
        });
    }
}
