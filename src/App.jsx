import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Compare from "./components/compare";
import NotFound from "./components/NotFound";


function App() {
  return (
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="*" element={<NotFound/>}/>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
