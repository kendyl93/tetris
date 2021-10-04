import { useState, useCallback, useEffect } from "react";
import { LINE_POINTS, EMPTY } from "../constants";
import { sum } from "../utils/math";

const countPoints = (
  pointsEarned: number,
  clearedRows: number,
  level: number
) => pointsEarned + LINE_POINTS[clearedRows - 1] * level;

export const useGameStatus = (clearedRows: number) => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(1);

  const calculateScore = useCallback(() => {
    if (clearedRows > EMPTY) {
      setScore((pointsEarned) => countPoints(pointsEarned, clearedRows, level));
      setRows((rowsClearedSoFar) => sum(rowsClearedSoFar, clearedRows));
    }
  }, [level, clearedRows]);

  useEffect(() => {
    calculateScore();
  }, [calculateScore, clearedRows, score]);

  return [score, setScore, rows, setRows, level, setLevel] as const;
};
