import * as React from "react";

export const MockMspContext = React.createContext();

const DEFAULT_RXRANGE = [
  [1000, 2001],
  [1000, 2000],
  [1000, 2000],
  [1000, 2000]
];

const DEFAULT_RX_MAP = 'AETR1234';

const initialState = {
  rxrange: DEFAULT_RXRANGE,
  rxmap: DEFAULT_RX_MAP
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set":
      return {...state, [action.key]: action.value};
  }
};

export function MockMspContextProvider(props) {
  let [state, dispatch] = React.useReducer(reducer, initialState);
  let value = [state, dispatch];

  return <MockMspContext.Provider value={value}>{props.children}</MockMspContext.Provider>;
}

