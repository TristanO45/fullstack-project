import React from "react";
import "./App.css";

import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import Footer from "./components/Footer/Footer";

const App: React.FC = () => {
  return (
    <>
      <Header companyName="Fur Sure Groomers" />
      <Form />
      <Footer />
    </>
  );
};

export default App;
