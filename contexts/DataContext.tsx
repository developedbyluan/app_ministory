"use client";

import { createContext, useContext, useState } from "react";

type DataContextType = {
  audioFile: File | null;
  setAudioFile: (file: File) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [audioFile, setAudioFile] = useState<File | null>(null);

  return (
    <DataContext.Provider value={{ audioFile, setAudioFile }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
}
