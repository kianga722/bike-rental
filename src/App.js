import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect,
} from 'react-router-dom'

import Home from './components/Home'
import Cart from './components/Cart'
import Checkout from './components/Checkout'

const products = require('./bikerentals.json').products
const numOptions = 50

function App() {
  
  const [productSelect, setProductSelect] = useState(null)
  const [quantity, setQuantity] = useState(1)

  const [cart, setCart] = useState({})
  const [cartTotal, setCartTotal] = useState(0)
  const [cartValid, setCartValid] = useState(false)

  const productMap = (() => {
    const map = {}
    products.forEach(product => {
      map[product.id] = {
        ...product
      }
    })
    return map
  })()

  const bikeIds = (() => {
    const bikeArr = []
    products.forEach(product => {
      if (product.product_type === 'bike') {
        bikeArr.push(product.id)
      }
    })
    return bikeArr
  })()

  const handleCloseProductSelect = () => {
    setProductSelect(null)
    setQuantity(1)
  }

  const cartTotalCalc = cart => {
    let total = 0;
    if (Object.keys(cart).length > 0) {
      Object.keys(cart).forEach(id => {
        total += cart[id]
      })

      return setCartTotal(total)
    } 
    setCartTotal(0)
  }

  const handleAddToCart = (productId, quantity) => {
    if (quantity === 0) {
      return
    }
    const cartNew = {
      ...cart
    }
    if (cartNew[productId]) {
      cartNew[productId] += quantity
    } else {
      cartNew[productId] = quantity
    }
    setCart(cartNew)
    cartTotalCalc(cartNew)
    handleCloseProductSelect()
  }

  const handleQuantityChange = (productId, quantity) => {
    if (quantity === 0) {
      return
    }
    const cartNew = {
      ...cart
    }
    cartNew[productId] = quantity
    setCart(cartNew)
    cartTotalCalc(cartNew)
  }

  const handleProductDelete = id => {
    const cartNew = {
      ...cart
    }
    delete cartNew[id]
    setCart(cartNew)
    setCart(cartNew)
    cartTotalCalc(cartNew)
  }

  const totalCalc = cart => {
    let total = 0
    Object.keys(cart).forEach(id => {
      total += productMap[id].price * cart[id]
    })
    return total.toFixed(2)
  }

  useEffect(() => {
    cartTotalCalc(cart)
  }, [cart])


  return (
    <div className="content">

      <Router>

        <section id='title-main'>
            Amazing Bike Rentals
        </section>

        <section id='nav'>

          <Link
            className='homeLink'
            to='/'
          >
            Home
          </Link>

          <Link
            className='cartLink'
            to='/cart'
          >
            {
              cartTotal > 0 &&
              <div className='cart-total'>
              {cartTotal}
            </div>
            }
            
            <div>
              Cart
            </div>
          </Link>

        </section>

        <Route exact path='/' render={() =>
          <Home
            products={products}
            numOptions={numOptions}
            productSelect={productSelect}
            quantity={quantity}
            setProductSelect={setProductSelect}
            setQuantity={setQuantity}
            handleAddToCart={handleAddToCart}
            handleCloseProductSelect={handleCloseProductSelect}
          />
        } />
          
        <Route path='/cart' render={() =>
          <Cart
            numOptions={numOptions}
            productMap={productMap}
            bikeIds={bikeIds}
            cart={cart}
            cartValid={cartValid}
            handleQuantityChange={handleQuantityChange}
            handleProductDelete={handleProductDelete}
            setCartValid={setCartValid}
            totalCalc={totalCalc}
          />
        } />

        <Route path='/checkout' render={() =>
          cartValid ? 
            <Checkout
              cart={cart}
              cartTotal={cartTotal}
              totalCalc={totalCalc}
            /> : <Redirect to='/cart' />
        } />

        
      </Router>

    </div>
  );
}

export default App;
