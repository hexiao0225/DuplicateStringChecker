import React from "react";
import "./styles/styles.css";
import StringCheckerPad from "./components/StringCheckerPad";
import InfoSideBar from "./components/InfoSidebar";

const App = () => (
  <div className="app">
    <StringCheckerPad />
    <InfoSideBar />
  </div>
);

export default App;
