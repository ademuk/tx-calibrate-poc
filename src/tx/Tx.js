import React, {useState} from 'react';
import Channel from './Channel'


export default ({values, onChange}) => {
  const [min, setMin] = useState(987);
  const [max, setMax] = useState(2011);

  const [t, a, e, r] = values;

  return <div style={{overflow: "hidden"}}>
    <div style={{float:"right", width: "300px"}}>
      <h4>TX endpoints</h4>
      <div>
        Min <input value={min} onChange={event => setMin(event.target.value)} type="number" style={{display: "inline", width: "100px", "margin-right": "10px"}} />

        Max <input value={max} onChange={event => setMax(event.target.value)} type="number" style={{display: "inline", width: "100px"}} />
      </div>
    </div>

    <h3>TX</h3>
    <Channel label="Throttle"
            value={t}
            onChange={value => onChange([value, a, e, r])}
            options={{min, max}} />
    <Channel label="Aileron"
             value={a}
             onChange={value => onChange([t, value, e, r])}
             options={{min, max}} />
    <Channel label="Elevator"
             value={e}
             onChange={value => onChange([t, a, value, r])}
             options={{min, max}} />
    <Channel label="Rudder"
             value={r}
             onChange={value => onChange([t, a, e, value])}
             options={{min, max}} />
  </div>
}
