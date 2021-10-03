import { useState, useCallback, useEffect } from "react";

export const useGameStatus = (clearedRows: number) => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(1);

  const LINE_POINTS = [40, 100, 300, 1200]; // https://tetris.wiki/Scoring

  const calculateScore = useCallback(() => {
    if (clearedRows > 0) {
      setScore((prev) => prev + LINE_POINTS[clearedRows - 1] * level);
      setRows((prev) => prev + clearedRows);
    }
  }, [level, LINE_POINTS, clearedRows]);

  useEffect(() => {
    calculateScore();
  }, [calculateScore, clearedRows, score]);

  return [score, setScore, rows, setRows, level, setLevel] as const;
};
