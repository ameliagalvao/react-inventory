import React, { createContext, useState } from 'react';

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [selectedPilotId, setSelectedPilotId] = useState(null);

  const setSelectedPilot = (id) => {
    setSelectedPilotId(id);
  };
  
  const contextValue = {
    selectedPilotId,
    setSelectedPilot
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};


export { Context, ContextProvider };