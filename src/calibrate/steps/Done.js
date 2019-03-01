import React from 'react';


export default ({onRestart}) => {
  return <div>
    <h2>Calibration complete</h2>
    <p>You are all done</p>
    <p>
      <button class="button button-outline" onClick={onRestart}>Restart</button>
    </p>
  </div>
}
