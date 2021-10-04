import { ONE_SECOND, TIME_OFFSET } from "../constants";

export const calculateDropTime = (level: number) =>
  ONE_SECOND / level + TIME_OFFSET;
