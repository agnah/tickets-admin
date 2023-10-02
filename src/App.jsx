import "./App.css";
import { AuthProvider } from "@servicios/AuthProvider";
import Router from "./router/Router";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    testFunction();
  }, []);

  const testFunction = async () => {
    let response = await fetch("http://localhost:8000/api/tickets/");
    let result = await response.json();
    console.log(result);
  };

  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
