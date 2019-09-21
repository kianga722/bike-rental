import React, { useState, useEffect } from 'react'
import {
  Route
} from 'react-router-dom'
import SelectForm from './SelectForm'

const Cart = ({
  numOptions,
  productMap,
  bikeIds,
  cart,
  cartValid,
  handleQuantityChange,
  handleProductDelete,
  setCartValid,
  totalCalc
}) => {
  const [noBike, setNoBike] = useState(false)

  const checkValid = cart => {
    // Make sure cart has a bike
    const cartArr = Object.keys(cart)
    let hasBike = false;
    for (let i = 0; i < cartArr.length; i += 1) {
      if (bikeIds.includes(Number(cartArr[i]))) {
        hasBike = true
        break;
      }
    }
    if (!hasBike) {
      setCartValid(false)
    } else {
      setCartValid(true)
    }
  }

  const buttonCheckout = () => (
    <Route render={({ history }) => (
      <div
        onClick={() => {
          cartValid ? history.push('/checkout') : setNoBike(true)
        }}
        className='checkout-button'
      >
        Checkout
      </div>
    )} />
  )


  useEffect(() => {
    checkValid(cart)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])

  return (
    <div id='cart-page'>

      <div className='page-title'>
        Cart
      </div>

      {
        noBike &&
        <div id='error-reminder'>
          Need to add at least 1 bike to checkout!
        </div>
      }

      <div id='reminder'>
        Reminder: You must add a bike in order to check out
      </div>

      {
        Object.keys(cart).length > 0 &&
        <div id='cart-list-wrapper'>

          <div id='cart-list'>
            {
              Object.keys(cart).map(id => (
                <div
                  key={id}
                  className='cart-item'
                >
      
                  <div className='product-wrapper'>

                    <div className='product-image-wrapper'>
                      <img 
                        className='product-image'
                        src={productMap[id].image}
                        alt='product'
                      ></img>
                    </div>

                    <div className='product-info-wrapper'>

                      <div className='product-name'>
                        {productMap[id].name}
                      </div>
                      
                      <div className='product-type'>
                        {productMap[id].product_type}
                      </div>

                      <div className='product-price'>
                        <span className='price-total'>Price:</span>
                        <span className='dollar-amount'>
                          ${productMap[id].price.toFixed(2)}
                        </span>
                      </div>

                      <div className='quantity-wrapper'>
                        <span>
                          Quantity:
                        </span>
                        <SelectForm
                          value={cart[id]}
                          handleChange={({ target }) => handleQuantityChange(id, Number(target.value))}
                          numOptions={numOptions}
                        />
                      </div>
          
                      <div className='product-total'>
                        <span className='price-total'>SubTotal:</span>
                        <span className='dollar-amount'>
                          ${(productMap[id].price * cart[id]).toFixed(2)}        
                        </span>
                      </div>

                      <div className='delete-wrapper'>
                        <div
                          className='product-delete'
                          onClick={(event) => handleProductDelete(id)}
                        >
                          Remove item
                        </div>
                      </div>

                    </div>

                  </div>
                    
                </div>
              ))
            }
          </div>

          <div className='grand-total'>

            <span className='price-total'>Total:</span>
            <span>
              ${totalCalc(cart)}
            </span>
          </div>

          <div className='checkout-wrapper'>
            {
              buttonCheckout()
            }
          </div>
        
        </div>
      }

      {
        Object.keys(cart).length === 0 &&
        <div className='noItems'>
          No items in cart!
        </div>
      }
      
    </div>
  )
}

export default Cart