import React, {useState} from 'react';
import ChannelDetect from './start/ChannelDetect';


const CHANNELS = [
  'Throttle',
  'Yaw',
  'Pitch',
  'Roll'
];


export default ({txValues, onDone}) => {

  if (txValues === null) {
    return 'Loading'
  }

  const [currentChannel, setCurrentChannel] = useState(0);
  const [detectedChannels, setDetectedChannels] = useState({});
  const [initialMins, setMins] = useState(txValues);
  const [initialMaxs, setMaxs] = useState(txValues);

  function onNext() {
    setCurrentChannel(currentChannel + 1);
  }

  function handleDetect(channel) {
    setDetectedChannels({
      ...detectedChannels,
      [currentChannel]: channel
    });
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
          {channelIsAssigned > -1 && ` ${CHANNELS[channelIsAssigned]}`}
          {channelIsAssigned > -1 && `[${minVals[i]}-${maxVals[i]}]`}
          </pre>
        </div>
      )
    })}

    {CHANNELS.map((channel, i) => {
      return currentChannel === i &&
        <ChannelDetect name={channel}
                       txValues={txValues}
                       detectedChannels={detectedChannels}
                       onDetect={handleDetect}
                       key={channel} />
    })}

    {currentChannel < CHANNELS.length - 1 &&
    <button onClick={onNext} disabled={currentChannel === Object.keys(detectedChannels).length}>
      Next
    </button>}

    {currentChannel === CHANNELS.length - 1 &&
    <button onClick={onDone} disabled={currentChannel === Object.keys(detectedChannels).length}>Done</button>}
  </div>
}
