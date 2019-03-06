import React from 'react';
import useMsp from "./useMsp";
import styles from './MockMsp.module.css';

export default () => {
  const [rxRanges, setRxranges] = useMsp('rxrange');
  const [channelMapping, setChannelMapping] = useMsp('rxmap');

  function handleRxRangeChange(ch, i) {
    return event => {
      setRxranges(rxRanges.map(([min, max], row) => {
        return row === ch ? i === 0 ? [parseInt(event.target.value, 10), max] : [min, parseInt(event.target.value, 10)] : [min, max]
      }))
    }
  }

  function onChannelMappingChange(event) {
    setChannelMapping(event.target.value)
  }

  return (<div className={styles.MockMsp}>
    <div>
    <h3>MSP</h3>

    <div style={{float: "right"}}>
      <h4>Channel mapping</h4>
      <select value={channelMapping} onChange={onChannelMappingChange}>
        <option value="AETR1234">AETR (FrSky / Futaba / Hitec)</option>
        <option value="TAER1234">TAER (Spektrum / Graupner / JR)</option>
      </select>
    </div>

    <h4>rxrange</h4>
    {rxRanges.map(([min, max], i) => {
      return <div key={i}>
        ch{i+1} <input value={min} onChange={handleRxRangeChange(i, 0)} type="number" className={styles.inlineInput} />
        -
        <input value={max} onChange={handleRxRangeChange(i, 1)} type="number" className={styles.inlineInput} />
      </div>
    })}
    </div>
  </div>)
}
