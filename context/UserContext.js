// context/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("userData");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoadingUser(false);
    };
    loadUser();
  }, []);

  const login = async (userData) => {
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async (navigation) => {
    await AsyncStorage.removeItem("userData");
    setUser(null);
   // navigation.replace("Login"); 
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
};
