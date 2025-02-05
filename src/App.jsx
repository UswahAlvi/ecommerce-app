import { useDispatch } from 'react-redux';
import './App.css';
import ProductListing from './pages/ProductListing';
import { useEffect } from 'react';
import { fetchProducts } from './slices/ProductSlice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNoTFound from './pages/PageNoTFound';
import './App.css'
import Checkout from './pages/Checkout';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProductListing />} />
        <Route path='products' element={<ProductListing />} />
        <Route path='products/:id' element={<ProductDetail/>} />
        <Route path='/checkout' element={<Checkout />}></Route>
        <Route path='*' element={<PageNoTFound />}></Route>
      </Routes>
    </BrowserRouter></>
  );
}

export default App;
