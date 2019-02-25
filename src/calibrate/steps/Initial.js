import React from 'react';
import useMsp from "../../msp/useMsp";

export default ({onStart}) => {
  const channels = useMsp('rxrange');
  const isRxRangeNonDefault = channels => channels.some(([min, max]) => min !== 1000 || max !== 2000);

  return channels === null ? 'Loading' : <div>
    {isRxRangeNonDefault(channels) && <p>Your rxrange has custom values. Running this calibrator will reset these.</p>}

    <button onClick={onStart}>Start calibration</button>

    {false && channels.map(([min, max], i) => <div key={i}>{min} - {max}</div>)}
  </div>
}
