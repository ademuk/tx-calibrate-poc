import React from 'react';


export default ({label, value, onChange, options}) => {
  return <div>
    {label}
    <input
      type="range"
      min={options.min} max={options.max}
      value={value}
      onChange={event => onChange(event.target.value)}
      step={1} />
    {value}
  </div>
}
