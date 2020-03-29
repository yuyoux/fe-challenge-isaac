import React from "react";
import "./App.scss";
import Header from "./components/Header";
import ProductList from "./pages/ProductList";

function App() {
  return (
    <div className="App">
      <Header />
      <ProductList />
    </div>
  );
}

export default App;
