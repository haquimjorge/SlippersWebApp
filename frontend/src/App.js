import Home from "./pages/Home";
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/ingresar" element={<SignIn />} exact />
        <Route path="/registrar" element={<SignUp />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
