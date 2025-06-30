// /src/Context/Context.jsx
import React, { createContext, useContext, useState } from 'react';
import { list_places,card, card2, Logos,Sellers,blog,blog_Cards ,lastes_articles } from '../assets/asset';
import {features} from '../DisplayAssets/DisplayAsset';

// Create the context
const AppContext = createContext();

// Create the provider
export const AppProvider = ({ children }) => {
  // Example state (add more as needed)
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      card,
      list_places, 
      card2,
      Logos,
      Sellers,
      blog,
      blog_Cards,
      lastes_articles,
      features
      // ✅ available globally
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);
