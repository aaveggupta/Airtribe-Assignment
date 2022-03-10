import { useReducer, createContext, useContext } from "react";

const DataLayer = createContext();

export const StateProvider = (props) => {
  return (
    <DataLayer.Provider value={useReducer(props.reducer, props.initialState)}>
      {props.children}
    </DataLayer.Provider>
  );
};

const useDataLayer = () => useContext(DataLayer);
export default useDataLayer;
