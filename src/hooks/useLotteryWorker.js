import { useRef } from "react";

export function useLotteryWorker() {
  const workerRef = useRef(null);

  const runSimulation = (params, callback) => {
    if (!workerRef.current) {
      workerRef.current = new Worker(
       new URL("../workers/lotteryWorker.js", import.meta.url)
      );
    }

    workerRef.current.onmessage = (e) => {
      callback(e.data);
    };

    workerRef.current.postMessage(params);
  };

  return { runSimulation };
}
