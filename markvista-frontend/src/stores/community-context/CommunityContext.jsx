import { createContext, useState } from "react";

export const CommunityContext = createContext();

export const CommunityProvider = ({ children }) => {
  const [queries, setQueries] = useState();
  const [showBack, setShowBack] = useState(false);
  const [query, setQuery] = useState();
  return (
    <CommunityContext.Provider
      value={{ queries, setQueries, query, setQuery, showBack, setShowBack }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export default CommunityProvider;
