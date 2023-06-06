import React, { createContext, useState } from 'react';

const SelectedPilotContext = createContext();

const SelectedPilotContextProvider = ({ children }) => {
  const [selectedPilot, setSelectedPilot] = useState(null);

  const setSelectedPilotData = (data) => {
    setSelectedPilot(data);
  };

  const contextValue = {
    selectedPilot,
    setSelectedPilotData
  };

  return (
    <SelectedPilotContext.Provider value={contextValue}>
      {children}
    </SelectedPilotContext.Provider>
  );
};

export { SelectedPilotContext, SelectedPilotContextProvider };