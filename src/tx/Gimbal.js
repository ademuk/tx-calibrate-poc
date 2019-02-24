import React from 'react';


export default ({labels, values, onChange, options}) => {

  const STEP = 1;

  return <>
    <div>
      {labels.x}
      <input
        type="range"
        min={options.min} max={options.max}
        value={values.x}
        onChange={event => onChange({x: event.target.value})}
        step="1"/>
      {values.x}
    </div>
    <div>
      {labels.y}
      <input
        type="range"
        min={options.min} max={options.max}
        value={values.y}
        onChange={event => onChange({y: event.target.value})}
        step={STEP} />
      {values.y}
    </div>
  </>
}
