import React, {useState} from 'react';
import Initial from './steps/Initial'
import Calibrate from './steps/Calibrate'

const steps = {
  INITIAL: 'initial',
  START: 'start'
};

export default ({onStartCalibration, txValues}) => {
  const [step, setStep] = useState('initial');

  function handleStartCalibration() {
    setStep(steps.START);
    onStartCalibration();
  }

  function handleDone() {

  }

  return (
    <>
      {step === steps.INITIAL && <Initial onStart={handleStartCalibration} />}
      {step === steps.START && <Calibrate txValues={txValues} onDone={handleDone} />}
    </>
  )
}
