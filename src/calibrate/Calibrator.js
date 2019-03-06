import React, {useState} from 'react';
import Initial from './steps/Initial'
import Calibrate from './steps/Calibrate'
import Done from './steps/Done'
import styles from './Calibrator.module.css';

const steps = {
  INITIAL: 'initial',
  CALIBRATE: 'calibrate',
  DONE: 'done'
};

export default ({txValues}) => {
  const [step, setStep] = useState('initial');

  function handleStartCalibration() {
    setStep(steps.CALIBRATE);
  }

  function handleRestart() {
    setStep(steps.INITIAL);
  }

  function handleDone() {
    setStep(steps.DONE);
  }

  return (
    <div className={styles.Calibrator}>
      {step === steps.INITIAL && <Initial onStart={handleStartCalibration} />}
      {step === steps.CALIBRATE && <Calibrate txValues={txValues} onDone={handleDone} onRestart={handleRestart} />}
      {step === steps.DONE && <Done onRestart={handleRestart} />}
    </div>
  )
}
