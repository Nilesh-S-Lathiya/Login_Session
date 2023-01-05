import { useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import AdminLogin from "./pages/AdminLogin";
import AdminRegistation from "./pages/AdminRegistation";
import CustomerRegistation from "./pages/CustomerRegistation";
import Home from "./pages/Home";

function App() {
  const [ isdone, setIsdone ] = useState(null)

  return (
    <div className="App">
      <Routes>
        <Route>
          <Route path="/" element={<Home isdone={isdone} setIsdone={setIsdone}/>} />
          <Route path="/adminlogin" element={<AdminLogin isdone={isdone} setIsdone={setIsdone}/>} />
          <Route path="/adminregistation" element={<AdminRegistation isdone={isdone} setIsdone={setIsdone}/>} />
          <Route
            path="/customerregistation"
            element={<CustomerRegistation />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
