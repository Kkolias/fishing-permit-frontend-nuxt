export enum LakeId {
    salaisjarvi = "salaisjarvi",
  }
  
  export enum FishSpecies {
    kirjolohi = "kirjolohi",
    ahven = "ahven",
  }
  
  export interface CatchedFish {
    specie: FishSpecies;
    weightInGrams: number;
  }
  
  export interface IFishingPermit {
    firstName: string;
    lastName: string;
    email: string;
    startsAt: string;
    endsAt: string;
    createdAt: string;
    userId: string;
    lakeId: LakeId;
    catches: CatchedFish[];
  }