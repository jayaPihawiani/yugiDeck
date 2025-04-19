import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [paging, setPaging] = useState(0);

  return (
    <DataContext.Provider value={{ search, setSearch }}>
      {children}
    </DataContext.Provider>
  );
};
