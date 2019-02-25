import React, {useState} from 'react';
import Calibrator from './calibrate/Calibrator';
import TX from './tx/Tx';

import './App.css';


export default () => {
  const [showTx, setShowTx] = useState(false);

  const [txValue, setTxValue] = useState([
    1500,
    1500,
    1500,
    1500
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>RX Calibrate</h1>
      </header>
      <Calibrator onStartCalibration={() => setShowTx(true)} txValues={txValue} />

      {showTx && <TX onChange={setTxValue} values={txValue} />}
    </div>
  )
}
