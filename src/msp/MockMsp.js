import React from 'react';
import useMsp from "./useMsp";

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

  return (<div>
    <div>
    <h2>Mock MSP</h2>
    <h3>rxrange</h3>
    {rxRanges.map(([min, max], i) => {
      return <div key={i}>
        ch{i+1} <input value={min} onChange={handleRxRangeChange(i, 0)} type="number" />
        -
        <input value={max} onChange={handleRxRangeChange(i, 1)} type="number" />
      </div>
    })}
    </div>
    <div>
      <h3>Channel mapping</h3>
      <select value={channelMapping} onChange={onChannelMappingChange}>
        <option value="AETR1234">AETR (FrSky / Futaba / Hitec)</option>
        <option value="TAER1234">TAER (Spektrum / Graupner / JR)</option>
      </select>
    </div>
  </div>)
}
