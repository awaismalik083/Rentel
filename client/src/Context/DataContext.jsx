import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// 1. Create the context
export const DataContext = createContext();

// 2. Create a provider component
export const DataProvider = ({ children }) => {
  const [seller, setSeller] = useState({});
  const  saller = localStorage.getItem("sellerId")
  const sellerId = JSON.parse(saller)

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/seller/${sellerId}`
        );
        const sellerData = response.data.seller;
        setSeller(sellerData);
      
      } catch (error) {
        console.error("Error fetching seller:", error);
      }
    };

    if (sellerId) fetchSeller();
  }, [sellerId]);

  return (
    <DataContext.Provider value={{ seller }}>{children}</DataContext.Provider>
  );
};
