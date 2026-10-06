import { create } from "zustand";
import type { ResourceType } from "../types/Map";
import type { BuildingDataType } from "../types/Buildings";

type ResourceStoreType = {
    gold: number,
    wood: number,
    stone: number,
    food: number,
    people: number,

    spendGold: (amount: number) => boolean,
    receiveGold: (amount: number) => void,

    addResource: (type: ResourceType, amount: number) => void,
    spendResource: (type: ResourceType, amount: number) => boolean,
}

export const useResourceStore = create<ResourceStoreType>((set)=>({
    gold: 1000,
    wood: 0,
    stone: 0,
    food: 0,
    people: 0,

    spendGold: (amount: number) => { 
        if(amount > 0 && amount <= useResourceStore.getState().gold) {
            set((state) => ({ gold: state.gold - amount }));
            return true;
        }
        return false;
    },
    receiveGold: (amount: number) => { set((state) => ({ gold: state.gold + amount })) },

    addResource: (type: ResourceType, amount: number) => { set((state) => ({ [type]: state[type] + amount })) },

    spendResource: (type: ResourceType, amount: number) => { 
        if(amount > 0 && amount <= useResourceStore.getState()[type]) {
            set((state) => ({ [type]: state[type] - amount }));
            return true;
        }
        return false;
    }
}))

export function buildABuilding(building: BuildingDataType): boolean {
    if(building.cost.food && building.cost.food <= useResourceStore().food &&
    building.cost.wood && building.cost.wood <= useResourceStore().wood &&
    building.cost.stone && building.cost.stone <= useResourceStore().stone &&
    building.cost.people && building.cost.people <= useResourceStore().people &&
    building.cost.gold && building.cost.gold <= useResourceStore().gold) {
        if(building.cost.food) useResourceStore.getState().spendResource("food", building.cost.food);
        if(building.cost.wood) useResourceStore.getState().spendResource("wood", building.cost.wood);
        if(building.cost.stone) useResourceStore.getState().spendResource("stone", building.cost.stone);
        if(building.cost.people) useResourceStore.getState().spendResource("people", building.cost.people);
        if(building.cost.gold) useResourceStore.getState().spendGold(building.cost.gold);
        return true;
    }
    return false;
    
}