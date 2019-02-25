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
  const [detectedRxRanges, setDetectedRxRanges] = useState({});

  function onNext() {
    setCurrentChannel(currentChannel + 1);
  }

  function handleDetect(channel) {
    setDetectedChannels({
      ...detectedChannels,
      [currentChannel]: channel
    });
  }

  function handleRange(min, max) {
    setDetectedRxRanges({
      ...detectedRxRanges,
      [currentChannel]: [min, max]
    })
  }

  return <div>
    {JSON.stringify(detectedChannels)}
    {JSON.stringify(detectedRxRanges)}
    {txValues.map((value, i) => {
      return (
        <div key={i}>
          {value}
          {Object.values(detectedChannels).indexOf(i) > -1 && CHANNELS[Object.values(detectedChannels).indexOf(i)]}
          {Object.values(detectedRxRanges).indexOf(i) > -1 && detectedRxRanges[Object.values(detectedChannels).indexOf(i)]}
        </div>
      )
    })}

    {CHANNELS.map((channel, i) => {
      return currentChannel === i &&
        <ChannelDetect name={channel}
                       txValues={txValues}
                       detectedChannels={detectedChannels}
                       onDetect={handleDetect}
                       onRange={handleRange}
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
