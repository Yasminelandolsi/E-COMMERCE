import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CategoryPage from "./pages/Categorypage"; // Import the CategoryPage component
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
            path="/category/:productListId" // Change to productListId
            element={
              <Layout>
                <CategoryPage />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;