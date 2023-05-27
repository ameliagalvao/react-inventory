import React, { createContext, useState } from 'react';

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [selectedPilot, setSelectedPilot] = useState(null);

  const setSelectedPilotData = (data) => {
    setSelectedPilot(data);
  };

  const contextValue = {
    selectedPilot,
    setSelectedPilotData
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };