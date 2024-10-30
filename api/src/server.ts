import { ServerManager } from './server_manager';
import { container } from 'tsyringe';

const server = container.resolve(ServerManager);

server.start().then((app) => {
    const shutdown = async (): Promise<void> => {
        console.debug('Stopping server...');
        await server.stop(app);
    };

    process.on('SIGINT', async function () {
        await shutdown();
        process.exit(0);
    });

    process.on('SIGTERM', async function () {
        await shutdown();
        process.exit(0);
    });
});
