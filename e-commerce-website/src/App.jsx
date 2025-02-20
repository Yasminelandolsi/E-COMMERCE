import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CategoryPage from "./pages/Categorypage";
import ProductDetails from "./pages/ProductDetails";
import CheckoutPage from "./pages/CheckoutPage"; // Import the CheckoutPage component
import { ProductProvider } from "./context/ProductContext"; // Import the ProductProvider

function App() {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/category/:productListId"
            element={
              <Layout>
                <CategoryPage />
              </Layout>
            }
          />
          <Route
            path="/product/:productId"
            element={
              <Layout>
                <ProductDetails />
              </Layout>
            }
          />
          <Route
            path="/checkout"
            element={
              <Layout>
                <CheckoutPage />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;