export type ClassConstructor<T> = {
    new (...args: any[]): T;
};

export function plainToClassInstance<T extends object>(
    cls: ClassConstructor<T>,
    plainObject: T,
): T {
    return Object.assign(new cls(), plainObject);
}
