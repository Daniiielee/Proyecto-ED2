import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { NavigationProvider } from './context/NavigationContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { TopProducts } from './pages/TopProducts';
import { NavigationHistory } from './pages/NavigationHistory';
import { NotFound } from './pages/NotFound';
import DataStructuresDemo from './pages/DataStructuresDemo';
import Chat from './pages/Chat';
import PrivateRoute from './components/common/PrivateRoute';
import './styles/global.scss';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <NavigationProvider>
          <Router>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />

            <main style={{ flex: 1 }}>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route element={<PrivateRoute />}>
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/top-products" element={<TopProducts />} />
                <Route path="/history" element={<NavigationHistory />} />
                <Route path="/structures" element={<DataStructuresDemo />} />
                <Route path="/chat" element={<Chat />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </NavigationProvider>
    </ProductProvider>
  </AuthProvider>
  );
};

export default App;
