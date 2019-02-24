import React from 'react';
import Gimbal from './Gimbal'


export default ({onChange, values}) => {
  const CHANNEL_MIN = 1000;
  const CHANNEL_MAX = 2000;

  const leftGimbalMapping = {x: 'r', y: 't'};
  const rightGimbalMapping = {x: 'a', y: 'e'};

  function mapValue(value, mapping) {
    return Object.keys(value).reduce((prev, curr) => {
      prev[mapping[curr]] = value[curr];
      return prev;
    }, {});
  }

  return <div>
    <Gimbal labels={leftGimbalMapping}
            values={{x: values.r, y: values.t}}
            onChange={value => onChange(mapValue(value, leftGimbalMapping))}
            options={{min: CHANNEL_MIN, max: CHANNEL_MAX}} />

    <Gimbal labels={rightGimbalMapping}
            values={{x: values.a, y: values.e}}
            onChange={value => onChange(mapValue(value, rightGimbalMapping))}
            options={{min: CHANNEL_MIN, max: CHANNEL_MAX}}/>
  </div>
}
