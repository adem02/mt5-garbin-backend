import { IocContainer } from '@tsoa/runtime';
import { container } from 'tsyringe';

import './registerDependencies';

export const iocContainer: IocContainer = {
    get: <T>(controller: { prototype: T }): T => {
        return container.resolve<T>(controller as never);
    },
};
