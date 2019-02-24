import React, { useState} from 'react';
import TX from './tx/Tx';

import './App.css';

const DEFAULT_CHANNEL_VALUE = 1500;

export default () => {
  const [txValue, setTxValue] = useState({
    t: DEFAULT_CHANNEL_VALUE,
    a: DEFAULT_CHANNEL_VALUE,
    e: DEFAULT_CHANNEL_VALUE,
    r: DEFAULT_CHANNEL_VALUE
  });

  return (
    <div className="App">
      <header className="App-header">
        RX Calibrate
      </header>
      <TX onChange={value => setTxValue({...txValue, ...value})} values={txValue} />
    </div>
  )
}
