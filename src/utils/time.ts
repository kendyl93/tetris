import { ONE_CYCLE, TIME_OFFSET } from '../constants';

export const calculateDropTime = (level: number) =>
  ONE_CYCLE / level + TIME_OFFSET;
