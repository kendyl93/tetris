import { STAGE } from "./contants";
import { fillWith } from "../../utils/array";

const STAGE_ROWS = Array(STAGE.HEIGHT);
const STAGE_COLUMNS = Array(STAGE.WIDTH);

export const createStage = () =>
  Array.from(STAGE_ROWS, () => fillWith(STAGE_COLUMNS, STAGE.EMPTY_CELL));
