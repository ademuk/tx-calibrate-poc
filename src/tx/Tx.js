import React, {useState} from 'react';
import Channel from './Channel'


export default ({values, onChange}) => {
  const [min, setMin] = useState(1000);
  const [max, setMax] = useState(2000);

  const [t, a, e, r] = values;

  return <div>
    <h2>TX simulator</h2>
    <Channel label="T"
            value={t}
            onChange={value => onChange([value, a, e, r])}
            options={{min, max}} />
    <Channel label="A"
             value={a}
             onChange={value => onChange([t, value, e, r])}
             options={{min, max}} />
    <Channel label="E"
             value={e}
             onChange={value => onChange([t, a, value, r])}
             options={{min, max}} />
    <Channel label="R"
             value={r}
             onChange={value => onChange([t, a, e, value])}
             options={{min, max}} />

    <h3>Endpoints</h3>
    <p>
      <input value={min} onChange={event => setMin(event.target.value)} type="text" /> Min
    </p>
    <p>
      <input value={max} onChange={event => setMax(event.target.value)} type="text" /> Max
    </p>
  </div>
}
