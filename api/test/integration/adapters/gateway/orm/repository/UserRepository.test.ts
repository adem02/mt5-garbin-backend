import 'reflect-metadata';
import { ResourceId } from '../../../../../../src/utilities/ResourceId';
import { UserRepository } from '../../../../../../src/adapters/gateway/orm/repository/User.repository';
import { container } from 'tsyringe';
import { TestDbConfig } from '../../../../../test-db.config';
import { UserBuilder } from '../../../../../faker/builder/User.builder';
import { User } from '../../../../../../src/entities/User';

describe('Integration: User repository test', () => {
    let userRepo: UserRepository;
    let userBuilder: UserBuilder;
    let user: User;
    const userUuid = ResourceId.generateUuid();

    beforeEach(async () => {
        await TestDbConfig.Reset();

        userRepo = container.resolve(UserRepository);
        userBuilder = new UserBuilder();
    });

    afterEach(async () => {
        await TestDbConfig.ClearDatabase();
    });

    afterAll(async () => {
        await TestDbConfig.Close();
    });

    it('should create a user successfully', async () => {
        const userUuid = ResourceId.generateUuid();
        const newUser = userBuilder
            .withUuid(userUuid)
            .withUsername('newUser')
            .withEmail('newUser@email.com')
            .build();

        await userRepo.create(newUser);

        const createdUser = await userRepo.findByEmail('newUser@email.com');

        expect(createdUser).not.toBeNull();
        expect(createdUser?.uuid).toBe(userUuid);
    });

    it('should throw if user already exists', async () => {
        user = userBuilder.withUuid(userUuid).build();
        await userRepo.create(user);

        await expect(userRepo.create(user)).rejects.toThrow('User already exists');
    });

    it('should find a user by email successfully', async () => {
        user = userBuilder.withUuid(userUuid).build();
        await userRepo.create(user);

        const foundUser = await userRepo.findByEmail(user.email);

        expect(foundUser).not.toBeNull();
        expect(foundUser?.uuid).toBe(userUuid);
        expect(foundUser?.email).toBe(user.email);
    });

    it('should find a user by uuid successfully', async () => {
        user = userBuilder.withUuid(userUuid).withEmail('user@email.com').build();
        await userRepo.create(user);

        const foundUser = await userRepo.getByUuid(userUuid);

        expect(foundUser).not.toBeNull();
        expect(foundUser?.uuid).toBe(userUuid);
        expect(foundUser?.email).toBe(user.email);
    });

    it('throws if user not found', async () => {
        await expect(userRepo.getByUuid(userUuid)).rejects.toThrow('User not found');
    });

    it('should update use password successfully', async () => {
        user = userBuilder.withUuid(userUuid).build();
        await userRepo.create(user);

        const newPassword = 'newPassword';
        await userRepo.updatePassword(user, newPassword);

        const updatedUser = await userRepo.getByUuid(userUuid);

        expect(updatedUser.uuid).toBe(userUuid);
        expect(updatedUser.password).toBe(newPassword);
    });
});
