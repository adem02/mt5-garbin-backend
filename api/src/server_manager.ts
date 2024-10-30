import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import Express, { json, urlencoded } from 'express';
import { Server, createServer } from 'http';
import cors from 'cors';
import { container, inject, injectable } from 'tsyringe';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './frameworks/tsoa/routes';
import { ErrorHandlerMiddleware } from './adapters/middlewares/error-handler.middleware';
import { Logger } from './utilities/constants';
import { LoggerInterface } from './entities/logger/Logger.interface';
import AppDataSource from './frameworks/db/data-source';
import { Seeder } from './frameworks/db/seeds';

@injectable()
export class ServerManager {
    private readonly PORT: number = Number(process.env.API_PORT) || 5001;
    readonly app = Express();

    constructor(@inject(Logger) private readonly logger: LoggerInterface) {
        this.app.use(
            cors({
                origin: '*',
                methods: 'GET,POST,PUT,DELETE',
                allowedHeaders: 'Authorization, Content-Type',
            }),
        );

        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));

        RegisterRoutes(this.app);

        this.app.use(Express.static('public'));
        this.app.use(
            '/docs',
            swaggerUi.serve,
            swaggerUi.setup(undefined, {
                swaggerOptions: {
                    url: '/swagger.json',
                },
            }),
        );

        this.app.use(ErrorHandlerMiddleware);
    }

    start(): Promise<Server> {
        return new Promise<Server>((resolve) => {
            const server = createServer(this.app);

            AppDataSource.initialize()
                .then(() => {
                    this.logger.info('Data Source has been initialized!');

                    if (process.env.NODE_ENV === 'development') {
                        (async (): Promise<void> => {
                            await container.resolve(Seeder).runSeeds();
                        })();
                    }

                    server.listen(this.PORT, () => {
                        this.logger.info(`API Listening on port ${this.PORT}`);
                        this.logger.debug(`We are in ${process.env.NODE_ENV} mode`);

                        resolve(server);
                    });
                })
                .catch((err: any) => {
                    this.logger.error(err);
                });
        });
    }

    stop = async (server?: Server): Promise<void> => {
        if (!server) {
            return;
        }
        return new Promise<void>((resolve, reject) => {
            server.close((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };
}
