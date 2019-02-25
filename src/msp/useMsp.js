import { useContext } from 'react';
import {MockMspContext} from "./MockMspContext";

export default function useMsp(key) {
  const [state, dispatch] = useContext(MockMspContext);
  return [state[key], value => dispatch({
    type: 'set',
    key,
    value
  })];
}
