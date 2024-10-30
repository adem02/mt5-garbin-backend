import { ServerManager } from '../src/server_manager';
import { container } from 'tsyringe';
import { Server } from 'http';

export class TestServer {
    private static server: Server | undefined;

    static async Start(): Promise<void> {
        if (this.server) {
            return;
        }

        await container
            .resolve(ServerManager)
            .start()
            .then((server) => {
                console.log(`Server started on port ${process.env.NODE_ENV} mode`);
                this.server = server;
            });
    }

    static async Stop(): Promise<void> {
        await container.resolve(ServerManager).stop(this.server);
    }
}
