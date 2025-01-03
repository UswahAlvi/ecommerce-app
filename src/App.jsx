import { useDispatch } from 'react-redux';
import './App.css';
import ProductListing from './pages/ProductListing/ProductListing';
import { useEffect } from 'react';
import { fetchProducts } from './slices/ProductSlice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductListing />} />
        <Route path='products' element={<ProductListing />} />
        <Route path='products/:id' element={<ProductDetail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
