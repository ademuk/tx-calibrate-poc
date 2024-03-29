import React from 'react';
import useMsp from "../../msp/useMsp";
import styles from './Initial.module.css';

const DEFAULT_RX_RANGE_MIN = 1000;
const DEFAULT_RX_RANGE_MAX = 2000;

export default ({onStart}) => {
  const [rxRanges, setRxRanges] = useMsp('rxrange');

  const isRxRangeDefault = channels => channels.every(([min, max]) => min === DEFAULT_RX_RANGE_MIN && max === DEFAULT_RX_RANGE_MAX);

  function handleStart() {
    if (!isRxRangeDefault(rxRanges)) {
      setRxRanges(rxRanges.map(() => [DEFAULT_RX_RANGE_MIN, DEFAULT_RX_RANGE_MAX]))
    }
    onStart && onStart();
  }

  return rxRanges === null ? 'Loading' : <div>
    <p>Before you start:</p>
    <ol>
      {!isRxRangeDefault(rxRanges) && <li>Your rxrange setting has custom values. Running this calibration will reset these</li>}
      <li>It is recommended that you reset any custom endpoints and/or trims on your transmitter</li>
      <li>Power up you receiver and transmitter (Don't forget to remove your props if applicable)</li>
    </ol>

    <div className={styles.buttons}>
      <button onClick={handleStart} className="button">Start Calibration</button>
    </div>

    {false && rxRanges.map(([min, max], i) => <div key={i}>{min} - {max}</div>)}
  </div>
}
