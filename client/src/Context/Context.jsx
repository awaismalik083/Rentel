import React, { createContext, useContext, useEffect, useState } from "react";

import {
  list_places,
  card,
  card2,
  Logos,
  Sellers,
  blog,
  blog_Cards,
  lastes_articles,
} from "../assets/asset";
import { features } from "../DisplayAssets/DisplayAsset";

// Create the context
const AppContext = createContext();

// Provider
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [sellerId, setSellerId] = useState(null);
  const [propertyId, setPropertyId] = useState(null);

  // Load user and sellerId from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedSellerId = localStorage.getItem("sellerId");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedSellerId) {
      setSellerId(JSON.parse(storedSellerId));
    }
  }, []);

  // Save user and sellerId to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }

    if (sellerId) {
      localStorage.setItem("sellerId", JSON.stringify(sellerId));
    } else {
      localStorage.removeItem("sellerId");
    }
    if (propertyId !== null && propertyId !== undefined) {
      localStorage.setItem("propertyId", propertyId);
      console.log("Property id saved successfully", propertyId);
    } else {
      console.log("Property id was null/undefined, not removing.");
    }
  }, [user, sellerId, propertyId]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        sellerId,
        setSellerId, // ✅ Expose setter
        list_places,
        propertyId,
        setPropertyId,
        card,
        card2,
        Logos,
        Sellers,
        blog,
        blog_Cards,
        lastes_articles,
        features,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = () => useContext(AppContext);
