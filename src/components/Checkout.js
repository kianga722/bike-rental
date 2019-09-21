import React from 'react'

const Checkout = ({
  cart,
  cartTotal,
  totalCalc
}) => {
  return (
    <div id='checkout'>

      <div className='page-title'>
        Checkout
      </div>

      <div className='account-summary-wrapper'>

        <div className='create-account-link'>
          Create an account
        </div>
        
        <div id='order-summary'>

          <div className='quantity-total'>
            {cartTotal} items
          </div>

          <div className='grand-total'>
            <span className='price-total'>Total:</span>
            <span>
              ${totalCalc(cart)}
            </span>
          </div>

        </div>

      </div>
      

    </div>
  )
}

export default Checkout