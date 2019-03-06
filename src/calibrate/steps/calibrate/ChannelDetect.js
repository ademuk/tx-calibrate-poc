import React, {useState} from 'react';

const MATCH_THRESHOLD = 450;

export default ({name, txValues, detectedChannels, onDetect}) => {
  const [initialTxValues, setCurrentTxValues] = useState(txValues);

  function anyValuesMeetThreshold(currentValues, newValues) {
    return currentValues.findIndex((channel, i) => {
      return Math.abs(channel - newValues[i]) > MATCH_THRESHOLD
    })
  }

  const match = anyValuesMeetThreshold(initialTxValues, txValues);

  if (match > -1) {
    Object.values(detectedChannels).indexOf(match) === -1 && onDetect(match);
  }

  return (
    <p>Please move <strong>{name}</strong> to its extremes, then click next</p>
  )
}
