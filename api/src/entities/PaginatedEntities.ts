export class PaginatedEntities<T> {
    constructor(
        public readonly data: T[],
        public readonly totalItems: number,
    ) {}
}
