import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// 1. Create the context
export const PropertyContext = createContext();

// 2. Create a provider component
export const PropertyProvider = ({ children }) => {
  const [propertyData, setPropertyData] = useState({});

  

  {
    /*fetch all properties */
  }
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/property/getAllPropertiesWithoutSeller"
        );
        // Check this first

        // Adjust this line based on what's actually in response.data
        const data = response.data.properties; // or response.data.properties or whatever matches your backend
        
        setPropertyData(data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

     fetchProperty();
  }, []);

  return (
    <PropertyContext.Provider value={{ propertyData }}>
      {children}
    </PropertyContext.Provider>
  );
};
