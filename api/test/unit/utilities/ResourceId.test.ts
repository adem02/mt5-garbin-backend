import { ResourceId } from '../../../src/utilities/ResourceId';

describe('Unit: Resource id utility', () => {
    it('should return a uuid', () => {
        const uuid = ResourceId.generateUuid();

        expect(uuid).toMatch(
            /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/,
        );
    });

    it('should validate a valid uuid', () => {
        const validUuid = ResourceId.generateUuid();
        const invalidUuid = 'invalid-uuid';

        expect(ResourceId.validateUuid(validUuid)).toBe(true);
        expect(ResourceId.validateUuid(invalidUuid)).toBe(false);
    });
});
