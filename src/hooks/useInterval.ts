import { useEffect, useRef } from "react";

type IntervalCallback = () => unknown | void;

const useInterval = (callback: IntervalCallback, delay: number | null) => {
  const savedCallback = useRef<IntervalCallback | null>(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
};

export default useInterval;
