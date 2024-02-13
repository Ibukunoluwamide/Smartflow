import "./App.css";
import Login from "./components/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddProduct from "./pages/AddProduct";
import ModifyProduct from "./pages/ModifyProduct";
import '@fortawesome/fontawesome-free/css/all.min.css'
import Products from "./pages/Products";
import Test from "./components/Test";
import Home from "./pages/Home";

function App() {
  return (
    <>
  <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/test" element={<Test />} />
  <Route path="dashboard" element={<Dashboard />}>
    <Route path="" element={<Home />} />
    <Route path="products" element={<Products />} />
    <Route path="products/:id" element={<ModifyProduct />} />
    <Route path="add-product" element={<AddProduct />} />
  </Route>
</Routes>

    </>
  );
}

export default App;
