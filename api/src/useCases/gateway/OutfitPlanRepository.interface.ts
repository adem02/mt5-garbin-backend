import { OutfitPlan } from '../../entities/OutfitPlan';

export interface OutfitPlanRepositoryInterface {
    create(outfitPlan: OutfitPlan): Promise<void>;
    getByUuid(uuid: string): Promise<OutfitPlan>;
    update(outfitPlan: OutfitPlan): Promise<void>;
    deleteByUuid(uuid: string): Promise<void>;
    findOutfitPlanHistoryByOutfitUuid(outfitUuid: string): Promise<OutfitPlan[]>;
    getOutfitPlanHistoryCountByOutfitUuid(outfitUuid: string): Promise<number>;
    findIncomingByOutfitUuid(outfitUuid: string): Promise<OutfitPlan[]>;
}
