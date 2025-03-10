import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import "./App.css";
import { SearchBar } from "./components/searchComponents/SearchBar";
import { SearchResultsList } from "./components/searchComponents/SearchResultsList";
import "bootstrap/dist/css/bootstrap.min.css"; 
import LoginForm from "./components/loginForm"; 
function App() {
  const [results, setResults] = useState([]);

  return (
    <Router>
        <Routes> 
        <Route path="/" element={<LoginForm />} />
        <Route
            path="/search"
            element={
              <div>
                <SearchBar setResults={setResults} />
                <SearchResultsList results={results} />
              </div>
            }
          />
        </Routes>
     
    </Router>
  );
}

export default App;
