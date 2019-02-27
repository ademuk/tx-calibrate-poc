import React, {useState} from 'react';
import ChannelDetect from './start/ChannelDetect';
import useMsp from "../../msp/useMsp";


const CHANNELS = [
  {
    name: 'Throttle',
    code: 'T'
  },
  {
    name: 'Yaw',
    code: 'R'
  },
  {
    name: 'Pitch',
    code: 'E'
  },
  {
    name: 'Roll',
    code: 'A'
  }
];

export default ({txValues, onDone}) => {

  if (txValues === null) {
    return 'Loading'
  }

  const [currentChannel, setCurrentChannel] = useState(0);
  const [detectedChannels, setDetectedChannels] = useState({});
  const [initialMins, setMins] = useState(txValues);
  const [initialMaxs, setMaxs] = useState(txValues);
  const [rxRange, setRxRange] = useMsp('rxrange');
  const [rxMap, setRxMap] = useMsp('rxmap');

  function detectedChannelsToChannelMapping(detectedChannels) {
    const txToChannels = Object.keys(detectedChannels).reduce((prev, curr) => {
      prev[detectedChannels[curr]] = curr;
      return prev;
    }, {});

    const mapping = CHANNELS.map((channel, i) => {
      const ch = txToChannels[i];
      return CHANNELS[ch].code;
    });
    return mapping;
  }

  function getRxRange() {
    return minVals.map((v, i) => [v, maxVals[i]]);
  }

  function handleNext() {
    setCurrentChannel(currentChannel + 1);
  }

  function handleDetect(channel) {
    setDetectedChannels({
      ...detectedChannels,
      [currentChannel]: channel
    });
  }

  function handleRestart() {
    setCurrentChannel(0);
    setDetectedChannels({});
    setMins(txValues);
    setMaxs(txValues);
  }

  function handleApply() {
    const mapping = detectedChannelsToChannelMapping(detectedChannels);

    setRxMap(`${mapping.join('')}1234`);
    setRxRange(getRxRange());

    onDone();
  }

  const minVals = txValues.map((val, i) => Math.min(initialMins[i], val));
  const maxVals = txValues.map((val, i) => Math.max(initialMaxs[i], val));

  if (!initialMaxs.every((val, i) => val === maxVals[i])) {
    setMaxs(maxVals);
  }

  if (!initialMins.every((val, i) => val === minVals[i])) {
    setMins(minVals);
  }

  return <div>
    {currentChannel !== CHANNELS.length && txValues.map((value, i) => {
      const channelIsAssigned = Object.values(detectedChannels).indexOf(i);
      return (
        <div key={i}>
          <code>
          {value}
          {channelIsAssigned > -1 && ` ${CHANNELS[channelIsAssigned].name}`}
          {channelIsAssigned > -1 && `[${minVals[i]}-${maxVals[i]}]`}
          </code>
        </div>
      )
    })}

    {CHANNELS.map(({name}, i) => {
      return currentChannel === i &&
        <ChannelDetect name={name}
                       txValues={txValues}
                       detectedChannels={detectedChannels}
                       onDetect={handleDetect}
                       key={name} />
    })}

    {currentChannel < CHANNELS.length &&
    <button onClick={handleNext} disabled={currentChannel === Object.keys(detectedChannels).length}>
      Next
    </button>}

    {currentChannel === CHANNELS.length && <div>
      <p>The following settings are ready to be applied:</p>
      <ul>
        <li>rxrange:
          <ul>
            {getRxRange().map(([min, max]) => <li>{`${min} - ${max}`}</li>)}
          </ul>
        </li>
        <li>Channel mapping: {detectedChannelsToChannelMapping(detectedChannels)}</li>
      </ul>
    </div>
    }

    {!!currentChannel && currentChannel !== CHANNELS.length &&
    <button onClick={handleRestart}>Restart</button>}

    {currentChannel === CHANNELS.length &&
    <button onClick={handleApply}>Apply settings</button>}
  </div>
}
