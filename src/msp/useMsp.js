import { useState, useEffect } from 'react';

const MOCK_RXRANGE = [
  [1000, 2001],
  [1000, 2000],
  [1000, 2000],
  [1000, 2000]
];

const MOCKS = {
  rxrange: MOCK_RXRANGE
};

export default function useMsp(key) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    //TODO MSP API
    setTimeout(() => setValue(MOCKS[key]), 10)
  });

  return value;
}
