import React from 'react';
import Channel from './Channel'


export default ({onChange, values}) => {
  const CHANNEL_MIN = 1000;
  const CHANNEL_MAX = 2000;

  const [t, a, e, r] = values;

  return <div>
    <Channel label="T"
            value={t}
            onChange={value => onChange([value, a, e, r])}
            options={{min: CHANNEL_MIN, max: CHANNEL_MAX}} />
    <Channel label="A"
             value={a}
             onChange={value => onChange([t, value, e, r])}
             options={{min: CHANNEL_MIN, max: CHANNEL_MAX}} />
    <Channel label="E"
             value={e}
             onChange={value => onChange([t, a, value, r])}
             options={{min: CHANNEL_MIN, max: CHANNEL_MAX}} />
    <Channel label="R"
             value={r}
             onChange={value => onChange([t, a, e, value])}
             options={{min: CHANNEL_MIN, max: CHANNEL_MAX}} />
  </div>
}
