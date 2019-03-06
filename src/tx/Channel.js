import React from 'react';


export default ({label, value, onChange, options}) => {
  return <div>
    <span style={{display: "inline-block", width: "70px"}}>{label}</span>
    <input
      type="range"
      min={options.min} max={options.max}
      value={value}
      onChange={event => onChange(event.target.value)}
      step={1}
      style={{"margin-right": "10px"}}/>
    {value}
  </div>
}
