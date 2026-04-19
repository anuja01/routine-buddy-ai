export type BennyAnimation =
  | 'idle'
  | 'wakeUp'
  | 'toilet'
  | 'washFace'
  | 'brushTeeth'
  | 'getDressed'
  | 'eatBreakfast'
  | 'celebrate';

export interface Action {
  id: string;
  routineId: string;
  name: string;
  icon: string;
  durationSeconds: number;
  bennyAnimation: BennyAnimation;
  encouragements: string[];
}
