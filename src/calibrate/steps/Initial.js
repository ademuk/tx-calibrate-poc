import React from 'react';
import useMsp from "../../msp/useMsp";

const DEFAULT_RX_RANGE_MIN = 1000;
const DEFAULT_RX_RANGE_MAX = 2000;

export default ({onStart}) => {
  const [rxRanges, setRxRanges] = useMsp('rxrange');

  const isRxRangeDefault = channels => channels.every(([min, max]) => min === DEFAULT_RX_RANGE_MIN && max === DEFAULT_RX_RANGE_MAX);

  function handleStart() {
    if (!isRxRangeDefault(rxRanges)) {
      setRxRanges(rxRanges.map(() => [DEFAULT_RX_RANGE_MIN, DEFAULT_RX_RANGE_MAX]))
    }
    onStart();
  }

  return rxRanges === null ? 'Loading' : <div>
    {!isRxRangeDefault(rxRanges) && <p>Your rxrange has custom values. Running this calibrator will reset these.</p>}

    <button onClick={handleStart}>Start calibration</button>

    {false && rxRanges.map(([min, max], i) => <div key={i}>{min} - {max}</div>)}
  </div>
}
