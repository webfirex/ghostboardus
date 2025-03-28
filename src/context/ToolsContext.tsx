import React, { createContext, useContext } from "react";

const ToolsContext = createContext<any>(null);

export const ToolsProvider = ToolsContext.Provider;

export const useToolsData = () => {
  const context = useContext(ToolsContext);
  if (context === undefined) {
    throw new Error("");
  }
  return context;
};
