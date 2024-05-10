export interface RecordProp {
    _id: string;
    surgicalprocedure: string;
    surgicaldate: Date;
    surgicalstatus: string;
    latestresult: {
      bleedChoice: number;
      painLevel: number;
      takenMedication: boolean;
      painDecreased: boolean;
      swellingLevel: number;
      days: number;
      symptoms: boolean;
      canEat: boolean;
      eatSoftFood: boolean;
      canBrush: boolean;
    };
 }

export interface StatusOrder {
    [key: string]: number;
  }