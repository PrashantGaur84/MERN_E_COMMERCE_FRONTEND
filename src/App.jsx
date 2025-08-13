import React, { useContext } from 'react'
import AppContext from './context/AppContext'
import ShowProduct from './components/products/ShowProduct'
import ProductDetail from './components/products/ProductDetail'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SearchProduct from './components/products/SearchProduct'
import Register from './components/user/Register'
import Login from './components/user/Login'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Profile from './components/user/Profile';
import Cart from './components/Cart'
import Address from './components/Address'
import Checkout from './components/Checkout'
import OrderConfirmation from './components/OrderConfirmation'

const App = () => {
  // const {} = useContext(AppContext);
  return (
    <Router>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Routes>
        <Route path='/' element={<ShowProduct />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/product/search/:term' element={<SearchProduct />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/cart' element={<Cart />} />
        <Route path='/shipping' element={<Address />} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/orderconfirmation' element= {<OrderConfirmation/>} />

      </Routes>
    </Router>
  )
}

export default App