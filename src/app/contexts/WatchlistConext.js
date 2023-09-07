"use client";

import { createContext, useContext, useState } from "react";

const WatchlistContext = createContext({});

export const WatchlistContextProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState({ animes: [], mangas: [] });

  return (
    <WatchlistContext.Provider value={{ watchlist, setWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

const useWatchlistContext = () => useContext(WatchlistContext);

export default useWatchlistContext;
