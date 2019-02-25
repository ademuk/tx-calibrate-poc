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
  const [rxMap, setRxMap] = useMsp('rxmap');

  function onNext() {
    setCurrentChannel(currentChannel + 1);
  }

  function handleDetect(channel) {
    setDetectedChannels({
      ...detectedChannels,
      [currentChannel]: channel
    });
  }

  function handleDone() {
    const txToChannels = Object.keys(detectedChannels).reduce((prev, curr) => {
      prev[detectedChannels[curr]] = curr;
      return prev;
    }, {});

    const mapping = CHANNELS.map((channel, i) => {
      const ch = txToChannels[i];
      return CHANNELS[ch].code;
    });

    setRxMap(`${mapping.join('')}1234`);

    onDone();
  }

  const maxVals = txValues.map((val, i) => Math.max(initialMaxs[i], val));
  const minVals = txValues.map((val, i) => Math.min(initialMins[i], val));

  if (!initialMaxs.every((val, i) => val === maxVals[i])) {
    setMaxs(maxVals);
  }

  if (!initialMins.every((val, i) => val === minVals[i])) {
    setMins(minVals);
  }

  return <div>
    {txValues.map((value, i) => {
      const channelIsAssigned = Object.values(detectedChannels).indexOf(i);
      return (
        <div key={i}>
          <pre>
          {value}
          {channelIsAssigned > -1 && ` ${CHANNELS[channelIsAssigned].name}`}
          {channelIsAssigned > -1 && `[${minVals[i]}-${maxVals[i]}]`}
          </pre>
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

    {currentChannel < CHANNELS.length - 1 &&
    <button onClick={onNext} disabled={currentChannel === Object.keys(detectedChannels).length}>
      Next
    </button>}

    {currentChannel === CHANNELS.length - 1 &&
    <button onClick={handleDone} disabled={currentChannel === Object.keys(detectedChannels).length}>Done</button>}
  </div>
}
