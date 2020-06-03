import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import ExcelPage from "./components/excelcom";


function App() {
  return (
    <>
 
      <ExcelPage />
      </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

