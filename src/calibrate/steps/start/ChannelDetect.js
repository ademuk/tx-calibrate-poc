import React, {useState} from 'react';

const MATCH_THRESHOLD = 450;

export default ({name, txValues, detectedChannels, onDetect, onRange}) => {
  const [initialTxValues, setCurrentTxValues] = useState(txValues);
  const [initialMins, setMins] = useState(txValues);
  const [initialMaxs, setMaxs] = useState(txValues);

  function anyValuesMeetThreshold(currentValues, newValues) {
    return currentValues.findIndex((channel, i) => {
      return Math.abs(channel - newValues[i]) > MATCH_THRESHOLD
    })
  }

  const match = anyValuesMeetThreshold(initialTxValues, txValues);

  if (match > -1) {
    Object.values(detectedChannels).indexOf(match) === -1 && onDetect(match, initialMins[match], initialMaxs[match]);
  }

  const maxVals = txValues.map((val, i) => Math.max(initialMaxs[i], val));
  const minVals = txValues.map((val, i) => Math.min(initialMins[i], val));

  if (!initialMaxs.every((val, i) => val === maxVals[i])) {
    setMaxs(maxVals);
    onRange(minVals[match], maxVals[match])
  }

  if (!initialMins.every((val, i) => val === minVals[i])) {
    setMins(minVals);
    onRange(minVals[match], maxVals[match])
  }

  return (
    <p>Move {name} to extremes</p>
  )
}
