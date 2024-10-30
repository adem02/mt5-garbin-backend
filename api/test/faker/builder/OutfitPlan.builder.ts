import { ResourceId } from '../../../src/utilities/ResourceId';
import { OutfitPlan } from '../../../src/entities/OutfitPlan';

export class OutfitPlanBuilder {
    private uuid: string;
    private name: string;
    private userUuid: string;
    private outfitUuid: string;
    private date: Date;
    private createdAt: Date;
    private location: string;
    private updatedAt?: Date | null;

    constructor() {
        this.uuid = ResourceId.generateUuid();
        this.name = 'name';
        this.userUuid = ResourceId.generateUuid();
        this.outfitUuid = ResourceId.generateUuid();
        this.date = new Date();
        this.createdAt = new Date();
        this.location = 'location';
        this.updatedAt = new Date();
    }

    withUuid(uuid: string): OutfitPlanBuilder {
        this.uuid = uuid;
        return this;
    }

    withName(name: string): OutfitPlanBuilder {
        this.name = name;
        return this;
    }

    withUserUuid(userUuid: string): OutfitPlanBuilder {
        this.userUuid = userUuid;
        return this;
    }

    withOutfitUuid(outfitUuid: string): OutfitPlanBuilder {
        this.outfitUuid = outfitUuid;
        return this;
    }

    withDate(date: Date): OutfitPlanBuilder {
        this.date = date;
        return this;
    }

    withCreatedAt(createdAt: Date): OutfitPlanBuilder {
        this.createdAt = createdAt;
        return this;
    }

    withLocation(location: string): OutfitPlanBuilder {
        this.location = location;
        return this;
    }

    withUpdatedAt(updatedAt: Date | null): OutfitPlanBuilder {
        this.updatedAt = updatedAt;
        return this;
    }

    build(): OutfitPlan {
        return new OutfitPlan(
            this.uuid,
            this.name,
            this.userUuid,
            this.outfitUuid,
            this.date,
            this.createdAt,
            this.location,
            this.updatedAt,
        );
    }
}
