import { inject, injectable } from 'tsyringe';
import { Logger } from '../../../utilities/constants';
import { LoggerInterface } from '../../../entities/logger/Logger.interface';
import admin from 'firebase-admin';
import { StorageStrategyInterface } from './StorageStrategy.interface';

@injectable()
export class FirebaseStorageStrategy implements StorageStrategyInterface {
    constructor(@inject(Logger) private readonly logger: LoggerInterface) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            }),
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        });

        const bucket = admin.storage().bucket(process.env.FIREBASE_STORAGE_BUCKET);

        bucket
            .getFiles({ maxResults: 1 })
            .then(() => {
                this.logger.info('Firebase Admin et Storage ont été initialisés correctement.');
            })
            .catch((error) => {
                this.logger.error("Erreur lors de l'initialisation de Firebase Storage:", error);
            });
    }

    async upload(fileBuffer: Buffer, filePath: string): Promise<string> {
        const file = admin.storage().bucket().file(filePath);
        await file.save(fileBuffer);
        await file.makePublic();

        return file.publicUrl();
    }
}
