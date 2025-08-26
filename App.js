import React from "react";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";
import StackNavigator from "./navigation/StackNavigator"; // ✅ use your separate stack navigator

export default function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <StackNavigator /> 
      </ProductProvider>
    </UserProvider>
  );
}
